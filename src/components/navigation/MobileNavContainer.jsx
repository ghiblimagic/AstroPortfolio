import MobileNav from "./MobileNav";
import { useStore } from "@nanostores/react";
import { isNavOpen } from "../../store/navStore";

export default function MobileNavContainer() {
  const $isNavOpen = useStore(isNavOpen);
  console.log("isNavOpen", $isNavOpen);
  return <div className="md:hidden">{$isNavOpen ? <MobileNav /> : null}</div>;
}
