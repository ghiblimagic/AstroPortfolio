import GradientButton from "@/components/buttons/GradientButton";

export default function WebsiteGuideButtons() {
  return (
    <div className=" text-center">
      <GradientButton
        link="#jump-to-a-section"
        text="Website Quicklinks"
        secondary
      />
      <GradientButton
        link="#flowchart"
        text="Skip to FlowChart"
        primary
      />
    </div>
  );
}
