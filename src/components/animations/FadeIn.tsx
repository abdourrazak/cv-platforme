"use client"

import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

interface FadeInProps extends HTMLMotionProps<"div"> {
    delay?: number
    duration?: number
    children: React.ReactNode
}

export function FadeIn({
    children,
    delay = 0,
    duration = 0.5,
    className,
    ...props
}: FadeInProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}
