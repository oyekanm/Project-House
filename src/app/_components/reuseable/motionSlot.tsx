"use client"

import React from 'react'
import { motion } from "framer-motion";

type Props = {
    className: string,
    initial: any,
    animate: any,
    children: React.ReactNode;
}

export default function MotionSlot({ animate, children, className, initial }: Props) {
    return (
        <div>
            <motion.div
                className={className}
                initial={initial}
                animate={animate}
                transition={{ duration: 2 ,delay:1}}
            >
                {children}
            </motion.div>
        </div>
    )
}
