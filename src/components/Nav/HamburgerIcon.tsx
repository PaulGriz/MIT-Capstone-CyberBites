interface HamburgerIconProps {
  isMenuOpen: boolean
  toggleMenu: () => void
}

export default function HamburgerIcon({ isMenuOpen, toggleMenu }: HamburgerIconProps) {
  return (
    <button
      data-collapse-toggle="navbar-cta"
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      aria-controls="navbar-cta"
      aria-expanded={isMenuOpen}
      onClick={toggleMenu}
    >
      <svg
        className="h-5 w-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
  )
}
