import React from "react";

export default function WhereToFindMeSection() {
  let SocialLinks = [
    {
      href: "https://www.linkedin.com/in/janet-spellmanmarsh/",
      icon: "linkedIn",
      title: "LinkedIn",
      alt: "Link to LinkedIn",
    },
    {
      href: "https://bsky.app/profile/ghiblimagic.bsky.social",
      icon: "bluesky",
      title: "bluesky",
      alt: "Link to bluesky",
    },

    {
      href: "https://x.com/ghiblimagicdev",
      icon: "twitter",
      title: "twitter",
      alt: "Link to twitter",
    },

    {
      href: "https://github.com/ghiblimagic",
      icon: "github",
      title: "github",
      alt: "Link to github",
    },

    {
      href: "https://www.youtube.com/@ghiblimagicdev",
      icon: "youtube",
      title: "youtube",
      alt: "Link to youtube",
    },

    {
      href: "https://www.twitch.tv/ghiblimagic",
      icon: "twitch",
      title: "twitch",
      alt: "Link to twitch",
    },
    {
      href: "https://ghiblimagic.hashnode.dev/",
      icon: "hashnode",
      title: "hashnode",
      alt: "Link to hashnode",
    },

    {
      href: "https://dev.to/ghiblimagic",
      icon: "dev",
      title: "dev.to",
      alt: "Link to dev.to",
    },

    {
      href: "https://wellfound.com/u/janet-spellmanmarsh",
      icon: "wellfound",
      title: "wellfound",
      alt: "Link to email",
    },
  ];
  //title used to make the font awesome icons accessible     https://fontawesome.com/v5/docs/web/other-topics/accessibility#svg-with-javascript-semantic-icons

  // https://stackoverflow.com/questions/69911071/mapping-and-displaying-fontawesome-icons had to change icon name to a non string value

  return (
    <div className="grid grid-cols-1 w-fit lg:w-full mx-auto lg:grid-cols-2 xl:grid-cols-3 mb-5">
      {SocialLinks.map((item) => (
        <div
          key={item.href}
          className="mb-4"
        >
          <a href={item.href}>
            <img
              className="mx-1 size-7
                hover:border-4 hover:rounded-sm hover:border-violet-500 
        md:size-8 inline-block "
              src={`/images/${item.icon}.svg`}
              alt={item.alt}
              title={item.title}
              loading="eager"
            />
          </a>
          <span className="pl-2 text-violet-9">{item.href} </span>
        </div>
      ))}
    </div>
  );
}
