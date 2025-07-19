"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type TimelineContextValue = {
  activeStep?: number
}

const TimelineContext = React.createContext<TimelineContextValue>({})

const Timeline = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement> & { activeStep?: number }
>(({ className, activeStep, ...props }, ref) => (
  <TimelineContext.Provider value={{ activeStep }}>
    <ol
      ref={ref}
      className={cn("flex flex-col", className)}
      {...props}
    />
  </TimelineContext.Provider>
))
Timeline.displayName = "Timeline"

const TimelineItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement> & { step: number }
>(({ className, step, ...props }, ref) => {
  const { activeStep } = React.useContext(TimelineContext)
  const isCompleted = activeStep ? step < activeStep : false;
  const isActive = activeStep ? step === activeStep : false;

  return (
    <li
      ref={ref}
      data-completed={isCompleted}
      data-active={isActive}
      className={cn("group/timeline-item relative flex gap-6", className)}
      {...props}
    />
  )
})
TimelineItem.displayName = "TimelineItem"

const TimelineSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {isLast?: boolean}
>(({isLast, children, ...props}, ref) => (
  <div ref={ref} className="flex h-auto flex-col items-center" {...props}>
    {children}
    {!isLast && (
        <div className="h-full min-h-[4rem] w-0.5 bg-border transition-colors group-data-[completed=true]/timeline-item:bg-primary" />
    )}
  </div>
))
TimelineSeparator.displayName = "TimelineSeparator"

const TimelineIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-10 flex size-10 items-center justify-center rounded-full border-2 border-border bg-background transition-colors",
      "group-data-[active=true]/timeline-item:border-primary",
      "group-data-[completed=true]/timeline-item:border-primary group-data-[completed=true]/timeline-item:bg-primary group-data-[completed=true]/timeline-item:text-primary-foreground",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
TimelineIndicator.displayName = "TimelineIndicator"

const TimelineHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 pb-12 pt-1", className)} {...props} />
))
TimelineHeader.displayName = "TimelineHeader"

const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold text-white", className)}
    {...props}
  />
))
TimelineTitle.displayName = "TimelineTitle"

const TimelineContent = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-2 text-gray-400", className)}
    {...props}
  />
))
TimelineContent.displayName = "TimelineContent"

export {
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineSeparator,
  TimelineIndicator,
  TimelineTitle,
  TimelineContent,
}
