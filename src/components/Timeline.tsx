'use client'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'

export default function Timeline({ items }: { items: TimelineItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="relative mx-auto flex max-w-[640px] flex-col items-center">
      {/* 수직 라인 */}
      <div className="absolute left-6 top-0 z-0 h-full w-[4px] bg-[--highlight]" />

      {items.map((item, index) => (
        <div
          key={item.year}
          className="relative mb-20 flex w-full items-start gap-4">
          {/* 원형 포인트 */}
          <div className="relative z-10 mt-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-[--highlight] bg-background">
            <div className="absolute h-full w-full rounded-full bg-background" />
          </div>

          {/* 텍스트 콘텐츠 */}
          <div className="z-10">
            <p className="text-sm text-muted-foreground">{item.year}</p>
            <p className="text-base font-semibold text-foreground">
              {item.title}
            </p>

            {/* 다이얼로그 트리거 */}
            {item.description && (
              <Dialog
                open={openIndex === index}
                onOpenChange={open => setOpenIndex(open ? index : null)}>
                <DialogTrigger asChild>
                  <button className="mt-1 text-sm text-[--highlight] underline underline-offset-4">
                    자세히 보기
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-md bg-background text-foreground sm:max-w-lg">
                  <p className="whitespace-pre-wrap text-sm">
                    {item.description}
                  </p>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

type TimelineItem = {
  year: string
  title: string
  description?: string
}
