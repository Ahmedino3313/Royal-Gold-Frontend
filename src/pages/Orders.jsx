import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'
import { MdDeliveryDining } from 'react-icons/md'
import { BsClockHistory, BsCheckCircle, BsXCircle } from 'react-icons/bs'
import Footer from '../components/Footer'
import api from '../services/api.js'
import { useState } from 'react'

const statusConfig = {
    pending: {
        label: 'Pending',
        color: '#d97706',
        bg: 'rgba(217,119,6,0.1)',
        icon: <BsClockHistory />,
    },
    processing: {
        label: 'Processing',
        color: '#2563eb',
        bg: 'rgba(37,99,235,0.1)',
        icon: <MdDeliveryDining />,
    },
    delivered: {
        label: 'Delivered',
        color: '#16a34a',
        bg: 'rgba(22,163,74,0.1)',
        icon: <BsCheckCircle />,
    },
    cancelled: {
        label: 'Cancelled',
        color: '#dc2626',
        bg: 'rgba(220,38,38,0.1)',
        icon: <BsXCircle />,
    },
    }

    function Orders() {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) {
        navigate('/login')
        return
        }
        const fetchOrders = async () => {
        try {
            const res = await api.get('/orders/my-orders')
            setOrders(res.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
        }
        fetchOrders()
    }, [user])

    return (
        <>
            <section style={{
                minHeight: '100vh',
                backgroundColor: '#fdfaf4',
                paddingTop: '100px',
                paddingBottom: '3rem',
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ marginBottom: '2rem' }}
                    >
                        <button
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
                        </button>

                        <p style={{
                            fontFamily: 'Lato, sans-serif',
                            color: '#d4a017',
                            fontWeight: '700',
                            fontSize: '0.85rem',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            marginBottom: '0.3rem',
                        }}>
                            Track Your Orders
                        </p>

                        <h1 style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                            fontWeight: '800',
                            color: '#1c0f00',
                            margin: 0,
                        }}>
                            My Orders
                        </h1>

                    </motion.div>

                    {/* Loading */}
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <p style={{
                                fontFamily: 'Lato, sans-serif',
                                color: '#4a2e00',
                                opacity: 0.6,
                            }}>
                                Loading your orders...
                            </p>
                        </div>

                    /* Empty */
                    ) : orders.length === 0 ? (
                        <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', padding: '5rem 0' }}
                        >
                            <p style={{
                                fontFamily: 'Playfair Display, serif',
                                fontSize: '1.5rem',
                                color: '#4a2e00',
                                opacity: 0.5,
                                marginBottom: '1.5rem',
                            }}>
                                You have no orders yet
                            </p>

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
                                }}
                            >
                                Start Shopping
                            </Link>
                        </motion.div>

                    /* Orders List */
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {orders.map((order, i) => {
                                const status = statusConfig[order.status] || statusConfig.pending

                                return (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    style={{
                                    backgroundColor: '#fff8e7',
                                    borderRadius: '20px',
                                    padding: '1.5rem',
                                    border: '1px solid rgba(212,160,23,0.15)',
                                    boxShadow: '0 4px 20px rgba(28,15,0,0.05)',
                                    }}
                                >
                                    {/* Order Header */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        gap: '0.8rem',
                                        marginBottom: '1.2rem',
                                    }}>
                                        <div>
                                            <p style={{
                                                fontFamily: 'Lato, sans-serif',
                                                fontSize: '0.8rem',
                                                color: '#4a2e00',
                                                opacity: 0.6,
                                                margin: '0 0 0.2rem',
                                            }}>
                                                Order #{order.id}
                                            </p>

                                            <p style={{
                                                fontFamily: 'Lato, sans-serif',
                                                fontSize: '0.82rem',
                                                color: '#4a2e00',
                                                margin: 0,
                                                opacity: 0.7,
                                            }}>
                                                {new Date(order.created_at).toLocaleDateString('en-NG', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>

                                        {/* Status Badge */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.4rem',
                                            backgroundColor: status.bg,
                                            color: status.color,
                                            padding: '0.4rem 1rem',
                                            borderRadius: '100px',
                                            fontFamily: 'Lato, sans-serif',
                                            fontSize: '0.82rem',
                                            fontWeight: '700',
                                        }}>
                                            {status.icon} {status.label}
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.8rem',
                                        marginBottom: '1.2rem',
                                    }}>
                                        {order.items?.map((item, j) => (
                                            <div key={j} 
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                    backgroundColor: '#fdfaf4',
                                                    borderRadius: '12px',
                                                    padding: '0.8rem',
                                                }}
                                            >
                                                <img
                                                    src={item.image_url}
                                                    alt={item.name}
                                                    style={{
                                                        width: '55px',
                                                        height: '55px',
                                                        borderRadius: '10px',
                                                        objectFit: 'cover',
                                                        flexShrink: 0,
                                                    }}
                                                />

                                                <div style={{ flex: 1 }}>
                                                    <p style={{
                                                        fontFamily: 'Lato, sans-serif',
                                                        fontWeight: '700',
                                                        color: '#1c0f00',
                                                        fontSize: '0.9rem',
                                                        margin: '0 0 0.2rem',
                                                    }}>
                                                        {item.name}
                                                    </p>

                                                    <p style={{
                                                        fontFamily: 'Lato, sans-serif',
                                                        fontSize: '0.8rem',
                                                        color: '#4a2e00',
                                                        margin: 0,
                                                        opacity: 0.7,
                                                    }}>
                                                        Qty: {item.quantity}
                                                    </p>
                                                </div>
                                                <p style={{
                                                    fontFamily: 'Playfair Display, serif',
                                                    fontWeight: '800',
                                                    color: '#d4a017',
                                                    fontSize: '0.95rem',
                                                    margin: 0,
                                                }}>
                                                    &#8358;{Number(item.price).toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Footer */}
                                    <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            borderTop: '1px solid rgba(212,160,23,0.15)',
                                            paddingTop: '1rem',
                                            flexWrap: 'wrap',
                                            gap: '0.5rem',
                                        }}
                                    >
                                        <p style={{
                                            fontFamily: 'Lato, sans-serif',
                                            fontSize: '0.85rem',
                                            color: '#4a2e00',
                                            margin: 0,
                                            opacity: 0.7,
                                        }}>
                                            {order.items?.length} item{order.items?.length !== 1 ? 's' : ''}
                                        </p>

                                        <p style={{
                                            fontFamily: 'Playfair Display, serif',
                                            fontWeight: '800',
                                            color: '#1c0f00',
                                            fontSize: '1.1rem',
                                            margin: 0,
                                        }}>
                                            Total: <span style={{ color: '#d4a017' }}>
                                            &#8358;{Number(order.total_amount).toLocaleString()}
                                            </span>
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Orders