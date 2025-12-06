"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import ParticleBackground from "./ParticleBackground";

const roles = ["Full-Stack Developer", "AI/ML Enthusiast", "UI/UX Designer"];

// Enhanced Typewriter Component
const Typewriter = ({ roles }) => {
  const [currentRole, setCurrentRole] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(role.substring(0, text.length - 1));
      }, 40); // Slightly faster deletion
    } else {
      timeout = setTimeout(() => {
        setText(role.substring(0, text.length + 1));
      }, 80); // Slightly faster typing
    }

    if (!isDeleting && text === role) {
      timeout = setTimeout(() => setIsDeleting(true), 1800); // Shorter pause
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentRole, roles]);

  return (
    <span className="text-cyan-400 font-medium">
      {text}
      {/* Blinking cursor */}
      <motion.span
        className="inline-block w-0.5 h-6 sm:h-7 bg-cyan-400 ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-white px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Particle Background */}
      <div className="absolute inset-0 -z-10">
        <ParticleBackground />
      </div>

      {/* Main Content Area */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-16 max-w-6xl w-full z-10">
        {/* Profile Image with Tilt */}
        <Tilt
          tiltMaxAngleX={10} // Reduced angle for subtlety
          tiltMaxAngleY={10}
          perspective={1000}
          scale={1.03} // Slightly reduced scale
          transitionSpeed={2000}
          gyroscope={true}
          className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 flex-shrink-0"
        >
          <motion.div
            className="w-full h-full rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-xl shadow-cyan-500/20 relative group"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="/karthik.jpeg"
              alt="Karthik"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Subtle overlay effect on hover */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </motion.div>
        </Tilt>

        {/* Hero Text Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg">
          {/* Main Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Karthik
            </span>
          </motion.h1>

          {/* Typewriter Role Display */}
          <motion.div
            className="h-10 mb-8 text-xl sm:text-2xl lg:text-3xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Typewriter roles={roles} />
          </motion.div>

          {/* CTA Button - Resume */}
          <motion.a
            href="https://drive.google.com/file/d/1Gl3WejCjHFUpVQaJE1_tMv2_LisglXeM/view?usp=sharing"
            className="relative inline-flex items-center justify-center px-7 py-3 rounded-lg font-semibold text-white bg-transparent border-2 border-cyan-400 overflow-hidden group transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background fill effect */}
            <span className="absolute inset-0 bg-cyan-400/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-0"></span>
            {/* Text */}
            <span className="relative z-10">View My Resume</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
