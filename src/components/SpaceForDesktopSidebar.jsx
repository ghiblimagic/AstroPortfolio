import DesktopNav from "./navigation/DesktopNav";

// only add space if the navbar is open AND the screen is desktop sized
//aka only add space for desktop sidebar nav, not mobile nav
export default function SpaceForDesktopSidebar() {
  return (
    <>
      <div className="grow-0 shrink-0 basis-60 hidden md:block h-full">
        {/* Desktop nav will be fixed WITHIN the flexed div container, 
        we have to use basis and grow/shrink 0 or the div will adjust its size/change as its flexed */}
        <DesktopNav />
      </div>
    </>
  );
}
