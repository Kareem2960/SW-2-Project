import React from "react";
import { HiSparkles } from "react-icons/hi2";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="relative overflow-hidden bg-[#faf0e8] text-slate-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,109,88,0.12),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),transparent_70%)]" />
      <div className="absolute inset-x-0 top-28 mx-auto hidden h-px w-[92%] rounded-full bg-slate-300/30 md:block" />

      <div className="relative mx-auto max-w-7xl px-6 py-8 lg:py-12">
        <header className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-3xl bg-white/80 px-4 py-3 shadow-xl shadow-slate-900/5 backdrop-blur-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#ef6d4b] text-white shadow-sm shadow-[#ef6d4b]/30">
              <span className="font-bold uppercase tracking-[0.25em]">TF</span>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-900">
                TaskFlow
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              to="/login"
              className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-[#ef6d4b] px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-[#ef6d4b]/25 transition hover:bg-[#dc5b43]"
            >
              Start Free
            </Link>
          </div>
        </header>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="max-w-2xl">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-[#f7d6cc] bg-[#fff1eb] px-4 py-2 text-sm font-semibold text-[#b45309] shadow-sm shadow-[#fcd5c0]/70"
            >
              <HiSparkles className="h-5 w-5" />
              <span>Enterprise-Grade Project Management</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-8 text-5xl sm:text-6xl font-bold tracking-tight text-slate-950 leading-tight"
            >
              Ship faster.
              <span className="block text-[#ef6d4b]">Stay sane.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-base leading-8 text-slate-700"
            >
              The only project management system that doesn’t slow you down.
              Built for teams who actually ship.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
            >
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-full bg-[#ef6d4b] px-10 py-4 text-base font-semibold text-white shadow-xl shadow-[#ef6d4b]/25 transition hover:bg-[#dc5b43]"
              >
                Get Started Free
                <span className="ml-3 text-xl">→</span>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-10 py-4 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                View Demo
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 grid gap-4 sm:grid-cols-3"
            >
              <div className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-900/5 border border-slate-200">
                <p className="text-2xl font-bold text-[#ef6d4b]">50K+</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">
                  Active Users
                </p>
              </div>
              <div className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-900/5 border border-slate-200">
                <p className="text-2xl font-bold text-slate-950">99.9%</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">
                  Uptime
                </p>
              </div>
              <div className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-900/5 border border-slate-200">
                <p className="text-2xl font-bold text-[#0f172a]">24/7</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">
                  Support
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="relative mx-auto flex w-full max-w-[32rem] items-center justify-center"
          >
            <div className="absolute -right-10 top-10 h-24 w-24 rounded-full bg-[#ef6d4b]/20 blur-3xl" />
            <div className="absolute -left-10 bottom-4 h-28 w-28 rounded-full bg-[#f7d6cc]/70 blur-3xl" />
            <div className="relative w-full rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.25)]">
              <div className="flex items-center justify-between mb-6">
                <div className="h-3.5 w-20 rounded-full bg-slate-200" />
                <span className="rounded-full bg-[#ef6d4b] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-lg shadow-[#ef6d4b]/25">
                  NEW
                </span>
              </div>
              <div className="overflow-hidden rounded-[2rem] bg-[#1f2937] p-6 text-white shadow-inner shadow-slate-900/10">
                <div className="mb-6 flex items-center justify-between">
                  <div className="space-y-3">
                    <div className="h-3 w-24 rounded-full bg-slate-500/60" />
                    <div className="h-2.5 w-16 rounded-full bg-slate-500/50" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-12 rounded-full bg-[#ef6d4b]/80" />
                    <div className="h-3 w-12 rounded-full bg-slate-500/60" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-14 rounded-[1.5rem] bg-slate-600/80" />
                  <div className="h-14 rounded-[1.5rem] bg-slate-600/80" />
                  <div className="h-14 rounded-[1.5rem] bg-slate-600/80" />
                  <div className="h-14 rounded-[1.5rem] bg-slate-600/80" />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between gap-4 rounded-[1.5rem] bg-slate-100/90 p-4">
                <div>
                  <div className="h-3 w-28 rounded-full bg-slate-300" />
                  <div className="mt-2 h-3 w-16 rounded-full bg-slate-300" />
                </div>
                <div className="h-10 w-10 rounded-full bg-emerald-500 shadow-inner shadow-emerald-500/30" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Header;
