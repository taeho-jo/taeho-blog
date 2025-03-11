'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-4 rounded-xl border bg-background p-6">
      <h2 className="text-2xl font-bold">{count}</h2>
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => setCount(count - 1)}>
          -
        </Button>
        <Button onClick={() => setCount(count + 1)}>+</Button>
      </div>
    </div>
  )
}

export default Counter
