import GradientButton from "./buttons/GradientButton";

export default function Projects({
  webmsrc,
  mp4src,
  imgsrc,
  vidTitles,
  projectTitle,
  projectLanguages,
  projectDescription,
  linkToCode,
  linkToLiveSite,
  loadingtype,
  readmeLink,
}) {
  return (
    <article>
      {(webmsrc || mp4src) && (
        <video
          controls
          autoPlay
          muted
          loop
        >
          <source
            src={`${webmsrc}`}
            title={vidTitles}
            type="video/webm"
            loading={loadingtype}
          />
          <source
            src={`${mp4src}`}
            title={vidTitles}
            type="video/mp4"
            loading={loadingtype}
          />
          Sorry, your browser doesn't support embedded videos.
        </video>
      )}
      {imgsrc && (
        <img
          src={`${imgsrc}`}
          title={vidTitles}
          className="h-48 md:h-64"
          loading={loadingtype}
        />
      )}

      <div className="background-tile">
        <h3 className="project-titles my-4">{projectTitle}</h3>

        <span className="project-coding-languages">{projectLanguages}</span>

        <p className="mt-5 project-description">{projectDescription}</p>

        <ul className="gap-4 my-10 flex justify-evenly">
          {linkToCode && (
            <li>
              <GradientButton
                text={"Code"}
                aria="link to codebase"
                link={linkToCode}
                target={"_blank"}
                rel={"noopener noreferrer"}
                secondary
              />
            </li>
          )}
          {linkToLiveSite && (
            <li>
              <GradientButton
                text="View"
                aria="View"
                link={linkToLiveSite}
                target={"_blank"}
                rel={"noopener noreferrer"}
                primary
              />
            </li>
          )}
          {readmeLink && (
            <li>
              <GradientButton
                text="ReadMe"
                aria="readMe"
                link={readmeLink}
                target={"_blank"}
                rel={"noopener noreferrer"}
              />
            </li>
          )}
        </ul>
      </div>
    </article>
  );
}
