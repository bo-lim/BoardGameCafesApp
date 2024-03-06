"use client";

// Footer.tsx

import React from "react";
import { Tooltip } from "@radix-ui/react-tooltip";
import { Flex } from "@radix-ui/themes";

const Footer: React.FC = () => {
  return (
    <footer className="p-4">
      <div className="flex items-center justify-between sx:flex-col md:flex-row mx-auto">
        <p>© 2024 다있으 DICE . All rights reserved.</p>
        <Tooltip>
          <a href="#" className="text-blue-300 hover:text-blue-400">
            AWS Cloud School 3조 이보림, 최재원, 오현택, 박재연
          </a>
        </Tooltip>
      </div>
    </footer>
  );
};

export default Footer;
