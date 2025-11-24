"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import LogoutButton from "../components/logout";
import LogoImage from "@/app/icon.png";
import Image from "next/image";


const navigation = [
  { name: "Dashboard", icon: HomeIcon, current: true },
  { name: "Team", icon: UsersIcon, current: false },
  { name: "Projects", icon: FolderIcon, current: false },
  { name: "Calendar", icon: CalendarDaysIcon, current: false },
  { name: "Documents", icon: DocumentTextIcon, current: false },
  { name: "Reports", icon: ChartPieIcon, current: false },
];

const teams = [
  { id: 1, name: "Heroicons", initial: "H" },
  { id: 2, name: "Tailwind Labs", initial: "T" },
  { id: 3, name: "Workcation", initial: "W" },
];

function classNames(...classes: Array<string | boolean | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  // Close profile dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        {/* MOBILE SIDEBAR + OVERLAY */}
        <div className="md:hidden">
          {/* Overlay */}
          <div
            className={classNames(
              "fixed inset-0 z-40 bg-black/60 transition-opacity",
              sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar panel */}
          <aside
            className={classNames(
              "fixed inset-y-0 left-0 z-50 flex w-72 max-w-full flex-col border-r border-slate-800 bg-[#0D1526] px-6 pb-6 pt-5",
              "transform transition-transform duration-200 ease-in-out",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  className="h-10 w-10"
                  src={LogoImage}
                  alt="DBIZ Employee management system logo"
                />
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-md p-1 text-slate-400 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  className={classNames(
                    item.current
                      ? "bg-slate-800 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white",
                    "group flex w-full items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-white"
                        : "text-slate-400 group-hover:text-white",
                      "h-5 w-5"
                    )}
                  />
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Your teams
              </h3>
              <div className="mt-2 space-y-1">
                {teams.map((team) => (
                  <button
                    key={team.id}
                    className="flex w-full items-center gap-x-3 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-700 text-xs font-semibold text-white">
                      {team.initial}
                    </span>
                    {team.name}
                  </button>
                ))}
              </div>
            </div>

            <button className="mt-8 flex items-center gap-x-3 px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white">
              <Cog6ToothIcon className="h-5 w-5" />
              Settings
            </button>
          </aside>
        </div>

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden w-72 flex-col border-r border-slate-800 bg-[#0D1526] px-6 py-6 md:flex">
          <div className="mb-10 flex items-center">
            <Image
              className="h-10 w-10"
              src={LogoImage}
              alt="DBIZ Employee management system logo"
            />
          </div>

          <nav className="flex-1 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                className={classNames(
                  item.current
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white",
                  "group flex w-full items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium"
                )}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-white"
                      : "text-slate-400 group-hover:text-white",
                    "h-5 w-5"
                  )}
                />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="mt-10 hidden">
            <h3 className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Your teams
            </h3>
            <div className="mt-2 space-y-1">
              {teams.map((team) => (
                <button
                  key={team.id}
                  className="flex w-full items-center gap-x-3 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-700 text-xs font-semibold text-white">
                    {team.initial}
                  </span>
                  {team.name}
                </button>
              ))}
            </div>
          </div>

          <button className="mt-auto flex items-center gap-x-3 px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white">
            <Cog6ToothIcon className="h-5 w-5" />
            Settings
          </button>
        </aside>

        {/* MAIN COLUMN */}
        <div className="flex min-h-screen flex-1 flex-col">
          {/* HEADER */}
          <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-[#0D1526] px-4 md:px-6">
            {/* Left: hamburger + search */}
            <div className="flex flex-1 items-center gap-3">
              <button
                className="inline-flex items-center rounded-md p-2 text-slate-300 hover:bg-slate-800 hover:text-white md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>

              <div className="relative w-full max-w-lg">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="m19 19-4-4m1-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full rounded-md border border-slate-700 bg-slate-900/70 py-2 pl-11 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Right: bell + profile */}
            <div className="ml-4 flex items-center gap-4">
              <button className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white">
                <BellIcon className="h-5 w-5" />
              </button>

              {/* Profile dropdown */}
              <div
                ref={profileRef}
                className="relative flex items-center gap-2"
              >
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full focus:outline-none"
                >
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&w=80&h=80&q=80"
                    alt="Tom Cook"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="hidden text-sm font-medium md:inline">
                    Tom Cook
                  </span>
                  <svg
                    className="hidden h-4 w-4 text-slate-400 md:block"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6 8l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                <div
                  className={classNames(
                    "absolute right-0 top-10 w-40 rounded-md bg-slate-900/95 py-1 text-sm shadow-lg ring-1 ring-black/5 transition transform origin-top-right",
                    profileOpen
                      ? "scale-100 opacity-100"
                      : "pointer-events-none scale-95 opacity-0"
                  )}
                >
                  <button
                    className="block w-full px-4 py-2 text-left text-slate-100 hover:bg-slate-800"
                    onClick={() => setProfileOpen(false)}
                  >
                    Your profile
                  </button>
                  <div
                    className="block w-full px-4 py-2 text-left text-slate-100 hover:bg-slate-800"
                    onClick={() => {
                      setProfileOpen(false);
                    }}
                  >
                    <LogoutButton />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* MAIN CONTENT */}
          <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
