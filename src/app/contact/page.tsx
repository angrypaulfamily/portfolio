"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Clock } from "lucide-react";
import LinkedInIcon from "@/components/LinkedInIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import LineIcon from "@/components/LineIcon";

export default function ContactPage() {
  return (
    <section className="min-h-[100svh] bg-[#0a0a0a] flex flex-col justify-center py-20 overflow-hidden relative">
      {/* Ghost text bg */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="text-[25vw] font-black uppercase leading-none whitespace-nowrap"
          style={{ color: "rgba(255, 255, 255, 0.04)" }}
        >
          TALK
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#caff00] text-xs font-bold uppercase tracking-[0.2em] mb-6"
            >
              Contact
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[15vw] md:text-[9vw] font-black uppercase leading-none tracking-[-0.04em] mb-6"
            >
              <span className="text-white">Let&apos;s</span>
              <br />
              <span style={{ WebkitTextStroke: "2px #caff00", color: "#0a0a0a", paintOrder: "stroke fill" }}>Talk.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[#555] text-lg max-w-md mb-10"
            >
              Whether you have a project in mind or just want to connect, I would love to hear from
              you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a
                href="mailto:keithpaul00@gmail.com"
                className="inline-flex items-center gap-3 bg-[#caff00] text-[#0a0a0a] font-black px-7 py-4 rounded-full uppercase tracking-wide text-sm hover:bg-white transition-colors"
              >
                keithpaul00@gmail.com
                <ArrowUpRight size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/keith-paul-1450241a3/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-[#2a2a2a] text-white font-bold px-7 py-4 rounded-full uppercase tracking-wide text-sm hover:border-[#caff00] hover:text-[#caff00] transition-colors"
              >
                <LinkedInIcon size={16} />
                LinkedIn
              </a>
              <a
                href="https://wa.me/919002202845?text=Hi%20Keith%2C%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-[#2a2a2a] text-white font-bold px-7 py-4 rounded-full uppercase tracking-wide text-sm hover:border-[#caff00] hover:text-[#caff00] transition-colors"
              >
                <WhatsAppIcon size={16} />
                WhatsApp
              </a>
              <a
                href="https://line.me/ti/p/PXr2kz5-El"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-[#2a2a2a] text-white font-bold px-7 py-4 rounded-full uppercase tracking-wide text-sm hover:border-[#caff00] hover:text-[#caff00] transition-colors"
              >
                <LineIcon size={16} />
                Line
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 border-t border-[#1a1a1a] pt-10"
            >
              <div className="flex items-center gap-3 text-[#555] text-sm">
                <span className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0">
                  <MapPin size={13} className="text-[#caff00]" />
                </span>
                Remote / Bangkok
              </div>
              <div className="flex items-center gap-3 text-[#555] text-sm">
                <span className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0">
                  <Clock size={13} className="text-[#caff00]" />
                </span>
                Full-time, contract, freelance
              </div>
            </motion.div>
          </div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[#1e1e1e]" style={{ aspectRatio: "3/4" }}>
              <Image
                src="/images/avatar.jpg"
                alt="Keith"
                fill
                className="object-cover"
                sizes="50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-[#0a0a0a]/80 backdrop-blur-sm rounded-2xl p-5 border border-[#1e1e1e]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#caff00] blink" />
                    <span className="text-[#caff00] text-xs font-bold uppercase tracking-widest">Available for work</span>
                  </div>
                  <p className="text-[#555] text-xs">Typically responds within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
