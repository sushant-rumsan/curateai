"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Compass, Bookmark, Bell, BarChart2, Users } from "lucide-react";

export function LeftAside() {
  const [activeNav, setActiveNav] = useState("home");

  const navItems = [
    { id: "home", icon: <Home className="w-5 h-5" />, label: "Home" },
    { id: "explore", icon: <Compass className="w-5 h-5" />, label: "Explore" },
    {
      id: "notifications",
      icon: <Bell className="w-5 h-5" />,
      label: "Notifications",
    },
    { id: "bookmarks", icon: <Bookmark className="w-5 h-5" />, label: "Saved" },
    {
      id: "analytics",
      icon: <BarChart2 className="w-5 h-5" />,
      label: "Analytics",
    },
    {
      id: "communities",
      icon: <Users className="w-5 h-5" />,
      label: "Communities",
    },
  ];

  return (
    <aside className="hidden md:block w-16 lg:w-56 border-r border-gray-100 h-screen sticky top-0 pt-[72px]">
      <nav className="px-2 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={`/${item.id === "home" ? "" : item.id}`}
                className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all ${
                  activeNav === item.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActiveNav(item.id)}
              >
                {item.icon}
                <span className={`font-medium hidden lg:block`}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
