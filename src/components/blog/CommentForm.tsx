import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import LoadingSpinner from "../ui/loadingSpinner";

interface CommentFormProps {
  slug: string;
}

export default function CommentForm({ slug }: CommentFormProps) {
  const formStartTime = useRef(Date.now());
  // useRef so:
  //  1. a bot can't spoof the date, like they could with useState
  //  2. It won't rerender and can't accidently change
  //  3. ideal since we want a timestamp that won't change
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [showV2, setShowV2] = useState(false);
  const [v2Token, setV2Token] = useState<string | null>(null);
  const [recaptchaLoading, setRecaptchaLoading] = useState(true);
  const [recaptchaFailed, setRecaptchaFailed] = useState(false);

  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ********** CAPTCHA *******************

  // Set recaptcha as loaded when it's ready, with timeout fallback
  useEffect(() => {
    if (executeRecaptcha) {
      setRecaptchaLoading(false);
      setRecaptchaFailed(false);
      return;
    }

    // If recaptcha doesn't load within 10 seconds, show fallback
    const timeout = setTimeout(() => {
      if (!executeRecaptcha) {
        setRecaptchaLoading(false);
        setRecaptchaFailed(true);
        setShowV2(true); // Automatically show v2 as fallback
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [executeRecaptcha]);

  // ********** handleSubmit *******************
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // ***** Captcha in handleSubmit *****

    // token can be v2 or v3
    let token = null;
    let captchaVersion: "v2" | "v3" = "v3"; // Track which version we're using

    try {
      // v3 recaptcha
      if (executeRecaptcha && !showV2 && !recaptchaFailed) {
        token = await executeRecaptcha("contact_form");
        captchaVersion = "v3";

        if (!token) {
          setShowV2(true);
          setIsSubmitting(false);
          return;
        }
      }

      // v2 fallback (or if v3 failed to load)
      if (showV2) {
        if (!v2Token) {
          alert("Please complete the CAPTCHA");
          setIsSubmitting(false);
          return;
        }
        token = v2Token;
        captchaVersion = "v2";
      }
    } catch (err) {
      console.error("Client-side error:", err);
      // If v3 throws an error, fall back to v2
      if (!showV2) {
        setShowV2(true);
        setRecaptchaFailed(true);
      }
      setIsSubmitting(false);
      return;
    }

    // **** actual Comment
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          content,
          author: author || "Anonymous",
          formStartTime: formStartTime.current,
          captchaToken: token,
          captchaVersion,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error);
        return;
      }

      setContent("");
      setAuthor("");
      alert("Comment added!");
    } catch (err: any) {
      setError(err.message || "Failed to add comment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-4 rounded-2xl bg-white  shadow-lg shadow-violet-950"
    >
      <label htmlFor="name-comment-submission">Your name (optional)</label>
      <input
        type="text"
        id="name-comment-submission"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="p-2 rounded-2xl bg-violet-100"
      />
      <label htmlFor="comment-submission">Comment: </label>

      <textarea
        value={content}
        id="comment-submission"
        onChange={(e) => setContent(e.target.value)}
        className="p-2 rounded-2xl bg-violet-100"
        maxLength={10000}
        required
      />

      {/* *************** Recaptcha ************ */}
      {recaptchaLoading && (
        <span className="text-center text-sm text-gray-400 mt-2">
          Loading security verification...
        </span>
      )}

      {recaptchaFailed && !showV2 && (
        <div className="text-center mt-2">
          <p className="text-yellow-500 text-sm mb-2">
            Security verification couldn&apos;t load.
          </p>
          <button
            type="button"
            onClick={() => setShowV2(true)}
            className="text-blue-500 underline text-sm"
          >
            Use backup verification instead
          </button>
        </div>
      )}
      {/* fallback CAPTCHA */}
      {showV2 && (
        <div className="flex flex-col items-center my-3">
          {recaptchaFailed && (
            <p className="text-sm text-gray-400 text-center mb-2">
              Using backup verification method
            </p>
          )}
          <ReCAPTCHA
            sitekey={import.meta.env.PUBLIC_RECAPTCHA_V2_SITE_KEY}
            onChange={setV2Token}
            // direct Reference:
            // onChange receives the function reference setV2Token
            // When ReCAPTCHA calls onChange(captchaToken), it's actually calling setV2Token(captchaToken)

            // which if functionally identical to the wrapper version:
            // onChange={(token) => setV2Token(token)}
          />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting || recaptchaLoading}
        className={`block px-4 py-2 m-1 rounded-2xl text-white no-underline w-fit bg-mainColor mx-auto hover:bg-blue-600 hover:text-white text-lg ${isSubmitting && "bg-slate-700"}`}
      >
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>

      {isSubmitting && <LoadingSpinner />}

      <input
        type="hidden"
        name="formStartTime"
        value={formStartTime.current}
      />
    </form>
  );
}
