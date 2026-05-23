export type Tool = {
  name: string;
  subtitle: string;
  description: string;
};

export type ToolCategory = {
  category: string;
  color: string;
  tools: Tool[];
};

export const toolkit: ToolCategory[] = [
  {
    category: "Design Tools",
    color: "violet",
    tools: [
      {
        name: "Figma + Figma AI",
        subtitle: "Collaborative Design and AI Generation",
        description:
          "My primary design environment for everything from user flows and wireframes through high-fidelity UI and design systems. Figma AI and Figma Make let me generate and iterate on UI directly from prompts.",
      },
      {
        name: "Framer",
        subtitle: "Web Design and Prototyping",
        description:
          "My go-to for building interactive prototypes and production-ready websites. It bridges the gap between design and development, letting me bring ideas to life that stakeholders can click through.",
      },
      {
        name: "Adobe Illustrator",
        subtitle: "Vector Graphics",
        description:
          "The tool I rely on for logo design, icons, and any work that demands precision at any scale.",
      },
      {
        name: "Adobe Photoshop",
        subtitle: "Image Manipulation",
        description:
          "My image editing foundation. I use it for retouching, compositing, and making sure every visual is pixel-perfect before it goes anywhere.",
      },
      {
        name: "Adobe After Effects",
        subtitle: "Motion and Animation",
        description:
          "My tool for motion graphics, animated UI elements, and any video work that needs cinematic compositing.",
      },
      {
        name: "Adobe Premiere Pro",
        subtitle: "Video Editing",
        description:
          "Where I bring video content together. From brand films to social media reels, Premiere Pro is where the final edit happens.",
      },
      {
        name: "Notion",
        subtitle: "Project Management",
        description:
          "Keeps everything organized across projects. Design notes, timelines, documentation, and client communication all live here.",
      },
    ],
  },
  {
    category: "AI Design Tools",
    color: "cyan",
    tools: [
      {
        name: "Relume",
        subtitle: "AI Sitemap and Wireframe Generation",
        description:
          "Dramatically speeds up the UX planning phase. I use Relume to generate sitemaps and wireframe structures from a brief, then refine from there in Figma.",
      },
      {
        name: "Midjourney",
        subtitle: "Visual Concept Generation",
        description:
          "My tool for rapid mood boarding, visual exploration, and generating reference imagery that shapes the direction of a project before a single screen is designed.",
      },
      {
        name: "v0 by Vercel",
        subtitle: "UI Component Generation",
        description:
          "Generates production-ready UI components from text descriptions. Excellent for quickly exploring interface options and getting clean, usable code output.",
      },
    ],
  },
  {
    category: "AI Builders",
    color: "orange",
    tools: [
      {
        name: "Lovable",
        subtitle: "Full-Stack AI App Builder",
        description:
          "I use Lovable to go from a prompt to a working, deployed application in a fraction of the time a traditional build would take. Invaluable for rapid client prototyping and proof-of-concept work.",
      },
      {
        name: "Base44",
        subtitle: "AI App Builder",
        description:
          "Fast, flexible, and genuinely useful for getting ideas into a live product quickly. Great for projects where speed to prototype is critical.",
      },
      {
        name: "Bolt.new",
        subtitle: "Full-Stack AI Builder",
        description:
          "Strong for building interactive prototypes that actually work end to end. Bolt bridges design intent and functional product faster than almost anything else I have used.",
      },
      {
        name: "Cursor",
        subtitle: "AI Code Editor",
        description:
          "Where design meets development. Cursor lets me write and refine code with AI assistance, which has given me a much stronger understanding of how my designs get built and what is actually feasible.",
      },
    ],
  },
  {
    category: "AI Assistants",
    color: "pink",
    tools: [
      {
        name: "Claude",
        subtitle: "Design Thinking, Writing, and Code",
        description:
          "My primary AI assistant. I use Claude for design research, writing UX copy, generating and reviewing code, and thinking through problems before I start designing. It is the tool I reach for most.",
      },
    ],
  },
];
