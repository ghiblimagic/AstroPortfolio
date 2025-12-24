interface GradientButtonProps {
  aria?: string;
  link: string;
  target?: string;
  rel?: string;
  text: string;
  primary?: boolean;
  secondary?: boolean;
  styling?: string;
}
export default function GradientButton(props: GradientButtonProps) {
  const primaryButton = "bg-secondaryColor text-white";
  const secondaryButton = "border-2 text-blue-700 border-secondaryColor";
  const tertiaryButton =
    "underline underline-offset-4 decoration-secondaryColor text-blue-700 hover:no-underline";
  const styling = props.primary
    ? primaryButton
    : props.secondary
      ? secondaryButton
      : tertiaryButton;
  // *************** Download **************
  return (
    <a
      className={`inline-block px-4 py-2 m-1 rounded-2xl  ${styling}   hover:text-mainColor  animated-gradient hover:font-bold text-center not-prose`}
      // not-prose because the blog content is wrapped in tailwind Typography, so it would add underlines to all button types
      aria-label={props.aria}
      href={props.link}
      target={props.target || ""}
      rel={props.rel || ""}
      role="button"
    >
      {props.text}
    </a>
  );
}
