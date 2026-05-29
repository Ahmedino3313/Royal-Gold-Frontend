import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { GiCakeSlice } from 'react-icons/gi'
import baker from '../assets/baker1.jpeg'

function Hero() {
    const stats = [
        { target: 800, suffix: '+', label: 'Happy Customers' },
        { target: 500, suffix: '+', label: 'Cake Designs' },
        { target: 100, suffix: '%', label: 'Fresh Daily' },
        { target: 3,   suffix: '+', label: 'Years Experience' },
        { target: 5,   suffix: '★', label: 'Star Rated', },
    ]

    const [counts, setCounts] = useState(stats.map(() => 0))
    const hasAnimated = useRef(false)

    useEffect(() => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        stats.forEach((stat, i) => {
            let start = 0
            const duration = 2000
            const stepTime = 30
            const steps = duration / stepTime
            const increment = stat.target / steps

            const timer = setInterval(() => {
            start += increment
            if (start >= stat.target) {
                start = stat.target
                clearInterval(timer)
            }
            setCounts(prev => {
                const updated = [...prev]
                updated[i] = Math.round(start)
                return updated
            })
            }, stepTime)
        })
    }, [])

    return (
        <section style={{
            minHeight: '100vh',
            backgroundColor: '#fdfaf4',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: '50px',
        }}>

            {/* Background gold circle blur */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.12, scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                    position: 'absolute',
                    top: '-100px',
                    right: '-100px',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    backgroundColor: '#d4a017',
                    filter: 'blur(80px)',
                    zIndex: 0,
                }}
            />

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '4rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '3rem',
                width: '100%',
                position: 'relative',
                zIndex: 1,
                flexWrap: 'wrap',
            }}>

                {/* Left Text Content */}
                <div style={{ flex: 1, minWidth: '280px', maxWidth: '550px' }}>

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            backgroundColor: 'rgba(212,160,23,0.12)',
                            border: '1px solid rgba(212,160,23,0.3)',
                            borderRadius: '100px',
                            padding: '0.4rem 1rem',
                            marginBottom: '1.5rem',
                        }}
                    >
                        <GiCakeSlice style={{ color: '#d4a017', fontSize: '0.9rem' }} />

                            <span style={{
                                color: '#d4a017',
                                fontSize: '0.8rem',
                                fontFamily: 'Lato, sans-serif',
                                fontWeight: '700',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                }}
                            >
                                Premium Bakes & Cuisine
                            </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: '800',
                            color: '#1c0f00',
                            lineHeight: '1.15',
                            marginBottom: '1.2rem',
                        }}
                    >
                        Baked With Love,{' '}
                        <span style={{
                            color: '#d4a017',
                            position: 'relative',
                            display: 'inline-block',
                            }}
                        >
                            Crafted
                            {/* Underline decoration */}
                            <motion.svg
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: 0.9 }}
                                viewBox="0 0 200 12"
                                style={{
                                    position: 'absolute',
                                    bottom: '-6px',
                                    left: 0,
                                    width: '100%',
                                    height: '10px',
                                }}
                            >
                                <motion.path
                                    d="M 0 8 Q 100 0 200 8"
                                    stroke="#d4a017"
                                    strokeWidth="2.5"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.9 }}
                                />
                            </motion.svg>
                        </span>{' '}
                            For Royalty
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        style={{
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '1.05rem',
                            color: '#4a2e00',
                            lineHeight: '1.7',
                            marginBottom: '2rem',
                            maxWidth: '440px',
                        }}
                    >
                        Every slice tells a story of taste, luxury, and celebration.
                        Discover sweetness crafted to perfection at Royal Gold.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.65 }}
                        style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
                    >
                        <Link
                            to="/shop"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backgroundColor: '#d4a017',
                                color: '#1c0f00',
                                padding: '0.85rem 1.8rem',
                                borderRadius: '100px',
                                textDecoration: 'none',
                                fontFamily: 'Lato, sans-serif',
                                fontWeight: '700',
                                fontSize: '0.95rem',
                                letterSpacing: '0.05em',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 20px rgba(212,160,23,0.35)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#b8860b'
                                e.currentTarget.style.transform = 'translateY(-2px)'
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 160, 23, 0.45)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = '#d4a017'
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(212, 160, 23, 0.35)'
                            }}
                        >
                            Order Now <HiArrowRight />
                        </Link>

                        <Link
                            to="/shop"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backgroundColor: 'transparent',
                                color: '#1c0f00',
                                padding: '0.85rem 1.8rem',
                                borderRadius: '100px',
                                textDecoration: 'none',
                                fontFamily: 'Lato, sans-serif',
                                fontWeight: '700',
                                fontSize: '0.95rem',
                                letterSpacing: '0.05em',
                                border: '2px solid #1c0f00',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#1c0f00'
                                e.currentTarget.style.color = '#fff8e7'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = 'transparent'
                                e.currentTarget.style.color = '#1c0f00'
                            }}
                        >
                            View Menu
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                        style={{
                            display: 'flex',
                            gap: '1.5rem',
                            marginTop: '3rem',
                            flexWrap: 'wrap',
                        }}
                    >
                        {stats.map((stat, i) => (
                            <div key={stat.label} style={{
                                    backgroundColor: 'rgba(212,160,23,0.06)',
                                    border: '1px solid rgba(212,160,23,0.15)',
                                    borderRadius: '12px',
                                    padding: '0.8rem 1.2rem',
                                    minWidth: '90px',
                                }}
                            >
                                <p style={{
                                    fontFamily: 'Playfair Display, serif',
                                    fontSize: '1.8rem',
                                    fontWeight: '800',
                                    color: '#d4a017',
                                    margin: 0,
                                    lineHeight: 1,
                                }}>
                                    {counts[i]}{stat.suffix}
                                </p>
                                
                                <p style={{
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '0.75rem',
                                    color: '#4a2e00',
                                    margin: '0.3rem 0 0',
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                    fontWeight: '600',
                                }}>
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right - Baker Photo */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
                    style={{
                        flex: 1,
                        minWidth: '280px',
                        maxWidth: '480px',
                        position: 'relative',
                    }}
                >
                {/* Gold ring behind image */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    style={{
                        position: 'absolute',
                        inset: '-15px',
                        borderRadius: '40% 60% 55% 45% / 45% 55% 45% 55%',
                        border: '2px dashed rgba(212,160,23,0.3)',
                        zIndex: 0,
                    }}
                />

                    {/* Image */}
                    <div style={{
                        borderRadius: '40% 60% 55% 45% / 45% 55% 45% 55%',
                        overflow: 'hidden',
                        position: 'relative',
                        zIndex: 1,
                        boxShadow: '0 20px 60px rgba(212,160,23,0.2)',
                    }}>
                        <img
                            src={baker}
                            alt="Royal Gold Baker"
                            style={{
                                width: '100%',
                                height: '550px',
                                objectFit: 'cover',
                                objectPosition: 'top',
                                display: 'block',
                            }}
                        />
                    </div>

                    {/* Floating tag */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        style={{
                            position: 'absolute',
                            bottom: '30px',
                            left: '-20px',
                            backgroundColor: '#2e1a00',
                            borderRadius: '16px',
                            padding: '0.8rem 1.2rem',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                            zIndex: 2,
                        }}
                    >
                        <p style={{
                                fontFamily: 'Playfair Display, serif',
                                color: '#d4a017',
                                fontSize: '0.95rem',
                                fontWeight: '700',
                                margin: 0,
                            }}>
                                Taste The Difference
                            </p>

                            <p style={{
                                fontFamily: 'Lato, sans-serif',
                                color: '#fff8e7',
                                fontSize: '0.75rem',
                                margin: '0.2rem 0 0',
                                opacity: 0.8,
                            }}>
                                Royal Gold Cakes & Cuisine
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero