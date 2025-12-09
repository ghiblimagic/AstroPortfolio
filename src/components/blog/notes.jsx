// mermaid for website flowchart

// import Mermaid from "../../components/blog/Mermaid.astro";

// <Mermaid code={`
// flowchart TD

// START["Start"]

// %% MAIN SPLIT
// START --> FW["Want a multi-page website?"]

// %% QUICK PATH
// QUICKOPT["<b>Google Business Page</b> <br/> (free, but its just <br> a google listing, <br> not a website)<br><br><b>Carrd, Google Sites or Siimple</b> <br> (cheap fast, simple, <br> but limited customization)"]

// %% FULL WEBSITE PATH
// FW -->|Yes| SUFFER["Do you enjoy suffering?"]
// FW -->|No| QUICKOPT

// %% SUFFER CHECK
// SUFFER -->|Yes| GODADDY["<b>GoDaddy</b> <br> (Aggressive upselling, poor customer service, slow servers which lower SEO potential )"]
// SUFFER -->|No| SELL["Need to sell things online?"]

// %% SELL CHECK
// SELL -->|Yes| FEW["Selling only a few products<br>Or <br> you just need DoorDash or UberEats integration?"]
// SELL -->|No| DESIGN["Want total design control<br/>aka you are a designer?"]

// %% FEW PRODUCTS PATH
// FEW -->|Yes| SMALLSHOP["<b>Squarespace / WordPress / Wix</b><br>with e-commerce plugins<br/>(good for small shops) <br> <br><b>Carrd or Google Sites</b><br> (by embedding Ecwid or other e-commerce stores) <br><br>

// <b>Ecwid</b>
// (E-commerce thats usually integrated in a website like Wix, though you can use their free but very basic website builder)<br><br>

// <b>Pixpa</b><br> (For creatives that want a website & simple shop to sell prints, ect)"]
// FEW -->|No| SHOPIFY["<b>Shopify</b> <br> (best for full online stores) <br> <br> <b>Wordpress</b> <br> (with e-commerce plugins like BigCommerce WooCommerce)  <br> <br> <b>Industry specific website builders</b> <br> (for large businesses)"]

// %% POS CHECK
// SMALLSHOP --> POS["Is built-in POS integration the top priority? <br><br> (read the article below this flowchart <br> if you are confused why you might want this)"]
// POS -->|Yes| POSOPT["<b>Square</b> or <b>Wix</b> <br> (for any type of business)<br> <br><b>Toast</b> <br>(specifically for restaurants)"]
// POS -->|No| DESIGN

// %% DESIGN CONTROL BRANCH
// DESIGN -->|Yes| WEBFLOW["<b>Webflow</b>"]
// DESIGN -->|No| TEMPLATES["Do you want to customize <br> templates heavily?"]

// %% TEMPLATE CHOICE QUESTION
// TEMPLATES -->|No| CHOICE["Would you prefer many template options
// even if it takes more time to adjust them"]

// %% YES → WIX
// CHOICE -->|Yes| WIX["<b>Wix</b> <br> (more extensions <br> + themes <br> than Squarespace <br> but its more finicky)"]

// %% NO → Squarespace → Hostinger
// CHOICE -->|No| SQ["<b>Squarespace</b> <br> (less templates than <br> Wix or WordPress <br> but templates are well made, <br> mobile & desktop ready <br> easy to use)"]

// %% Hostinger comes after Squarespace
// SQ --> HOST["<b>Hostinger</b> <br> (limited but <br> professional templates, <br> no app/extension store, <br> simple websites only)"]

// %% Pixpa comes after Hostinger
// HOST --> PIXPA["<b>Pixpa</b> <br> (built-in portfolio, gallery, blog <br> and e-commerce tools <br> for creatives)"]

// %% Google Sites comes after Pixpa
// PIXPA --> GOOGLE["<b>Google Sites</b> <br> (Free, best for basic websites)"]

// %% ADVANCED TEMPLATE PATH STILL LEADS TO WORDPRESS
// TEMPLATES -->|Yes| WP["<b>WordPress</b> <br> More customizable, <br> grows with the business, <br> but takes time to learn"]

// %% WP CHOICE
// WP --> WPCHOICE["Do you want a <br> simpler experience <br> in exchange for a: <br><br> • higher base price <br> • less control <br> • being restricted from some themes and plugins?"]

// WPCHOICE -->|Yes| WPCOM["<b>WordPress(.com)</b>"]
// WPCHOICE -->|No| WPORG["<b>WordPress(.org)</b>"]
// `} />
