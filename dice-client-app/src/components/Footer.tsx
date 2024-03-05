"use client";

// Footer.tsx

import React from "react";
import { Tooltip } from "@radix-ui/react-tooltip";

const Footer: React.FC = () => {
  return (
    <footer className="bg-customBlue text-white p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <p>© 2024 Your Website. All rights reserved.</p>
          <Tooltip>
            <a href="#" className="text-blue-300 hover:text-blue-400">
              AWS Cloud School
            </a>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
