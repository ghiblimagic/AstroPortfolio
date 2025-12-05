import { useState } from "react";
import { useStore } from "@nanostores/react";
import { isNavOpen } from "../../store/navStore";

export default function NavToggleButton() {
  const [iconMenuClose, setIconMenuClose] = useState("icon-menu-close");
  const [hamburgerImage, setHamburgerImage] = useState("");

  const $isNavOpen = useStore(isNavOpen);

  return (
    <div className={`bg-mainColor md:hidden flex justify-center`}>
      {$isNavOpen ? (
        <button
          onClick={() => {
            isNavOpen.set(false);
          }}
          aria-expanded={$isNavOpen}
          aria-controls="sidebar"
          aria-label="close Menu"
          className="pl-2"
        >
          <img
            className=""
            src={`/images/${iconMenuClose}.svg`}
            alt="Close SideBar"
            onMouseEnter={() => setIconMenuClose("icon-menu-close-bright")}
            onMouseOut={() => setIconMenuClose("icon-menu-close")}
          />
        </button>
      ) : (
        <button
          onClick={() => {
            isNavOpen.set(true);
          }}
          aria-expanded={$isNavOpen}
          aria-controls="sidebar"
          aria-label="Open Menu"
          className={`pl-2`}
        >
          {/* https://upmostly.com/tutorials/react-onhover-event-handling-with-examples */}

          <img
            src={`/images/icon-menu-hamburger${hamburgerImage}.svg`}
            alt="open menu"
            onMouseEnter={() => setHamburgerImage("-bright")}
            onMouseOut={() => setHamburgerImage("")}
          />
        </button>
      )}
    </div>
  );
}
