import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HiOutlineShoppingCart, HiOutlineUser, HiOutlineMenu, HiX } from 'react-icons/hi'
import logo from '../assets/logo.png'

function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const cartItems = useSelector(state => state.cart.items)
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navColor = scrolled ? '#fff8e7' : '#1c0f00'

    return (
        <>
            <nav
                style={{
                    backgroundColor: scrolled ? '#2e1a00' : 'transparent',
                    boxShadow: scrolled ? '0 2px 20px rgba(212,160,23,0.15)' : 'none',
                    transition: 'all 0.3s ease',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    padding: '0.6rem 1.5rem',
                }}
            >
                <div style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >

                    {/* Logo */}
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Royal Gold Cakes & Cuisine"
                            style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
                        />
                    </Link>

                    {/* Desktop Nav Links — hidden on mobile */}
                    <ul
                        className="hidden md:flex"
                        style={{ alignItems: 'center', gap: '2.5rem', listStyle: 'none', margin: 0 }}
                    >
                        {[['/', 'Home'], ['/shop', 'Shop'], ['/orders', 'My Orders']].map(([path, label]) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    style={{
                                        color: navColor,
                                        textDecoration: 'none',
                                        fontFamily: 'Lato, sans-serif',
                                        fontSize: '0.95rem',
                                        fontWeight: '600',
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Right Side Icons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

                        {/* Mobile only — Home, Shop in text */}
                        <Link to="/" className="md:hidden" style={{
                                color: navColor,
                                textDecoration: 'none',
                                fontFamily: 'Lato, sans-serif',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                            }}
                        >
                            Home
                        </Link>

                        <Link to="/shop" className="md:hidden" style={{
                            color: navColor,
                            textDecoration: 'none',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            }}
                        >
                            Shop
                        </Link>

                        {/* Cart - both mobile and desktop */}
                        <Link to="/cart" style={{ color: navColor, position: 'relative' }} title="Cart">
                            <HiOutlineShoppingCart style={{ fontSize: '1.4rem' }} />
                            {cartCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    backgroundColor: '#d4a017',
                                    color: '#1c0f00',
                                    borderRadius: '50%',
                                    width: '17px',
                                    height: '17px',
                                    fontSize: '0.6rem',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'

                                }}> {cartCount} </span>
                            )}
                        </Link>

                        {/* User - both mobile and desktop */}
                        <Link to="/login" style={{ color: navColor }} title="Login">
                            <HiOutlineUser style={{ fontSize: '1.4rem' }} />
                        </Link>

                        {/* Hamburger — mobile only */}
                        <button
                            className="md:hidden"
                            onClick={() => setMenuOpen(true)}
                            style={{
                                color: navColor,
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0
                            }}
                        >
                            <HiOutlineMenu style={{ fontSize: '1.4rem' }} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Overlay */}
            <div
                onClick={() => setMenuOpen(false)}
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 1001,
                    opacity: menuOpen ? 1 : 0,
                    pointerEvents: menuOpen ? 'all' : 'none',
                    transition: 'opacity 0.3s ease',
                }}
            />

            {/* Side Drawer */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    height: '100vh',
                    width: '280px',
                    backgroundColor: '#2e1a00',
                    zIndex: 1002,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.35s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2rem 1.5rem',
                }}
            >
                {/* Drawer Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '2.5rem'
                    }}
                >
                    <span style={{
                        fontFamily: 'Playfair Display, serif',
                        color: '#d4a017',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                    }}>
                        Royal Gold Cakes & Cuisine
                    </span>
                    <button
                        onClick={() => setMenuOpen(false)}
                        style={{ background: 'none', border: 'none', color: '#fff8e7', cursor: 'pointer' }}>
                        <HiX style={{ fontSize: '1.5rem' }} />
                    </button>
                </div>

                {/* Drawer Links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                        ['/', 'Home'],
                        ['/shop', 'Shop'],
                        ['/orders', 'My Orders'],
                        ['/account', 'My Account']
                    ].map(([path, label]) => (
                        <Link
                            key={path}
                            to={path}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                color: '#fff8e7',
                                textDecoration: 'none',
                                fontFamily: 'Lato, sans-serif',
                                fontWeight: '600',
                                fontSize: '1rem',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                padding: '1rem 0.5rem',
                                borderBottom: '1px solid rgba(212,160,23,0.15)',
                                transition: 'color 0.2s ease',
                            }}
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Drawer Footer */}
                <div style={{
                        marginTop: 'auto',
                        color: '#d4a017',
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '0.85rem',
                        textAlign: 'center',
                        opacity: 0.8
                    }}
                >
                    Taste The Difference
                </div>
            </div>
        </>
    )
}

export default Navbar