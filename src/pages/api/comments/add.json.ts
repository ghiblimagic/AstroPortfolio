import { createClient } from "@supabase/supabase-js";
import type { Database } from "src/types/supabase";
import { rateLimiter, rateLimitPresets } from "@/components/api/rateLimiter";
import type { APIRoute } from "astro";

const supabase = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

export interface CommentInsert {
  slug: string;
  content: string;
  user_id?: string | null; // optional for anonymous
  author?: string | null;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const clientIP = clientAddress;

  try {
    const body = await request.json();
    const {
      slug,
      content,
      author,
      user_id,
      formStartTime,
      captchaToken,
      captchaVersion,
    } = body;
    //  ********************  kick out requests from bots ********************
    if (!formStartTime || isNaN(formStartTime)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid form submission." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const secret =
      captchaVersion === "v2"
        ? import.meta.env.RECAPTCHA_V2_SECRET_KEY
        : import.meta.env.RECAPTCHA_V3_SECRET_KEY;
    // import.meta.env since this is Astro/vite, even though on the server process.env would work since node.js is still running. But import.meta.env is the astro convention

    const submissionTime = Date.now();
    const timeSpent = submissionTime - formStartTime;

    if (timeSpent < 3000) {
      // Less than 3 seconds
      return new Response(
        JSON.stringify({
          success: false,
          error: "Form submitted too quickly.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (timeSpent > 3600000) {
      // 1 hour
      return new Response(
        JSON.stringify({
          success: false,
          error: "Form session expired. Please refresh and try again.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    //  ********************  Validation  ********************
    if (!slug || !content || !captchaToken) {
      return new Response(
        JSON.stringify({ success: false, error: "All fields are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (content.length > 10000) {
      return new Response(
        JSON.stringify({ success: false, error: "Input too long." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
    //  ********************  Recaptcha  ********************
    try {
      const captchaVerify = await fetch(
        `https://www.google.com/recaptcha/api/siteverify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret,

            response: captchaToken,
          }),
        },
      );

      if (!captchaVerify.ok) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Captcha verification failed.",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      const captchaData = await captchaVerify.json();

      // Detailed logging with all available data
      // this one
      console.log("reCAPTCHA Details:", {
        type: captchaData.score ? "v3" : "v2",
        success: captchaData.success,
        ...(captchaData.score && { score: captchaData.score }),
        // when condition true/ aka if it exists for that version of captcha then use the value to the right

        // if it evaluates to false:
        // Evaluates to: ...(undefined && { score: undefined })
        // && short-circuits, returns: ...undefined
        // Spreading undefined does nothing (ignored), The spread operator ... safely ignores undefined, null, and false values
        ...(captchaData.action && { action: captchaData.action }),
        ...(captchaData["error-codes"] && {
          errors: captchaData["error-codes"],
        }),
        ip: clientIP,
        timestamp: new Date().toISOString(),
      });

      if (
        !captchaData.success ||
        (captchaData.score && captchaData.score < 0.7)
      ) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "reCAPTCHA failed. Please try again.",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }
    } catch (captchaError) {
      console.error("Captcha verification error:", captchaError);
      return new Response(
        JSON.stringify({ success: false, error: "Could not verify captcha." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    // *************** rate limit *************
    // Check rate limit to not punish them for errors (only after validating everything else)

    const rateCheck = rateLimiter.check(clientIP, rateLimitPresets.contact);

    if (!rateCheck.allowed) {
      const minutesUntilReset = Math.ceil(
        (rateCheck.resetTime - Date.now()) / 60000,
      );
      return new Response(
        JSON.stringify({
          success: false,
          error: `Too many requests. Please try again in ${minutesUntilReset} minute${minutesUntilReset > 1 ? "s" : ""}.`,
        }),
        { status: 429, headers: { "Content-Type": "application/json" } },
      );
    }

    // ***************** SupaBase *********
    const supabaseComment: Database["public"]["Tables"]["comments"]["Insert"] =
      {
        slug,
        content,
        author: author || "Anonymous",
        user_id: user_id || null,
      };

    const { data, error } = await supabase
      .from("comments")
      .insert(supabaseComment)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to add comment." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
