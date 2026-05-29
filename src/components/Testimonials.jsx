import { motion } from 'framer-motion'
import { BsStarFill } from 'react-icons/bs'
import { FaQuoteLeft } from 'react-icons/fa'

const testimonials = [
    {
        name: 'Samuel Ibrahim',
        location: 'Lagos, Nigeria',
        text: 'Royal Gold made my wedding cake and it was absolutely breathtaking. Every guest was talking about it. The taste was even better than the look!',
        initials: 'SI',
    },
    {
        name: 'Tunde Adeleke',
        location: 'Ibadan, Nigeria',
        text: 'The cupcake box was a perfect gift. Beautifully packaged with gold details. My wife was over the moon. Royal Gold never disappoints.',
        initials: 'TA',
    },
    {
        name: 'Precious Adeyemi',
        location: 'Abuja, Nigeria',
        text: 'I ordered a birthday cake for my daughter and it exceeded every expectation. The delivery was on time and the cake was incredibly fresh.',
        initials: 'PA',
    },
    {
        name: 'Fatima Bello',
        location: 'Port Harcourt, Nigeria',
        text: 'Best jollof rice I have ever tasted outside my mother\'s kitchen. Royal Gold cuisine is on another level entirely. Will always order!',
        initials: 'FB',
    },
]

function Testimonials() {
    return (
        <section style={{
                backgroundColor: '#2e1a00',
                padding: '5rem 1.5rem',
                position: 'relative',
                overflow: 'hidden',
            }}>

            {/* Background blur */}
            <div style={{
                position: 'absolute',
                bottom: '-100px',
                left: '-100px',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                backgroundColor: '#d4a017',
                filter: 'blur(100px)',
                opacity: 0.06,
                zIndex: 0,
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        color: '#d4a017',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        marginBottom: '0.5rem',
                    }}>
                        What They Say
                    </p>

                    <h2 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: '800',
                        color: '#fff8e7',
                        margin: '0 0 1rem',
                    }}>
                        Happy Customers
                    </h2>

                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        color: 'rgba(255,248,231,0.6)',
                        fontSize: '1rem',
                        maxWidth: '500px',
                        margin: '0 auto',
                        lineHeight: '1.7',
                    }}>
                        Thousands of Nigerians trust Royal Gold for their most special moments.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '1.5rem',
                }}>
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -4 }}
                            style={{
                                backgroundColor: 'rgba(255,248,231,0.05)',
                                border: '1px solid rgba(212,160,23,0.15)',
                                borderRadius: '20px',
                                padding: '1.8rem',
                                transition: 'border-color 0.3s ease',
                                cursor: 'default',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(212,160,23,0.4)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(212,160,23,0.15)'
                            }}
                        >
                        {/* Quote icon */}
                        <FaQuoteLeft style={{
                            color: '#d4a017',
                            fontSize: '1.5rem',
                            marginBottom: '1rem',
                            opacity: 0.7,
                        }} />

                        {/* Stars */}
                        <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
                            {[...Array(5)].map((_, j) => (
                            <BsStarFill key={j} style={{ color: '#d4a017', fontSize: '0.75rem' }} />
                            ))}
                        </div>

                        {/* Text */}
                        <p style={{
                            fontFamily: 'Lato, sans-serif',
                            color: 'rgba(255,248,231,0.85)',
                            fontSize: '0.9rem',
                            lineHeight: '1.7',
                            marginBottom: '1.5rem',
                            textAlign: 'justify',
                        }}>
                            "{t.text}"
                        </p>

                        {/* Customer */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(212,160,23,0.2)',
                                border: '2px solid rgba(212,160,23,0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'Playfair Display, serif',
                                fontWeight: '700',
                                color: '#d4a017',
                                fontSize: '0.85rem',
                                flexShrink: 0,
                            }}>
                                {t.initials}
                            </div>

                            <div>
                                <p style={{
                                    fontFamily: 'Lato, sans-serif',
                                    fontWeight: '700',
                                    color: '#fff8e7',
                                    fontSize: '0.9rem',
                                    margin: 0,
                                }}>
                                    {t.name}
                                </p>

                                <p style={{
                                    fontFamily: 'Lato, sans-serif',
                                    color: 'rgba(255,248,231,0.5)',
                                    fontSize: '0.78rem',
                                    margin: '0.15rem 0 0',
                                }}>
                                    {t.location}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials