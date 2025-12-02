"use client"

import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

interface SlideInProps extends HTMLMotionProps<"div"> {
    direction?: "left" | "right" | "up" | "down"
    delay?: number
    duration?: number
    children: React.ReactNode
}

export function SlideIn({
    children,
    direction = "up",
    delay = 0,
    duration = 0.5,
    className,
    ...props
}: SlideInProps) {
    const directions = {
        left: { x: -50, y: 0 },
        right: { x: 50, y: 0 },
        up: { x: 0, y: 50 },
        down: { x: 0, y: -50 },
    }

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...directions[direction]
            }}
            animate={{
                opacity: 1,
                x: 0,
                y: 0
            }}
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
