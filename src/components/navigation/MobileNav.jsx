import { Disclosure } from "@headlessui/react";

export default function MobileNav() {
  return (
    <>
      {/*  ********************    MAIN NAV, DOTTED BACKGROUND*****************  */}
      <div
        id="sidebar"
        className={` w-screen bg-mainColor gradient-line border-t-4`}
        style={{ backgroundImage: `url("/images/dotsBackground.png")` }}
      >
        <ul className="flex flex-col space-y-3 pt-6 bg-mainColor text-center text-white font-Rogue text-2xl">
          {/* ************************** FIRST ITEM ***********************  */}
          <li className="glow gradient-line border-b-2 pb-1">
            <a href="/#home">
              <span className="text-center">home </span>
            </a>
          </li>

          <li className="gradient-line border-b-2 pb-1">
            {/* ************************** PROJECTS/ DROPPABLE LIST ***********************  */}
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex mx-auto ">
                    <span className="pl-6 mr-2 glow ">projects </span>
                    <img
                      className=""
                      src={`/images/icon-arrow-${open ? "up" : "down"}.svg`}
                      alt="Arrow"
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm">
                    <ul className="flex flex-col space-y-3 text-2xl">
                      <li className="cursor-pointer glow ">
                        <a href="/#projects"> newest projects</a>
                      </li>

                      <li className="cursor-pointer glow">
                        <a href="/otherprojects/">other projects</a>
                      </li>
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </li>

          <li className="glow gradient-line border-b-2 pb-1">
            <a href="/about/">about me</a>
          </li>

          <li className="glow gradient-line border-b-2 pb-1">
            <a href="/#services">
              <span>services</span>
            </a>
          </li>

          <li className="glow gradient-line border-b-2 pb-1">
            <a href="/#process">the process</a>
          </li>

          <li className="glow gradient-line border-b-2 pb-1">
            <a href="/#skills">skills</a>
          </li>

          <li className="glow gradient-line border-b-2 pb-1">
            <a href="/#contact">contact</a>
          </li>

          <li className="glow gradient-line border-b-2 pb-1">
            <a href="/blog">blog</a>
          </li>
        </ul>

        <div className="flex flex-col space-y-5 items-center justify-items-center pt-8"></div>
      </div>
    </>
  );
}
