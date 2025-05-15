import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 w-dvw h-dvh flex bg-primary justify-center items-end px-20 pb-14 xl:pb-28 z-50"
          exit={{ y: -window.innerHeight }}
          transition={{ duration: 1.5, ease: [0.9, 0, 0.1, 1] }}
        >
          <div className="flex flex-col xl:flex-row gap-3 xl:items-end">
            <div className="font-extrabold text-5xl xl:text-9xl leading-14 xl:leading-28">
              We're GrowthOps
            </div>
            <div className="flex items-center rounded-full w-fit h-22 xl:h-40 bg-foreground px-10 xl:px-16 py-5 text-primary font-extrabold xl:text-8xl text-4xl leading-[100%] xl:leading-28 rotate-[-9.47deg]">
              Asia
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
