// Dark Shiki theme on the site's --midnight-navy (#141B4D). Every token color
// is light enough to keep >= 7:1 contrast on that background.
export default {
  name: "midnight",
  type: "dark",
  fg: "#E6E9F8",
  bg: "#141B4D",
  settings: [
    { settings: { foreground: "#E6E9F8", background: "#141B4D" } },
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#A9B4E0", fontStyle: "italic" } },
    { scope: ["keyword", "storage", "storage.type", "keyword.control"], settings: { foreground: "#C9BBFF" } },
    { scope: ["string", "string.quoted", "punctuation.definition.string"], settings: { foreground: "#9BE3B5" } },
    { scope: ["constant.numeric", "constant.language", "constant.character", "support.constant"], settings: { foreground: "#FFCB8A" } },
    { scope: ["entity.name.function", "support.function", "meta.function-call"], settings: { foreground: "#8FCBFF" } },
    { scope: ["entity.name.tag", "entity.name.type", "entity.name.class", "support.type", "support.class"], settings: { foreground: "#FF9DB0" } },
    { scope: ["variable", "variable.other", "entity.other.attribute-name"], settings: { foreground: "#E6E9F8" } },
    { scope: ["variable.parameter", "variable.other.property", "meta.object-literal.key"], settings: { foreground: "#D6D3F7" } },
    { scope: ["keyword.operator", "punctuation"], settings: { foreground: "#B9C4EC" } },
  ],
};
