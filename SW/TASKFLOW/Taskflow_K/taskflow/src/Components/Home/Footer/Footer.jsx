import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#101828] py-10 px-6 text-slate-300">
        <div className="max-w-6xl mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#ef6d4b] text-white font-bold shadow-lg shadow-[#ef6d4b]/20">
              TF
            </div>
            <div>
              <p className="text-xl font-semibold text-white">TaskFlow</p>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                Crafted for builders, by builders.
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 TaskFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
