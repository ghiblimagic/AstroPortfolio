import GradientButton from "@/components/buttons/GradientButton";

export default function HeroButtons() {
  return (
    <div className="pt-10 pb-4 flex space-x-4 justify-center">
      <GradientButton
        text="About Me"
        aria="About me page button"
        link="/about/"
        secondary
      />

      <GradientButton
        text="Get a Free Consultation"
        aria="get a free consultation
 button"
        link="/#contact"
        primary
      />

      <GradientButton
        text="Guide"
        aria="Website builder guide"
        link="/blog/website#flowchart"
      />
    </div>
  );
}
