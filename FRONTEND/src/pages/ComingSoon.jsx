import React from "react";
import { motion } from "motion/react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-800 to-black text-white p-6 relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-[-10rem] left-[-10rem]"></div>
      <div className="absolute w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse bottom-[-10rem] right-[-10rem]"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-2xl z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6">
          Algonix is Launching Soon
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 mb-8">
          Empowering developers with powerful collaboration tools, Real problem
          solving and preparing for the future. Be the first to experience the
          future of coding.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 w-full sm:w-auto rounded-lg text-white focus:outline-none"
          />
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md cursor-pointer">
            Notify Me
          </button>
        </form>

      </motion.div>
    </div>
  );
};

export default ComingSoon;
