import type { PropsWithChildren } from 'react'

type ScreenContainerProps = PropsWithChildren<{ className?: string }>

export function ScreenContainer({ children, className }: ScreenContainerProps) {
  return (
    <main className="min-h-screen px-4 py-8 text-text">
      <div
        className={`mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-md flex-col justify-center ${
          className ?? ''
        }`}
      >
        {children}
      </div>
    </main>
  )
}
