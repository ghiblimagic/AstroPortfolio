import Project from "../Project";
export default function LatestProjects() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-12">
      <Project
        webmsrc={"images/tataru.webm"}
        mp4src={"images/tataruo.mp4"}
        vidTitles={"Video of the Tatarus Corner Website"}
        projectTitle={"Tataru's Corner"}
        projectLanguages={
          " HTML, CSS, Tailwindcss, JavaScript, React, Node.JS, React Router, GIMP"
        }
        projectDescription={
          "A fansite for everyones favorite fiesty Final Fantasy 14 receptionist. Originally created as a Christmas present at the request of a client, this public version keeps the functionality but replaces their personal character with the popular NPC, Tataru!"
        }
        linkToCode={"https://github.com/ghiblimagic/Tataru"}
        linkToLiveSite={"https://tataru.onrender.com/"}
        loadingtype={"eager"}
        readmeLink={"https://github.com/ghiblimagic/Tataru/blob/main/README.md"}
      ></Project>

      <Project
        imgsrc={"/images/pokemonREADMEgiphy.gif"}
        vidTitles={"Video of pet profile tailors website"}
        projectTitle={"PokéDeck"}
        projectLanguages={
          " CSS, JavaScript, EJS, Express.js, Node.js, MongoDB, Mongoose, Sessions, Bcrypt"
        }
        projectDescription={
          "This project is dedicated to one of the best stories ever told that influenced millions of kids and adults alike. A CRUD app with local authentication so you can add different Pokemon to your deck to view their abilities and information to plan out your perfect PokéDeck. Built with a team of developers."
        }
        linkToCode={"https://github.com/ghiblimagic/group-project-todo-mvc"}
        loadingtype={"eager"}
      ></Project>

      <Project
        webmsrc={"/images/leaping-rabbit.webm"}
        mp4src={"images/leaping-rabbit.mp4"}
        vidTitles={"video showing a responsive restaurant webpage"}
        projectTitle={"The Leaping Rabbit"}
        projectLanguages={"HTML5, CSS, Shopify"}
        projectDescription={
          "A one-page, responsive website for a unique rabbit themed restaurant called The Leaping Rabbit. A shopify storefront for The Leaping Rabbit was created and integrated to the website."
        }
        linkToCode={"https://github.com/ghiblimagic/TheLeapingRabbit"}
        linkToLiveSite={"https://ghiblimagic.github.io/TheLeapingRabbit/"}
        loadingtype={"lazy"}
      ></Project>

      <Project
        webmsrc={"/images/friendapp.webm"}
        mp4src={"/images/friendapp.mp4"}
        vidTitles={
          "video showing a responsive website that allows users to make posts about a friend"
        }
        projectTitle={"Thanks to a Friend"}
        projectLanguages={"JavaScript, HTML5, CSS, EJS, Express, Mongoose"}
        projectDescription={
          "A public version of a CRUD app created as a gift to a friend, where users can add, edit or delete personalized messages."
        }
        linkToCode={"https://github.com/ghiblimagic/thanksapp"}
        linkToLiveSite={"https://thanksfriend.cyclic.app/"}
        loadingtype={"lazy"}
      ></Project>

      <Project
        webmsrc={"/images/nasa.webm"}
        mp4src={"/images/NASA picture of the day.mp4"}
        vidTitles={"video of a site showing NASA's picture of the day"}
        projectTitle={"NASA's Picture of the Day"}
        projectLanguages={"JavaScript, HTML5, CSS"}
        projectDescription={
          "Enter a date and recieve a picture, video or game of the day directly from NASA's API. Select the date, 6/19/2022, to play Super Planet Crash!"
        }
        linkToCode={"https://github.com/ghiblimagic/Nasa-daily-photo"}
        linkToLiveSite={"https://ghiblimagic.github.io/Nasa-daily-photo/"}
        loadingtype={"lazy"}
      ></Project>

      <Project
        webmsrc={"/images/pokemon-gym.webm"}
        mp4src={"/images/pokemon-gym.mp4"}
        vidTitles={"Video of a pokemon gym themed website"}
        projectTitle={"Level Ground Pokemon Gym"}
        projectLanguages={"HTML5, CSS"}
        projectDescription={"Responsive mock site of a pokemon gym's services."}
        linkToCode={"https://github.com/ghiblimagic/gym"}
        linkToLiveSite={"https://ghiblimagic.github.io/gym/"}
        loadingtype={"eager"}
      ></Project>
    </div>
  );
}
