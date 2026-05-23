import ContactCTA from "@/components/ContactCTA";
import AnimatedSection from "@/components/AnimatedSection";
import { experience, education } from "@/data/experience";
import { testimonials } from "@/data/testimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Keith Paul",
  description: "Get to know Keith Paul, a UI/UX Designer with 5+ years of experience. Remote / Bangkok.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-stone-50 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-violet-600 font-semibold text-sm uppercase tracking-widest mb-3">
              About me
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-8 max-w-2xl">
              Get to Know Me Better
            </h1>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection delay={0.1}>
              <div className="space-y-5 text-stone-600 text-lg leading-relaxed">
                <p>
                  I am a UI/UX designer with 5+ years of experience across web design, Shopify,
                  graphic design, and video editing. I started out in graphic design and worked my
                  way into full UX, building a process that goes all the way from research and user
                  flows through wireframing, prototyping, usability testing, and developer handoff.
                </p>
                <p>
                  I have worked closely with CEOs, developers, marketing teams, and sales teams
                  across a range of industries. For me, collaboration and communication are not just
                  nice to have -- they are how good work actually gets made.
                </p>
                <p>
                  I am also actively integrating AI into my workflow. From using AI tools for
                  design generation and research to picking up terminal-based tools and light
                  software development, I am always looking for ways to work smarter and deliver
                  more.
                </p>
                <p>
                  I do not compromise on quality. I go the extra mile because that is the standard
                  I hold myself to, not because someone asked me to.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-2xl border border-stone-100 p-8 space-y-6">
                <div>
                  <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Role</p>
                  <p className="font-semibold text-stone-900">UI/UX Designer</p>
                </div>
                <div>
                  <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">
                    Experience
                  </p>
                  <p className="font-semibold text-stone-900">5+ Years</p>
                </div>
                <div>
                  <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Location</p>
                  <p className="font-semibold text-stone-900">Remote / Bangkok</p>
                </div>
                <div>
                  <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Status</p>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-sm font-semibold px-3 py-1.5 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available for work
                  </span>
                </div>
                <div>
                  <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Email</p>
                  <a
                    href="mailto:keithpaul00@gmail.com"
                    className="text-violet-600 hover:text-violet-700 font-medium transition-colors"
                  >
                    keithpaul00@gmail.com
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-white py-20 border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-violet-600 font-semibold text-sm uppercase tracking-widest mb-2">
              Work history
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-12">Experience</h2>
          </AnimatedSection>

          <div className="space-y-8">
            {experience.map((job, i) => (
              <AnimatedSection key={`${job.company}-${i}`} delay={i * 0.1}>
                <div className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-violet-600 mt-1.5 shrink-0" />
                    {i < experience.length - 1 && (
                      <div className="w-px flex-1 bg-stone-200 mt-2" />
                    )}
                  </div>
                  <div className="pb-8 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-stone-900">{job.role}</h3>
                        <p className="text-violet-600 font-semibold">{job.company}</p>
                      </div>
                      <span className="text-sm text-stone-400 font-medium bg-stone-100 px-3 py-1 rounded-full">
                        {job.period}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-stone-600 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="bg-stone-50 py-20 border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-violet-600 font-semibold text-sm uppercase tracking-widest mb-2">
              Background
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-10">Education</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((e, i) => (
              <AnimatedSection key={e.institution} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-7 border border-stone-100">
                  <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">
                    {e.year}
                  </span>
                  <h3 className="font-bold text-stone-900 mt-3 mb-1">{e.degree}</h3>
                  <p className="text-stone-500 text-sm">{e.institution}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-white py-20 md:py-28 border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="text-violet-600 font-semibold text-sm uppercase tracking-widest mb-2">
                Kind words
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900">What people say</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.08}>
                <blockquote className="bg-stone-50 rounded-2xl p-8 border border-stone-100">
                  <p className="text-4xl text-violet-300 font-serif leading-none mb-4">&ldquo;</p>
                  <p className="text-stone-700 leading-relaxed mb-6">{t.quote}</p>
                  <footer className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900 text-sm">{t.name}</p>
                      <p className="text-stone-400 text-xs">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
