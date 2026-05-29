import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { MdMarkEmailRead } from 'react-icons/md'

function Newsletter() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) return
        setSubmitted(true)
        setEmail('')
    }

    return (
        <section style={{
            backgroundColor: '#fdfaf4',
            padding: '5rem 1.5rem',
        }}>
            <div style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center' }}>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Icon */}
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(212,160,23,0.12)',
                        border: '1px solid rgba(212,160,23,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        color: '#d4a017',
                        fontSize: '1.6rem',
                    }}>
                        <MdMarkEmailRead />
                    </div>

                    {/* Heading */}
                    <p style={{
                            fontFamily: 'Lato, sans-serif',
                            color: '#d4a017',
                            fontWeight: '700',
                            fontSize: '0.85rem',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            marginBottom: '0.5rem',
                        }}>
                            Stay in the loop
                    </p>

                    <h2 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                        fontWeight: '800',
                        color: '#1c0f00',
                        margin: '0 0 1rem',
                        lineHeight: '1.2',
                    }}>
                        Get Exclusive Offers & <br />
                        <span style={{ color: '#d4a017' }}>Sweet Deals</span>
                    </h2>

                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        color: '#4a2e00',
                        fontSize: '1rem',
                        lineHeight: '1.7',
                        marginBottom: '2rem',
                        opacity: 0.8,
                    }}>
                        Subscribe to our newsletter and be the first to know about
                        new products, special discounts, and seasonal offerings.
                    </p>

                    {/* Form or Success */}
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                backgroundColor: 'rgba(212,160,23,0.1)',
                                border: '1px solid rgba(212,160,23,0.3)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                            }}
                        >
                            <p style={{
                                fontFamily: 'Playfair Display, serif',
                                color: '#d4a017',
                                fontSize: '1.2rem',
                                fontWeight: '700',
                                margin: 0,
                            }}>
                                Welcome to the Royal family!
                            </p>

                            <p style={{
                                fontFamily: 'Lato, sans-serif',
                                color: '#4a2e00',
                                fontSize: '0.9rem',
                                margin: '0.5rem 0 0',
                            }}>
                                You will be the first to know about our latest offers.
                            </p>
                        </motion.div>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                gap: '0',
                                maxWidth: '480px',
                                margin: '0 auto',
                                backgroundColor: '#fff8e7',
                                border: '2px solid rgba(212,160,23,0.3)',
                                borderRadius: '100px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(212,160,23,0.12)',
                            }}
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                style={{
                                flex: 1,
                                border: 'none',
                                outline: 'none',
                                padding: '0.9rem 1.5rem',
                                fontFamily: 'Lato, sans-serif',
                                fontSize: '0.9rem',
                                backgroundColor: 'transparent',
                                color: '#1c0f00',
                                }}
                            />
                            <button
                                onClick={handleSubmit}
                                style={{
                                backgroundColor: '#d4a017',
                                color: '#1c0f00',
                                border: 'none',
                                padding: '0.9rem 1.5rem',
                                cursor: 'pointer',
                                fontFamily: 'Lato, sans-serif',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                transition: 'background 0.3s ease',
                                borderRadius: '0 100px 100px 0',
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b8860b'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d4a017'}
                            >
                                Subscribe <HiArrowRight />
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    )
}

export default Newsletter