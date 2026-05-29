import { motion } from 'framer-motion'
import { GiCakeSlice } from 'react-icons/gi'
import { MdDeliveryDining, MdVerified } from 'react-icons/md'
import { BsStarFill } from 'react-icons/bs'

const features = [
    {
        icon: <GiCakeSlice />,
        title: 'Custom Cakes',
        desc: 'Designed to your taste and occasion',
    },
    {
        icon: <MdDeliveryDining />,
        title: 'Fast Delivery',
        desc: 'Fresh to your doorstep on time',
    },
    {
        icon: <BsStarFill />,
        title: 'Premium Quality',
        desc: 'Only the finest ingredients used',
    },
    {
        icon: <MdVerified />,
        title: 'Trusted Brand',
        desc: 'Hundreds of happy customers served',
    },
    ]

    function FeaturesStrip() {
    return (
        <section style={{
            backgroundColor: '#2e1a00',
            padding: '3rem 1.5rem',
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '2rem',
            }}>
                {features.map((feature, i) => (
                <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        flex: '1',
                        minWidth: '200px',
                    }}
                >
                    {/* Icon */}
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(212,160,23,0.15)',
                        border: '1px solid rgba(212,160,23,0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#d4a017',
                        fontSize: '1.4rem',
                        flexShrink: 0,
                    }}>
                        {feature.icon}
                    </div>

                    {/* Text */}
                    <div>
                        <p style={{
                            fontFamily: 'Lato, sans-serif',
                            fontWeight: '700',
                            color: '#fff8e7',
                            fontSize: '0.95rem',
                            margin: 0,
                            letterSpacing: '0.03em',
                        }}>
                            {feature.title}
                        </p>

                        <p style={{
                            fontFamily: 'Lato, sans-serif',
                            color: 'rgba(255,248,231,0.6)',
                            fontSize: '0.82rem',
                            margin: '0.2rem 0 0',
                        }}>
                            {feature.desc}
                        </p>
                    </div>
                </motion.div>
                ))}
            </div>
        </section>
    )
}

export default FeaturesStrip