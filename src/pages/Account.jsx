import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { HiOutlineUser, HiOutlineMail, HiArrowLeft,} from 'react-icons/hi'
import { MdOutlineShoppingBag, MdLogout, MdOutlineInventory } from 'react-icons/md'
import { BsShieldCheck } from 'react-icons/bs'
import { logout } from '../store/slices/authSlice'
import toast from 'react-hot-toast'
import Footer from '../components/Footer'

function Account() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const { items } = useSelector(state => state.cart)

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user])

    const handleLogout = () => {
        dispatch(logout())
        toast.success('Logged out successfully')
        navigate('/')
    }

    if (!user) return null

    const menuItems = [
        {
            icon: <MdOutlineShoppingBag />,
            label: 'My Orders',
            desc: 'View and track your orders',
            path: '/orders',
        },
        {
            icon: <BsShieldCheck />,
            label: 'Account Security',
            desc: 'Manage your password',
            path: '#',
        },
        // Admin
        ...(user?.role === 'admin' ? [{
        icon: <MdOutlineInventory />,
        label: 'Admin Dashboard',
        desc: 'Manage products and orders',
        path: '/admin',
        }] : []),
    ]

    return (
        <>
            <section style={{
                minHeight: '100vh',
                backgroundColor: '#fdfaf4',
                paddingTop: '100px',
                paddingBottom: '3rem',
            }}>
                <div style={{ maxWidth: '650px', margin: '0 auto', padding: '2rem 1.5rem' }}>

                    {/* Back */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate(-1)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#4a2e00',
                            fontFamily: 'Lato, sans-serif',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            marginBottom: '1.5rem',
                            opacity: 0.7,
                        }}
                    >
                        <HiArrowLeft /> Back
                    </motion.button>

                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            backgroundColor: '#2e1a00',
                            borderRadius: '24px',
                            padding: '2rem',
                            marginBottom: '1.5rem',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Gold blur */}
                        <div style={{
                            position: 'absolute',
                            top: '-40px',
                            right: '-40px',
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            backgroundColor: '#d4a017',
                            filter: 'blur(60px)',
                            opacity: 0.1,
                        }} />

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.2rem',
                            position: 'relative',
                            zIndex: 1,
                        }}>
                            {/* Avatar */}
                            <div style={{
                                width: '65px',
                                height: '65px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(212,160,23,0.2)',
                                border: '2px solid rgba(212,160,23,0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'Playfair Display, serif',
                                fontWeight: '700',
                                color: '#d4a017',
                                fontSize: '1.5rem',
                                flexShrink: 0,
                            }}>
                                {user.name?.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <p style={{
                                    fontFamily: 'Playfair Display, serif',
                                    fontWeight: '700',
                                    color: '#fff8e7',
                                    fontSize: '1.2rem',
                                    margin: '0 0 0.3rem',
                                }}>
                                    {user.name}
                                </p>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                }}>
                                    <HiOutlineMail style={{ color: '#d4a017', fontSize: '0.85rem' }} />
                                    <p style={{
                                        fontFamily: 'Lato, sans-serif',
                                        color: 'rgba(255,248,231,0.6)',
                                        fontSize: '0.85rem',
                                        margin: 0,
                                    }}>
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            {/* Role Badge */}
                            <div style={{
                            marginLeft: 'auto',
                            backgroundColor: 'rgba(212,160,23,0.15)',
                            border: '1px solid rgba(212,160,23,0.3)',
                            borderRadius: '100px',
                            padding: '0.3rem 0.7rem',
                            color: '#d4a017',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '0.7rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            flexShrink: 0,
                            whiteSpace: 'nowrap',
                        }}>
                                {user.role}
                            </div>
                        </div>
                    </motion.div>

                    {/* Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem',
                            marginBottom: '1.5rem',
                        }}
                    >
                        {[
                        { label: 'Cart Items', value: items.length, icon: <MdOutlineShoppingBag /> },
                        { label: 'Account Type', value: user.role === 'admin' ? 'Admin' : 'Customer', icon: <HiOutlineUser /> },
                        ].map((stat) => (
                            <div key={stat.label} style={{
                                backgroundColor: '#fff8e7',
                                borderRadius: '16px',
                                padding: '1.2rem',
                                border: '1px solid rgba(212,160,23,0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    backgroundColor: 'rgba(212,160,23,0.12)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#d4a017',
                                    fontSize: '1.1rem',
                                    flexShrink: 0,
                                }}>
                                    {stat.icon}
                                </div>

                                <div>
                                    <p style={{
                                        fontFamily: 'Playfair Display, serif',
                                        fontWeight: '800',
                                        color: '#1c0f00',
                                        fontSize: '1.1rem',
                                        margin: 0,
                                        lineHeight: 1,
                                    }}>
                                        {stat.value}
                                    </p>

                                    <p style={{
                                        fontFamily: 'Lato, sans-serif',
                                        fontSize: '0.78rem',
                                        color: '#4a2e00',
                                        margin: '0.2rem 0 0',
                                        opacity: 0.7,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}>
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Menu Items */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            backgroundColor: '#fff8e7',
                            borderRadius: '20px',
                            border: '1px solid rgba(212,160,23,0.15)',
                            overflow: 'hidden',
                            marginBottom: '1.5rem',
                        }}
                    >
                        {menuItems.map((item, i) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1.2rem 1.5rem',
                                    textDecoration: 'none',
                                    borderBottom: i < menuItems.length - 1
                                        ? '1px solid rgba(212,160,23,0.1)'
                                        : 'none',
                                    transition: 'background 0.2s ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(212,160,23,0.06)'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <div style={{
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '12px',
                                    backgroundColor: 'rgba(212,160,23,0.12)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#d4a017',
                                    fontSize: '1.2rem',
                                    flexShrink: 0,
                                }}>
                                    {item.icon}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <p style={{
                                        fontFamily: 'Lato, sans-serif',
                                        fontWeight: '700',
                                        color: '#1c0f00',
                                        fontSize: '0.95rem',
                                        margin: '0 0 0.15rem',
                                    }}>
                                        {item.label}
                                    </p>

                                    <p style={{
                                        fontFamily: 'Lato, sans-serif',
                                        fontSize: '0.8rem',
                                        color: '#4a2e00',
                                        margin: 0,
                                        opacity: 0.6,
                                    }}>
                                        {item.desc}
                                    </p>
                                </div>
                                
                                <span style={{ color: '#d4a017', fontSize: '1rem', opacity: 0.5 }}>›</span>
                            </Link>
                        ))}
                    </motion.div>

                    {/* Logout */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            padding: '0.95rem',
                            borderRadius: '14px',
                            border: '2px solid rgba(220,38,38,0.3)',
                            backgroundColor: 'rgba(220,38,38,0.06)',
                            color: '#dc2626',
                            fontFamily: 'Lato, sans-serif',
                            fontWeight: '700',
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#dc2626'
                            e.currentTarget.style.color = '#fff8e7'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.06)'
                            e.currentTarget.style.color = '#dc2626'
                        }}
                    >
                        <MdLogout /> Sign Out
                    </motion.button>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Account