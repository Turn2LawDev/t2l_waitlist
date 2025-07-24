"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Briefcase, School2, X } from "lucide-react";

export default function LegalProfessionalsCards() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 h-full w-full z-50"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-4 right-4 lg:top-6 lg:right-6 items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-full h-8 w-8 z-10 transition-colors"
              onClick={() => setActive(null)}
            >
              <X className="h-4 w-4 text-white" />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-[#131317] border border-gray-800 sm:rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 overflow-y-auto max-h-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    layoutId={`icon-${active.title}-${id}`}
                    className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl flex-shrink-0"
                  >
                    {active.icon}
                  </motion.div>
                  <div className="min-w-0 flex-1">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-2xl font-bold text-white"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-gray-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                </div>

                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-6"
                >
                  <div className="text-gray-300 leading-relaxed">
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </div>
                  
                  {active.features && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Key Features:</h4>
                      <ul className="space-y-3">
                        {active.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="bg-[#131317] p-6 rounded-xl text-center border border-gray-800 hover:border-primary/30 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
          >
            <motion.div
              layoutId={`icon-${card.title}-${id}`}
              className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
            >
              {React.cloneElement(card.icon, { className: "w-6 h-6 text-primary" })}
            </motion.div>
            <motion.h4
              layoutId={`title-${card.title}-${id}`}
              className="font-bold text-white text-lg mb-2"
            >
              {card.title}
            </motion.h4>
            <motion.p
              layoutId={`description-${card.description}-${id}`}
              className="text-sm text-gray-400 mb-4"
            >
              {card.description}
            </motion.p>
            <motion.button
              layoutId={`cta-${card.title}-${id}`}
              className="text-primary text-sm font-medium hover:text-primary/80 transition-colors"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </>
  );
}

const cards = [
  {
    title: "Practice Growth",
    description: "Connect with new clients and manage your practice efficiently.",
    icon: <Briefcase className="w-6 h-6 text-primary" />,
    ctaText: "Learn More →",
    ctaLink: "#waitlist-form",
    content: () => (
      <div>
        <p className="mb-4">
          Our Practice Growth suite is designed to help legal professionals expand their client base 
          and streamline their practice management. Whether you're a solo practitioner or part of a 
          larger firm, our tools provide the foundation for sustainable growth.
        </p>
        <p>
          Connect with clients who need your specific expertise through our intelligent matching system. 
          Our platform ensures that you're paired with clients whose legal needs align perfectly with 
          your practice areas and experience level.
        </p>
      </div>
    ),
    features: [
      "Intelligent client-lawyer matching based on expertise and case type",
      "Automated practice management tools for scheduling and case tracking",
      "Client relationship management (CRM) system",
      "Performance analytics and growth insights",
      "Secure communication channels with built-in confidentiality protection",
      "Billing and payment processing integration"
    ]
  },
  {
    title: "Career Tools",
    description: "Access resources and internship opportunities for law students.",
    icon: <School2 className="w-6 h-6 text-primary" />,
    ctaText: "Learn More →",
    ctaLink: "#waitlist-form",
    content: () => (
      <div>
        <p className="mb-4">
          Our Career Tools platform is specifically designed for law students and early-career legal 
          professionals. We provide comprehensive resources to help you navigate your legal career 
          journey from student to successful practitioner.
        </p>
        <p>
          Access exclusive internship opportunities, mentorship programs, and career development 
          resources that will set you apart in the competitive legal field. Our network includes 
          leading law firms, corporate legal departments, and public interest organizations.
        </p>
      </div>
    ),
    features: [
      "Exclusive internship and clerkship opportunities",
      "Mentorship programs with experienced legal professionals",
      "Career guidance and interview preparation resources",
      "Legal writing and research skill development tools",
      "Networking events and professional development workshops",
      "Job placement assistance and career coaching"
    ]
  }
];
