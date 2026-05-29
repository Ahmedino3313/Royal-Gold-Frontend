import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaInstagram, FaTiktok, FaWhatsapp, FaFacebookF } from 'react-icons/fa'
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md'
import logo from '../assets/logo.png'

function Footer() {
    return (
        <footer style={{
            backgroundColor: '#1c0f00',
            padding: '4rem 1.5rem 2rem',
            borderTop: '1px solid rgba(212, 160, 23, 0.15)',
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
            }}>

                {/* Top Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '3rem',
                    marginBottom: '3rem',
                }}>

                    {/* Brand Column */}
                    <div>
                        <Link to="/">
                            <img
                                src={logo}
                                alt="Royal Gold"
                                style={{ height: '50px', width: 'auto', marginBottom: '1rem', display: 'block' }}
                            />
                            </Link>
                        <p style={{
                            fontFamily: 'Lato, sans-serif',
                            color: 'rgba(255,248,231,0.6)',
                            fontSize: '0.88rem',
                            lineHeight: '1.7',
                            marginBottom: '1.5rem',
                        }}>
                            Premium bakes and cuisine crafted with love for every occasion. Taste the Royal Gold difference.
                        </p>

                        {/* Social Icons */}
                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                            {[
                                { icon: <FaInstagram />, href: '#' },
                                { icon: <FaTiktok />, href: 'https://www.tiktok.com/@royal.gold.cakes?_r=1&_t=ZS-96krj7vFTAz' },
                                { icon: <FaWhatsapp />, href: 'https://wa.me/+2349155695466' },
                                { icon: <FaFacebookF />, href: '#' },
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    whileHover={{ y: -3 }}
                                    style={{
                                        width: '38px',
                                        height: '38px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(212,160,23,0.12)',
                                        border: '1px solid rgba(212,160,23,0.25)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#d4a017',
                                        fontSize: '0.9rem',
                                        textDecoration: 'none',
                                        transition: 'background 0.3s ease',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(212,160,23,0.25)'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(212,160,23,0.12)'}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{
                            fontFamily: 'Playfair Display, serif',
                            color: '#fff8e7',
                            fontSize: '1rem',
                            fontWeight: '700',
                            marginBottom: '1.2rem',
                        }}>
                            Quick Links
                        </h4>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                            {[['/', 'Home'], ['/shop', 'Shop'], ['/orders', 'My Orders'], ['/login', 'Login']].map(([path, label]) => (
                                <Link
                                key={path}
                                to={path}
                                style={{
                                    fontFamily: 'Lato, sans-serif',
                                    color: 'rgba(255,248,231,0.6)',
                                    textDecoration: 'none',
                                    fontSize: '0.88rem',
                                    transition: 'color 0.2s ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#d4a017'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,248,231,0.6)'}
                                >
                                {label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 style={{
                            fontFamily: 'Playfair Display, serif',
                            color: '#fff8e7',
                            fontSize: '1rem',
                            fontWeight: '700',
                            marginBottom: '1.2rem',
                        }}>
                            Categories
                        </h4>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                            {['Celebration Cakes', 'Wedding Cakes', 'Cupcakes', 'Cuisines', 'Small Chops'].map(cat => (
                                <Link
                                key={cat}
                                to="/shop"
                                style={{
                                    fontFamily: 'Lato, sans-serif',
                                    color: 'rgba(255,248,231,0.6)',
                                    textDecoration: 'none',
                                    fontSize: '0.88rem',
                                    transition: 'color 0.2s ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#d4a017'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,248,231,0.6)'}
                                >
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{
                            fontFamily: 'Playfair Display, serif',
                            color: '#fff8e7',
                            fontSize: '1rem',
                            fontWeight: '700',
                            marginBottom: '1.2rem',
                        }}>
                            Contact Us
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                            {[
                                { icon: <MdLocationOn />, text: 'Ibadan, Nigeria' },
                                { icon: <MdPhone />, text: '+234 915 569 5466' },
                                { icon: <MdEmail />, text: 'hello@royalgoldcakes.com' },
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <span style={{ color: '#d4a017', fontSize: '1rem', flexShrink: 0 }}>
                                        {item.icon}
                                    </span>
                                    <span style={{
                                        fontFamily: 'Lato, sans-serif',
                                        color: 'rgba(255,248,231,0.6)',
                                        fontSize: '0.88rem',
                                    }}>
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div style={{
                    borderTop: '1px solid rgba(212,160,23,0.12)',
                    paddingTop: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                }}>
                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        color: 'rgba(255,248,231,0.4)',
                        fontSize: '0.82rem',
                        margin: 0,
                    }}>
                        &copy; {new Date().getFullYear()} Royal Gold Cakes & Cuisine. All rights reserved.
                    </p>

                    <p style={{
                        fontFamily: 'Playfair Display, serif',
                        color: '#d4a017',
                        fontSize: '0.82rem',
                        margin: 0,
                        opacity: 0.7,
                    }}>
                        Taste The Difference
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer