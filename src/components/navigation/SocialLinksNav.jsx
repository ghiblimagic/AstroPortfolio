import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { socialIcons } from "@/data/socialIcons";

function SocialLinksNav() {
  //title used to make the font awesome icons accessible     https://fontawesome.com/v5/docs/web/other-topics/accessibility#svg-with-javascript-semantic-icons

  // https://stackoverflow.com/questions/69911071/mapping-and-displaying-fontawesome-icons had to change icon name to a non string value
  return (
    <NavigationMenu
      className="py-2 min-w-0"
      id="social"
      aria-label="Site and social links"
    >
      {/* //23:53:04 [WARN] [vite] Files in the public directory are served at the root path.
      Instead of /public/images/logo-purple.png, use /images/logo-purple.png. */}
      <img
        src="/images/transparent-logo-bright-small.webp"
        alt="logo for spellman's consulting its a blue code symbol </> with a wand in place of the slash"
        className="  box-content absolute left-[10px] md:none "
        height="40"
        width="40"
        loading="eager"
      />

      <NavigationMenuList className="flex-wrap justify-end gap-y-1">
        {/* <a
          className="skip-link right-5 top-5 p-3 bg-mainColor text-white"
          href="#main-content"
        >
          Skip to content
        </a> */}
        <NavigationMenuItem key={`Skip Link For Social Links Nav`}>
          <NavigationMenuLink
            href="#main-content"
            className="skip-link right-5 top-5 p-3 bg-mainColor text-white rounded-2xl"
          >
            Skip to content
          </NavigationMenuLink>
        </NavigationMenuItem>

        <div className="hidden md:block pr-4">
          <a href="/#contact" className="btn-primary">
            Contact
          </a>
        </div>

        {socialIcons.map((item) => (
          <NavigationMenuItem key={`${item.name} Nav Menu Item`}>
            <NavigationMenuLink
              href={item.href}
              aria-label={`Janet on ${item.label}`}
              className="social-icon-link mx-0.5 sm:mx-1"
            >
              <svg
                className="social-icon-svg"
                viewBox={item.viewBox}
                aria-hidden="true"
              >
                <path d={item.path} />
              </svg>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default SocialLinksNav;
