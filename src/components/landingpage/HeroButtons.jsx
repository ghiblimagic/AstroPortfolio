import GradientNavigationButton from "../buttons/GradientNavigationButton";

export default function HeroButtons() {
  return (
    <div className="pt-10 pb-4 flex space-x-4 justify-center">
      <GradientNavigationButton
        text="About Me"
        aria="About me page button"
        link="/about/"
      />

      <GradientNavigationButton
        text="Get a Free Consultation"
        aria="get a free consultation
 button"
        link="/#contact"
      />

      <GradientNavigationButton
        text="Article"
        aria="Website builder article"
        link="/blog/website#flowchart"
      />
    </div>
  );
}
