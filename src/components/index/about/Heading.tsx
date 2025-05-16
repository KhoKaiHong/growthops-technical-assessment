import { motion } from 'motion/react'

export function Heading() {
  const colorVariants = {
    background: [
      'linear-gradient(135deg, rgba(51, 255, 243, 1), rgba(152, 224, 255, 1))',
      'linear-gradient(135deg, rgba(51, 255, 243, 1), rgba(152, 224, 255, 1)',
      'linear-gradient(135deg, rgba(252, 171, 63, 1), rgba(94, 201, 193, 1)',
      'linear-gradient(135deg, rgba(94, 201, 193, 1), rgba(0, 76, 186, 1))',
      'linear-gradient(135deg, rgba(0, 50, 146, 1), rgba(210, 28, 85, 1))',
      'linear-gradient(135deg, rgba(51, 255, 243, 1), rgba(152, 224, 255, 1))',
    ],
    backgroundClip: 'text',
    color: 'transparent',
  }

  return (
    <motion.h1
      className="font-extrabold text-4xl sm:text-8xl leading-[100%] tracking-[-1%] text-center"
      animate={colorVariants}
      transition={{
        duration: 6,
        ease: 'easeOut',
        repeat: Infinity,
      }}
    >
      GrowthOps Asia
    </motion.h1>
  )
}
