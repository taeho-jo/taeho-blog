import TimelineItem from './TimelineItem'
import { resumeData } from '@/data/resume'

export default function Timeline() {
  return (
    <div
      id="content"
      className="my-12 pl-[8.7rem] text-center">
      <ul className="timeline font-source-sans relative mx-auto border-l-4 border-foreground pb-[1px] pt-12 text-left text-base leading-relaxed text-foreground">
        {resumeData.map((event, idx) => (
          <TimelineItem
            key={idx}
            date={event.date}
            title={event.title}
            description={event.description}
          />
        ))}
      </ul>
    </div>
  )
}
