export type Experience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
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
    period: "2024 to Present",
    bullets: [
      "Led full redesign from research and competitor benchmarking through information architecture, wireframing, prototyping, and developer handoff",
      "Improved conversion rate from 3.6% to 13.8%",
      "Increased form submissions by 54.9%",
      "Boosted average session duration by 23%",
      "Collaborated with CEO, developers, and marketing team",
    ],
  },
  {
    role: "Graphic Designer",
    company: "Media.net",
    period: "2022 to 2024",
    bullets: [
      "Enhanced ad performance for major publishers including Forbes, Apple News, WebMD, and Wikihow",
      "Designed landing pages, logos, icons, and digital assets",
      "Worked across UI/UX design, video editing, and photo manipulation in the ad tech sector",
      "Proficient in Adobe Creative Suite and Figma for ad testing and refinement",
    ],
  },
  {
    role: "Creative Designer",
    company: "ETSIPL",
    period: "2021 to 2022",
    bullets: [
      "Designed marketing materials combining creativity with strategic thinking",
      "Contributed to visual storytelling and brand identity work",
    ],
  },
  {
    role: "Social Media Designer",
    company: "Pizza Stock Exchange",
    period: "2021",
    bullets: [
      "Created social media content including posts, stories, and reels for Instagram, Facebook, and LinkedIn",
      "Contributed to brand identity through logos and website banners",
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
    year: "2021",
  },
];
