type TimelineItemProps = {
  date: string
  title: string
  description: string[]
}

export default function TimelineItem({
  date,
  title,
  description
}: TimelineItemProps) {
  return (
    <li className="border-line relative mb-12 ml-6 border-b border-dashed pb-6">
      {/* 날짜 */}
      <div className="absolute -left-[164px] top-[4px] text-right text-sm font-light text-foreground opacity-65">
        {date}
      </div>

      {/* 타임라인 원형 점 */}
      <div
        className="absolute -left-[30px] top-[10px] h-[8px] w-[8px] rounded-full bg-highlight"
        style={{ boxShadow: '0 0 0 3px var(--foreground)' }}
      />

      <h3 className="font-oswald text-lg font-light tracking-wide text-foreground">
        {title}
      </h3>
      {description.map((line, i) => (
        <p
          className={`${i === 0 ? 'text-[14px]' : 'text-xs opacity-55'} `}
          key={i}>
          {line}
        </p>
      ))}
    </li>
  )
}
