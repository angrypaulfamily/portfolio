export type Project = {
  slug: string;
  title: string;
  type: string[];
  headline: string;
  overview: string;
  liveUrl?: string;
  accent: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
  sections?: { heading: string; body: string }[];
  deliverables?: string[];
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
    metrics: [
      { label: "Conversion rate", value: "3.6% → 13.8%" },
      { label: "Form submissions", value: "+54.9%" },
      { label: "Session duration", value: "+23%" },
    ],
    sections: [
      {
        heading: "The Challenge",
        body: "The existing site had overwhelming navigation with multiple competing CTAs, a mobile-unfriendly layout with long unstructured pages, inconsistent fonts and brand tone, stale content with text placed over images, and clunky animations with poor mobile performance.",
      },
      {
        heading: "Competitor Benchmarking",
        body: "Analyzed how Royi Sal compared to industry competitors in navigation, content depth, and brand positioning. Most competitors offered strong craftsmanship and B2B capabilities but lacked digital clarity and mobile usability. This clarified how Royi Sal could differentiate through clarity, usability, and stronger digital storytelling.",
      },
      {
        heading: "User Journey Mapping",
        body: "Mapped user goals, actions, pain points, and opportunities across the full journey from Awareness through Consideration, Decision, and Post-Decision. Key pain points included slow load times, poor mobile navigation, lack of social proof, and unclear category structure.",
      },
      {
        heading: "Information Architecture",
        body: "Reorganized the site structure to reduce cognitive load and make product discovery more intuitive. Simplified top-level navigation, grouped product categories based on user mental models, and removed redundant pages. Navigation went from 21 submenu items down to 5 clear sections with a persistent CTA.",
      },
      {
        heading: "Outcome",
        body: "Clearer product discovery, higher-quality inquiries, improved mobile experience, and stronger brand perception. The redesign connected craftsmanship, credibility, and usability into one cohesive experience.",
      },
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
    deliverables: [
      "Typography, color system, and logo direction honoring the artist's legacy",
      "Full UI/UX design and Shopify build",
      "Art-inspired jewelry, prints, and collaborations browsing experience",
      "Balanced storytelling of Heyoka's artistic journey with clear e-commerce structure",
    ],
  },
  {
    slug: "social-media-design",
    title: "Social Media Design",
    type: ["Social Media", "Branding", "Graphic Design"],
    headline: "Scroll-stopping content for brands across Instagram, Facebook, and LinkedIn.",
    overview:
      "Extensive freelance social media design work across multiple brands and industries. Clients included Pizza Stock Exchange, Benzer, Drunken Monkeys, Blind Ch3mistry, Youth Opportunities Uprising, Banish Shoes, and more.",
    accent: "pink",
    featured: false,
    deliverables: [
      "Posts, stories, and reels across Instagram, Facebook, and LinkedIn",
      "Brand identities through logos and website banners",
      "Visual alignment with campaign goals across diverse client teams",
      "Platform-specific visual strategies for engagement",
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
    featured: false,
    deliverables: [
      "Strategic advertisements for Forbes.com targeting higher click-through rate",
      "User behavior research to guide ad design direction",
      "Landing pages, logos, icons, and digital assets",
      "UI/UX design, video editing, and photo manipulation across the ad tech sector",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
