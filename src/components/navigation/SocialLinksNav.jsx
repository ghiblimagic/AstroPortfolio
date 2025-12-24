import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import GradientButton from "../buttons/GradientButtonReact";

function SocialLinksNav() {
  let SocialLinks = [
    {
      href: "https://twitter.com/Janetthedev",
      icon: "twitter",
      title: "twitter",
      alt: "Link to twitter",
    },
    {
      href: "https://www.linkedin.com/in/janet-spellmanmarsh/",
      icon: "linkedIn",
      title: "LinkedIn",
      alt: "Link to LinkedIn",
    },
    {
      href: "https://github.com/ghiblimagic",
      icon: "github",
      title: "github",
      alt: "Link to github",
    },
    {
      href: "mailto:janetspellman13@gmail.com",
      icon: "icon-envelope",
      title: "email",
      alt: "Link to email",
    },
    {
      href: "https://wellfound.com/u/janet-spellmanmarsh",
      icon: "wellfound",
      title: "wellfound",
      alt: "Link to wellfound",
    },
  ];
  //title used to make the font awesome icons accessible     https://fontawesome.com/v5/docs/web/other-topics/accessibility#svg-with-javascript-semantic-icons

  // https://stackoverflow.com/questions/69911071/mapping-and-displaying-fontawesome-icons had to change icon name to a non string value
  return (
    <NavigationMenu
      className="md:pr-10 py-2 bg-mainColor"
      id="social"
    >
      {/* //23:53:04 [WARN] [vite] Files in the public directory are served at the root path.
      Instead of /public/images/logo-purple.png, use /images/logo-purple.png. */}
      <img
        src="/images/transparent-logo-bright-small.webp"
        alt="logo for spellman's consulting its a blue code symbol </> with a wand in place of the slash"
        className=" bg-mainColor box-content absolute left-[10px] md:none "
        height="40"
        width="40"
        loading="eager"
      />

      <NavigationMenuList>
        {/* <a
          className="skip-link right-5 top-5 p-3 bg-mainColor text-white"
          href="#home"
        >
          Skip to content
        </a> */}
        <NavigationMenuItem key={`Skip Link For Social Links Nav`}>
          <NavigationMenuLink
            href="#home"
            className="skip-link right-5 top-5 p-3 bg-mainColor text-white"
          >
            Skip to content
          </NavigationMenuLink>
        </NavigationMenuItem>

        <div className="hidden md:block pr-4">
          <GradientButton
            text="Contact"
            link="/#contact"
            primary
          />
        </div>

        {SocialLinks.map((item) => (
          <NavigationMenuItem key={`${item.title} Nav Menu Item`}>
            <NavigationMenuLink
              href={item.href}
              title={item.title}
            >
              <img
                className="mx-1 inline-block size-7 
                hover:border-2 hover:rounded-sm hover:border-violet-500 
        md:size-8"
                src={`/images/${item.icon}.svg`}
                alt={item.alt}
                loading="eager"
              />
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default SocialLinksNav;
