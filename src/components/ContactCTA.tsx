import { Mail, ArrowRight } from "lucide-react";
import LinkedInIcon from "@/components/LinkedInIcon";

export default function ContactCTA() {
  return (
    <section className="bg-violet-600 text-white">
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-violet-200 font-medium mb-3 uppercase tracking-widest text-sm">
          Available for work
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Have a project in mind?
        </h2>
        <p className="text-violet-200 text-lg max-w-xl mx-auto mb-10">
          Whether you have a project in mind or just want to connect, I would love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:keithpaul00@gmail.com"
            className="inline-flex items-center gap-2 bg-white text-violet-600 font-semibold px-7 py-4 rounded-full hover:bg-violet-50 transition-colors"
          >
            <Mail size={18} />
            keithpaul00@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/keith-paul-1450241a3/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-7 py-4 rounded-full hover:bg-white/10 transition-colors"
          >
            <LinkedInIcon size={18} />
            LinkedIn
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
