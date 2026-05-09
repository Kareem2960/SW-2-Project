import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="bg-[#ef6d4b] py-24 px-6 text-white">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] bg-[#ef6d4b] px-8 py-16 shadow-2xl shadow-[#ef6d4b]/30">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/15 to-transparent" />
        <div className="relative text-center">
          <h2 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            Ready to ship
            <span className="block text-white/90 italic">better products?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/85 sm:text-lg">
            Join thousands of teams already using TaskFlow to build better,
            faster.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-base font-semibold text-[#1f2937] shadow-lg shadow-slate-900/20 transition hover:bg-slate-100"
            >
              Start Free Trial
              <span className="ml-3">→</span>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-10 py-4 text-base font-semibold text-white transition hover:bg-white/20"
            >
              View Demo Accounts
            </Link>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 text-sm text-white/80 sm:flex-row">
            {[
              "No credit card required",
              "14-day free trial",
              "Cancel anytime",
            ].map((item, index) => (
              <div key={index} className="inline-flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-white" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
