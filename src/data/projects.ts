export type Video = {
  type: "vimeo" | "youtube";
  id: string;
  title?: string;
};

export type Project = {
  slug: string;
  title: string;
  type: string[];
  headline: string;
  overview: string;
  liveUrl?: string;
  accent: string;
  featured: boolean;
  heroImage?: string;
  galleryImages?: string[];
  metrics?: { label: string; value: string }[];
  sections?: { heading: string; body: string; image?: string }[];
  deliverables?: string[];
  videos?: Video[];
};

export const projects: Project[] = [
  {
    slug: "royi-sal",
    title: "Royi Sal",
    type: ["UI/UX", "Web Design", "Research"],
    headline: "Transforming a cluttered, outdated site into a clean, conversion-focused experience.",
    overview:
      "Full redesign of Royi Sal from research and competitor benchmarking through information architecture, wireframing, prototyping, and developer handoff. The result was a measurably better user experience and a dramatic lift in conversions.",
    liveUrl: "https://royisal.com",
    accent: "violet",
    featured: true,
    heroImage: "/images/projects/royi-sal/hero.png",
    galleryImages: [
      "/images/projects/royi-sal/before-after-desktop.png",
      "/images/projects/royi-sal/before-after-mobile.png",
      "/images/projects/royi-sal/competitor-analysis.png",
      "/images/projects/royi-sal/competitor-analysis-2.png",
      "/images/projects/royi-sal/user-journey.png",
      "/images/projects/royi-sal/nav-before-after.png",
    ],
    metrics: [
      { label: "Conversion rate", value: "3.6% to 13.8%" },
      { label: "Form submissions", value: "+54.9%" },
      { label: "Session duration", value: "+23%" },
    ],
    sections: [
      {
        heading: "The Challenge",
        body: "The existing site had overwhelming navigation with multiple competing CTAs, a mobile-unfriendly layout with long unstructured pages, inconsistent fonts and brand tone, stale content with text placed over images, and clunky animations with poor mobile performance.",
        image: "/images/projects/royi-sal/before-after-desktop.png",
      },
      {
        heading: "Competitor Benchmarking",
        body: "Analyzed how Royi Sal compared to industry competitors in navigation, content depth, and brand positioning. Most competitors offered strong craftsmanship and B2B capabilities but lacked digital clarity and mobile usability. This clarified how Royi Sal could differentiate through clarity, usability, and stronger digital storytelling.",
        image: "/images/projects/royi-sal/competitor-analysis.png",
      },
      {
        heading: "User Journey Mapping",
        body: "Mapped user goals, actions, pain points, and opportunities across the full journey from Awareness through Consideration, Decision, and Post-Decision. Key pain points included slow load times, poor mobile navigation, lack of social proof, and unclear category structure.",
        image: "/images/projects/royi-sal/user-journey.png",
      },
      {
        heading: "Information Architecture",
        body: "Reorganized the site structure to reduce cognitive load and make product discovery more intuitive. Simplified top-level navigation, grouped product categories based on user mental models, and removed redundant pages. Navigation went from 21 submenu items down to 5 clear sections with a persistent CTA.",
        image: "/images/projects/royi-sal/nav-before-after.png",
      },
      {
        heading: "Mobile Redesign",
        body: "Rebuilt the mobile experience from the ground up with a mobile-first approach. Optimized layouts for smaller screens, improved touch targets, and significantly reduced load times.",
        image: "/images/projects/royi-sal/before-after-mobile.png",
      },
    ],
  },
  {
    slug: "media-net",
    title: "Media.net",
    type: ["Web Design", "Research", "UI/UX", "Ad Design"],
    headline: "Boosting ad performance for some of the world's biggest publishers.",
    overview:
      "At Media.net, specialized in graphic design and ad performance for major publishers including Forbes, Apple News, WebMD, and Wikihow. Used Adobe Creative Suite and Figma to design, test, and refine ad creatives.",
    accent: "emerald",
    featured: true,
    heroImage: "/images/projects/media-net/hero.png",
    galleryImages: [
      "/images/projects/media-net/hero.png",
      "/images/projects/media-net/apple-news.png",
      "/images/projects/media-net/webmd.png",
      "/images/projects/media-net/wikihow.png",
    ],
    deliverables: [
      "Strategic advertisements for Forbes.com targeting higher click-through rate",
      "User behavior research to guide ad design direction",
      "Landing pages, logos, icons, and digital assets",
      "UI/UX design, video editing, and photo manipulation across the ad tech sector",
    ],
  },
  {
    slug: "luags-gallery",
    title: "Luags Gallery",
    type: ["Branding", "Web Design", "UI/UX", "Shopify"],
    headline: "Showcasing the world's first jewelry collections made with LuAG stone.",
    overview:
      "Created the full digital identity for LuAGs Gallery, a new brand introducing LuAG (Lutetium Aluminum Garnet), a first-of-its-kind gemstone, into the jewelry market.",
    liveUrl: "https://luagsgallery.com",
    accent: "cyan",
    featured: true,
    heroImage: "/images/projects/luags-gallery/hero.png",
    sections: [
      {
        heading: "Introducing an Unknown Gemstone",
        body: "LuAG (Lutetium Aluminum Garnet) had never been sold as jewelry before. The design challenge was not just building a store but making a completely unfamiliar material feel desirable and trustworthy. Every element had to do double duty: sell the stone while explaining what it is.",
      },
      {
        heading: "Luxury Identity from Scratch",
        body: "Built the full brand identity from zero. The color system pairs deep blacks with cool metallic accents to reflect the stone's optical properties. Typography was chosen to sit at the intersection of scientific precision and high-end jewelry retail. The logo mark abstracts the gem's crystalline structure into a minimal, ownable shape.",
      },
      {
        heading: "Shopify Architecture",
        body: "Designed and built the full Shopify experience with a conversion-first mindset. Product pages lead with the stone's story before the purchase decision, reducing hesitation for a material most visitors have never heard of. Collection structure, filtering, and checkout flow were all mapped to minimize drop-off at each step.",
      },
      {
        heading: "Mobile as the Primary Surface",
        body: "The majority of luxury jewelry browsing happens on mobile. Every layout decision was validated on a phone first. Images scale to fill the screen, product detail accordions are thumb-friendly, and the add-to-cart flow collapses to a single persistent action at the bottom of the page.",
      },
    ],
    deliverables: [
      "Logo, color system, and typography for a modern luxury identity",
      "Full UI/UX design and Shopify build",
      "Storytelling about the stone's uniqueness with a conversion-driven user flow",
      "Optimized for desktop and mobile for a fast, seamless experience",
    ],
  },
  {
    slug: "heyoka-gallery",
    title: "Heyoka Gallery",
    type: ["Branding", "Web Design", "UI/UX", "Shopify"],
    headline: "Bringing the legacy of sacred art into a modern digital presence.",
    overview:
      "Created the full digital identity and website for Heyoka Gallery, a brand dedicated to transforming the legendary works of sacred artist Heyoka Merrifield into a curated online experience.",
    liveUrl: "https://heyokagallery.com",
    accent: "orange",
    featured: true,
    heroImage: "/images/projects/heyoka-gallery/hero.png",
    sections: [
      {
        heading: "Art First, Commerce Second",
        body: "Heyoka Merrifield spent decades creating sacred art rooted in Native American tradition. The brief was to bring that body of work online without flattening it into a product catalogue. The site had to feel like a gallery you could also buy from, not a store that happened to have art in it.",
      },
      {
        heading: "A Brand That Honors the Work",
        body: "The visual identity draws from the earthy, warm tones running through Heyoka's paintings. Serif typography with generous spacing gives the text the same weight as the imagery. The logo direction was restrained intentionally: the art is the hero, and the brand exists to frame it, not compete with it.",
      },
      {
        heading: "Exhibition-Style Browsing",
        body: "Product pages were designed to read like gallery wall labels: the artwork's story, its context, and its materials described before the price. Collections are organized by theme and medium, letting visitors move through the work the way they would move through a physical show.",
      },
      {
        heading: "Storytelling That Converts",
        body: "The artist's journey is woven through the site rather than buried on an About page. Visitors encounter Heyoka's background and philosophy at the moments when trust matters most, just before they decide whether to buy. The result is a checkout flow that feels earned rather than pushed.",
      },
    ],
    deliverables: [
      "Typography, color system, and logo direction honoring the artist's legacy",
      "Full UI/UX design and Shopify build",
      "Art-inspired jewelry, prints, and collaborations browsing experience",
      "Balanced storytelling of Heyoka's artistic journey with clear e-commerce structure",
    ],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design & Video",
    type: ["Social Media", "Branding", "Graphic Design", "Video Editing"],
    headline: "Scroll-stopping content and brand identities from social media to video production.",
    overview:
      "A body of creative work spanning social media design, brand identity, and video production. Clients included Pizza Stock Exchange, Benzer, Drunken Monkeys, Blind Ch3mistry, Youth Opportunities Uprising, and Banish Shoes. Also includes motion and marketing work produced at ETSIPL.",
    accent: "pink",
    featured: true,
    heroImage: "/images/projects/graphic-design/psx-1.jpg",
    galleryImages: [
      "/images/projects/graphic-design/psx-1.jpg",
      "/images/projects/graphic-design/psx-2.png",
      "/images/projects/graphic-design/psx-3.png",
      "/images/projects/graphic-design/psx-4.jpg",
      "/images/projects/graphic-design/psx-5.jpg",
      "/images/projects/graphic-design/psx-6.jpg",
    ],
    videos: [
      { type: "vimeo", id: "907702762", title: "Brand Reel" },
      { type: "vimeo", id: "907705128", title: "Social Campaign" },
      { type: "vimeo", id: "953811096", title: "Product Video" },
      { type: "vimeo", id: "953799608", title: "Campaign Film" },
      { type: "vimeo", id: "953811074", title: "Motion Reel" },
      { type: "youtube", id: "WdyRjE8XT-g", title: "Brand Film" },
    ],
    deliverables: [
      "Posts, stories, and reels across Instagram, Facebook, and LinkedIn",
      "Brand identities through logos and website banners",
      "Visual alignment with campaign goals across diverse client teams",
      "Marketing materials combining creativity with strategic thinking",
      "Motion graphics and video editing for brand films and social content",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
