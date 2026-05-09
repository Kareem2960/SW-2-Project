import React from "react";
import { Users2 } from "lucide-react";
import { Link } from "react-router-dom";

const Accounts = () => {
  const accounts = [
    {
      role: "Administrator",
      description:
        "Manage users, approve project managers, and oversee the entire system.",
      iconBg: "bg-[#ef6d4b]",
      buttonLabel: "Try Administrator",
    },
    {
      role: "Project Manager",
      description:
        "Create projects, assign tasks, and monitor team performance instantly.",
      iconBg: "bg-[#f8b59d]",
      buttonLabel: "Try Project Manager",
    },
    {
      role: "Team Member",
      description:
        "Work on assigned tasks, update progress, and collaborate with your team.",
      iconBg: "bg-[#f3d0c2]",
      buttonLabel: "Try Team Member",
    },
  ];

  return (
    <section className="bg-[#fff7f2] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.35em] text-[#ef6d4b]">
            Role-based experience
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-slate-950">
            Explore the system from every perspective.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            Each role has a tailored workspace that makes teamwork faster and
            clearer.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {accounts.map((account, index) => (
            <div
              key={index}
              className="group rounded-[2rem] border border-white bg-white px-8 py-10 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.25)] transition hover:-translate-y-1 hover:border-[#ef6d4b]/20"
            >
              <div
                className={`${account.iconBg} mb-6 flex h-16 w-16 items-center justify-center rounded-3xl shadow-md shadow-[#ef6d4b]/10`}
              >
                <Users2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-950 mb-3">
                {account.role}
              </h3>
              <p className="text-slate-500 leading-relaxed mb-8 min-h-[72px]">
                {account.description}
              </p>
              <Link
                to="/login"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#ef6d4b] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ef6d4b]/20 transition hover:bg-[#dc5b43]"
              >
                {account.buttonLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accounts;
