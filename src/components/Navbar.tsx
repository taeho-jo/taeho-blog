// src/components/Navbar.tsx
import DarkModeToggle from '@/components/DarkModeToggle'
import CONSTANTS from '@/constants'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b p-4">
      <h1 className="text-lg font-bold">My Website: {CONSTANTS.NAME}</h1>
      <DarkModeToggle />
    </nav>
  )
}
