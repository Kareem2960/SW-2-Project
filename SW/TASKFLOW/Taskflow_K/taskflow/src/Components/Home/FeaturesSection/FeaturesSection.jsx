import React from "react";
import { Layout, Users, BarChart3, ShieldCheck } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      label: "10x faster",
      title: "Kanban Excellence",
      description:
        "Drag-drop mastery with real-time sync across your entire team.",
      icon: <Layout className="w-5 h-5 text-white" />,
    },
    {
      label: "3 roles",
      title: "Team Synergy",
      description: "Role-based access control that actually makes sense.",
      icon: <Users className="w-5 h-5 text-white" />,
    },
    {
      label: "24/7 tracking",
      title: "Analytics Power",
      description: "Data-driven insights that move the needle.",
      icon: <BarChart3 className="w-5 h-5 text-white" />,
    },
    {
      label: "256-bit",
      title: "Enterprise Security",
      description: "Bank-level encryption for your mission-critical data.",
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#1e3550] py-24 px-6 text-white">
      <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#ef6d4b]/10 blur-3xl" />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-base uppercase tracking-[0.4em] text-[#f8c6b4] mb-3">
            Everything you need.
          </p>
          <h2 className="text-5xl font-semibold text-white leading-tight">
            Nothing you don&apos;t.
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Built for modern teams who value speed and clarity.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#ef6d4b] text-white shadow-[#ef6d4b]/30">
                {feature.icon}
              </div>
              <span className="text-sm uppercase tracking-[0.28em] text-[#f8c6b4]">
                {feature.label}
              </span>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
