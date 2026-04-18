"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  if (!theme) {
    // Render a placeholder during SSR/hydration to avoid mismatch
    return (
      <div className="flex p-2.5 rounded-full">
        <Moon className="h-5 w-5" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex p-2.5 rounded-full text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}