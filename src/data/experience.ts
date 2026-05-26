export type Experience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  projectSlug?: string;
};

export type Education = {
  degree: string;
  institution: string;
  year: string;
};

export const experience: Experience[] = [
  {
    role: "UI/UX Designer",
    company: "Royi Sal",
    period: "2024 to 2026",
    projectSlug: "royi-sal",
    bullets: [
      "Led end-to-end redesign from competitor benchmarking, user personas, and user flows through information architecture, wireframing, low-fidelity and high-fidelity prototyping, and developer handoff",
      "Drove conversion rate optimisation (CRO) improving conversion rate from 3.6% to 13.8%, increasing form submissions by 54.9%, and boosting average session duration by 23%",
      "Built and implemented a design system with design tokens for visual consistency across all platforms",
      "Leveraged Google Analytics, Microsoft Clarity, and HubSpot Analytics to measure performance and iterate on designs",
      "Collaborated directly with CEO, developers, and marketing stakeholders throughout",
      "Integrated AI tools into workflow for research, prototyping, and asset generation",
    ],
  },
  {
    role: "UI/UX Designer (Freelance)",
    company: "Luags Gallery",
    period: "2024",
    projectSlug: "luags-gallery",
    bullets: [
      "Built full brand identity and Shopify e-commerce experience for a luxury DTC jewelry brand introducing a first-of-its-kind gemstone to market",
      "Designed logo, color system, and typography balancing scientific precision with high-end retail aesthetic",
      "Applied mobile-first design principles throughout, validating every layout decision on mobile before desktop",
      "Architected product pages and checkout flow with a CRO mindset, reducing purchase hesitation for an unfamiliar product",
      "Designed storytelling-led user flows to guide visitors from discovery to purchase",
    ],
  },
  {
    role: "UI/UX Designer (Freelance)",
    company: "Heyoka Gallery",
    period: "2024",
    projectSlug: "heyoka-gallery",
    bullets: [
      "Built complete digital identity and Shopify e-commerce store for a DTC sacred art gallery bringing the work of artist Heyoka Merrifield online",
      "Designed an exhibition-style browsing experience balancing storytelling with e-commerce UX structure",
      "Developed typography, color system, and logo direction that honors the artist's legacy without competing with the work",
      "Created user flows placing the artist's journey at key trust moments to support conversion without feeling transactional",
      "Applied mobile-first design approach throughout the build",
    ],
  },
  {
    role: "UI/UX & Ad Designer",
    company: "Media.net",
    period: "2022 to 2024",
    projectSlug: "media-net",
    bullets: [
      "Designed and optimised ad units and landing pages for major publishers including Forbes, Apple News, WebMD, and Wikihow",
      "Improved campaign performance through user-centred design principles and A/B tested layouts",
      "Worked across responsive web, app, and site placements in the ad tech space",
      "Applied UX thinking and user flows to ad formats to improve engagement and reduce drop-off",
    ],
  },
  {
    role: "Visual Designer",
    company: "ETSIPL, Pizza Stock Exchange & Freelance",
    period: "2021 to 2022",
    projectSlug: "graphic-design",
    bullets: [
      "Designed branding and promotional materials for 50+ international expos across multiple markets",
      "Produced visual identities and campaign assets to support large-scale events",
      "Created social media content including posts, stories, and reels across Instagram, Facebook, and LinkedIn",
      "Contributed to brand identity development through logo design and website banners",
      "Delivered video editing alongside static design deliverables for multiple brands",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "Certification in User Experience and User Interface (UX/UI) Design",
    institution: "Google",
    year: "2023",
  },
  {
    degree: "Bachelor of Arts",
    institution: "St. Xaviers Mumbai",
    year: "2019 to 2021",
  },
];
