'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun, Laptop, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (mode: string) => {
    setTheme(mode)
  }

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleThemeChange('light')}
        className={
          theme === 'light'
            ? 'bg-gray-700 text-highlight hover:text-highlight'
            : 'transition-colors duration-200 hover:text-highlight'
        }>
        <Sun className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleThemeChange('dark')}
        className={
          theme === 'dark'
            ? 'bg-gray-700 text-highlight hover:text-highlight'
            : 'transition-colors duration-200 hover:text-highlight'
        }>
        <Moon className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleThemeChange('system')}
        className={
          theme === 'system'
            ? 'bg-gray-700 text-highlight hover:text-highlight'
            : 'transition-colors duration-200 hover:text-highlight'
        }>
        <Laptop className="h-5 w-5" />
      </Button>
    </div>
  )
}
