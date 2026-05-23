import { Mail, MapPin, Clock } from "lucide-react";
import LinkedInIcon from "@/components/LinkedInIcon";
import AnimatedSection from "@/components/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Keith Paul",
  description: "Get in touch with Keith Paul. Available for UI/UX design projects. Remote / Bangkok.",
};

export default function ContactPage() {
  return (
    <section className="min-h-[80vh] bg-stone-50 flex items-center py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <AnimatedSection>
              <p className="text-violet-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Get in touch
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-6">
                Let&apos;s Talk
              </h1>
              <p className="text-stone-500 text-lg mb-10 leading-relaxed">
                Whether you have a project in mind or just want to connect, I would love to hear
                from you.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-stone-600 text-sm">
                  <span className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                    <MapPin size={14} className="text-violet-600" />
                  </span>
                  Remote / Bangkok
                </div>
                <div className="flex items-center gap-3 text-stone-600 text-sm">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Clock size={14} className="text-emerald-600" />
                  </span>
                  Available for new projects
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:keithpaul00@gmail.com"
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-7 py-4 rounded-full transition-colors"
                >
                  <Mail size={18} />
                  Send an Email
                </a>
                <a
                  href="https://www.linkedin.com/in/keith-paul-1450241a3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900 font-semibold px-7 py-4 rounded-full transition-colors"
                >
                  <LinkedInIcon size={18} />
                  LinkedIn
                </a>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-3xl border border-stone-100 p-10 shadow-sm">
              <h2 className="text-2xl font-bold text-stone-900 mb-2">Reach out directly</h2>
              <p className="text-stone-400 text-sm mb-8">
                I typically respond within 24 hours.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:keithpaul00@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-violet-50 border border-violet-100 hover:bg-violet-100 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm">Email</p>
                    <p className="text-stone-500 text-sm">keithpaul00@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/keith-paul-1450241a3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-cyan-50 border border-cyan-100 hover:bg-cyan-100 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center shrink-0">
                    <LinkedInIcon size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm">LinkedIn</p>
                    <p className="text-stone-500 text-sm">keith-paul-1450241a3</p>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-8 border-t border-stone-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-700 text-sm font-semibold">Available for work</span>
                </div>
                <p className="text-stone-400 text-xs">
                  Open to full-time, contract, and freelance opportunities.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
