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
  const primaryButton = "portfolio-button--view";
  const secondaryButton = "portfolio-button--code";
  const tertiaryButton = "portfolio-button--link";
  const styling = props.primary
    ? primaryButton
    : props.secondary
      ? secondaryButton
      : tertiaryButton;
  // *************** Download **************
  return (
    <a
      className={`portfolio-button ${styling} text-center not-prose`}
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
