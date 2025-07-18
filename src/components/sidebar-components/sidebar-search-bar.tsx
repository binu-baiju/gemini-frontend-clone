import { Input } from "@/components/ui/input";
import React from "react";

type SidebarSearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
  className?: string;
};

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

const SidebarSearchBar: React.FC<SidebarSearchBarProps> = ({
  search,
  setSearch,
  className,
}) => {
  return (
    <div
      className={`flex items-center w-full space-x-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3.5 py-2 ${
        className || ""
      }`}
    >
      <SearchIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search chats..."
        className="w-full border-0 h-6 font-semibold bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default SidebarSearchBar;
