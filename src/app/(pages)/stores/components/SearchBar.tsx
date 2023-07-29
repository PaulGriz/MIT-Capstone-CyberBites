"use client"

import { FaSearch } from "react-icons/fa"

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="relative mx-auto block text-[1.2rem] text-gray-400 focus-within:text-gray-700">
      <FaSearch
        size={17}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform"
      />

      <input
        type="text"
        placeholder={`Search`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className=" shadow-l block w-[20rem] appearance-none rounded bg-gray-200/50 px-4 py-3 pl-[2.4rem] text-gray-500 placeholder-gray-400 ring-1 ring-slate-300/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 md:w-[25rem]"
      />
    </div>
  )
}
