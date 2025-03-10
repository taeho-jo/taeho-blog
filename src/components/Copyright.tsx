'use client'

import Link from 'next/link'

interface CopyrightProps {
  name: string
  from?: number
  href?: string // 이름 클릭 시 이동할 링크
}

const Copyright = ({ name, from, href = '/' }: CopyrightProps) => {
  const currentYear = new Date().getFullYear()

  const yearDisplay =
    from && from < currentYear ? `${from}–${currentYear}` : currentYear

  return (
    <p className="text-sm text-muted-foreground">
      © {yearDisplay}{' '}
      <Link
        href={href}
        className="text-foreground underline underline-offset-4">
        {name}
      </Link>
    </p>
  )
}

export default Copyright
