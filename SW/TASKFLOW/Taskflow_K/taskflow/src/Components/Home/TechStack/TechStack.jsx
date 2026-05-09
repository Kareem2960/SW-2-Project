import React from "react";
import { CheckCircle2 } from "lucide-react";

const TechStack = () => {
  const technologies = [
    "Task Management",
    "Real-Time Updates",
    "Team Collaboration",
    "Project Tracking",
    "Workflow Automation",
    "Notifications",
    "File Sharing",
  ];

  return (
    <section className="bg-[#fef8f4] py-20 px-6">
      <div className="max-w-6xl mx-auto rounded-[2.5rem] bg-white px-8 py-14 shadow-[0_40px_100px_-40px_rgba(15,23,42,0.2)]">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-[#ef6d4b]">
            Built for teams who move fast
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-slate-950">
            A modern toolkit for every workflow.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            Everything your team needs to stay aligned, transparent, and
            productive.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-[#fffcfb] px-5 py-4 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ef6d4b] text-white shadow-[#ef6d4b]/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-slate-800">{tech}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
