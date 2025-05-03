'use client'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./ThemeProvider"
import { Sun, Moon, TreePine, Waves } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      name: "Light",
      id: "light",
      icon: Sun,
    },
    {
      name: "Dark",
      id: "dark",
      icon: Moon,
    },
    {
      name: "Summer",
      id: "summer",
      icon: Sun,
    },
    {
      name: "Ocean",
      id: "ocean",
      icon: Waves,
    },
    {
      name: "Forest",
      id: "forest",
      icon: TreePine,
    },
  ] as const;

  const currentTheme = themes.find(t => t.id === theme) || themes[0];
  const ThemeIcon = currentTheme.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
          <ThemeIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              theme === t.id && "bg-accent"
            )}
          >
            <t.icon className="h-4 w-4" />
            <span>{t.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
