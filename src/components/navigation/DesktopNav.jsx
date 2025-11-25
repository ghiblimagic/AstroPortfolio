import { Disclosure, Transition } from "@headlessui/react";

const sidebar = () => {
  return (
    <div>
      {/*  ********************    MAIN NAV, DOTTED BACKGROUND*****************  */}
      <div
        id="sidebar"
        className={`fixed left-0 top-0 w-[250px] h-screen bg-mainColor pt-14 p-6 z-51 text-white border-r-4 gradient-line`}
        style={{ backgroundImage: `url("/images/dotsBackground.png")` }}
      >
        <div class="flex bg-violet-900 gradient-line border-2 py-4 glow">
          <img
            src="/images/transparent-logo-bright.png"
            alt="logo for spellman's consulting its a blue code symbol </> with a wand in place of the slash"
            class=" bg-violet-900 box-content hover:border-2 hover:border-white hover:rounded-full hover:bg-white"
            height="40"
            width="40"
          />

          <p class="ml-4 font-Rogue">
            <span class="inline-block text-white text-[30px] ">
              {" "}
              Spellman's{" "}
            </span>
            <span class="inline-block text-white  text-[30px]">
              {" "}
              Consulting
            </span>
          </p>
        </div>
        <ul className="flex flex-col space-y-3 pt-6 bg-[#3c5dca] text-center font-Rogue text-2xl">
          {/* ************************** FIRST ITEM ***********************  */}
          <li className="glow gradient-line border-b-2 pb-1">
            <a href="/#home">
              <span className="text-center">home</span>
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
                        <a href="/#projects">newest projects</a>
                      </li>

                      <li className="cursor-pointer glow">
                        <a href="/otherprojects/">other projects </a>
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
              <span>services </span>
            </a>
          </li>

          <li className="glow gradient-line border-b-2 pb-1">
            <a href="/#process">the process </a>
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
    </div>
  );
};

export default sidebar;
