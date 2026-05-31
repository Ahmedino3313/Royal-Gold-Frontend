import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BsClockHistory, BsCheckCircle, BsXCircle } from 'react-icons/bs'
import { MdDeliveryDining } from 'react-icons/md'
import api from '../../services/api'
import toast from 'react-hot-toast'

const statusOptions = ['pending', 'processing', 'delivered', 'cancelled']

const statusConfig = {
    pending: { color: '#d97706', bg: 'rgba(217,119,6,0.1)', icon: <BsClockHistory /> },
    processing: { color: '#2563eb', bg: 'rgba(37,99,235,0.1)', icon: <MdDeliveryDining /> },
    delivered: { color: '#16a34a', bg: 'rgba(22,163,74,0.1)', icon: <BsCheckCircle /> },
    cancelled: { color: '#dc2626', bg: 'rgba(220,38,38,0.1)', icon: <BsXCircle /> },
}

function ManageOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchOrders = async () => {
        try {
            const res = await api.get('/orders')
            setOrders(res.data)
        } catch (err) {
            toast.error('Failed to load orders')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const handleStatusChange = async (orderId, status) => {
        try {
        await api.put(`/orders/${orderId}`, { status })
        toast.success('Order status updated')
        fetchOrders()
        } catch (err) {
        toast.error('Failed to update status')
        }
    }

    if (loading) {
        return (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ fontFamily: 'Lato, sans-serif', color: '#4a2e00', opacity: 0.6 }}>
            Loading orders...
            </p>
        </div>
        )
    }

    if (orders.length === 0) {
        return (
        <div style={{
            textAlign: 'center',
            padding: '4rem',
            backgroundColor: '#fff8e7',
            borderRadius: '20px',
            border: '1px solid rgba(212,160,23,0.15)',
        }}>
            <p style={{
            fontFamily: 'Playfair Display, serif',
            color: '#4a2e00',
            fontSize: '1.2rem',
            opacity: 0.5,
            }}>
            No orders yet
            </p>
        </div>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{
                fontFamily: 'Lato, sans-serif',
                color: '#4a2e00',
                fontSize: '0.9rem',
                opacity: 0.7,
                margin: 0,
            }}>
                {orders.length} order{orders.length !== 1 ? 's' : ''} total
            </p>

            {orders.map((order, i) => {
                const status = statusConfig[order.status] || statusConfig.pending
                return (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        style={{
                            backgroundColor: '#fff8e7',
                            borderRadius: '20px',
                            padding: '1.5rem',
                            border: '1px solid rgba(212,160,23,0.15)',
                        }}
                    >
                        {/* Order Header */}
                        <div>
                            <p style={{
                                fontFamily: 'Playfair Display, serif',
                                fontWeight: '800',
                                color: '#1c0f00',
                                fontSize: '1rem',
                                margin: '0 0 0.3rem',
                            }}>
                                Order #{order.id}
                            </p>

                            {/* Customer Details */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.2rem',
                                marginBottom: '0.5rem',
                            }}>
                                <p style={{
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '0.85rem',
                                    color: '#1c0f00',
                                    fontWeight: '700',
                                    margin: 0,
                                }}>
                                    {order.customer_name}
                                </p>

                                <p style={{
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '0.82rem',
                                    color: '#4a2e00',
                                    margin: 0,
                                    opacity: 0.7,
                                }}>
                                    {order.email} — {order.phone}
                                </p>

                                <p style={{
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '0.82rem',
                                    color: '#4a2e00',
                                    margin: 0,
                                    opacity: 0.7,
                                }}>
                                    {order.address}, {order.city}
                                </p>

                                {order.notes && (
                                    <p style={{
                                        fontFamily: 'Lato, sans-serif',
                                        fontSize: '0.8rem',
                                        color: '#4a2e00',
                                        margin: 0,
                                        opacity: 0.6,
                                        fontStyle: 'italic',
                                    }}>
                                        Note: {order.notes}
                                    </p>
                                )}
                            </div>

                            {/* Payment Reference */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                flexWrap: 'wrap',
                            }}>
                                <p style={{
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '0.78rem',
                                    color: '#4a2e00',
                                    margin: 0,
                                    opacity: 0.5,
                                }}>
                                    {new Date(order.created_at).toLocaleDateString('en-NG', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>

                                {order.payment_reference && (
                                    <span style={{
                                        backgroundColor: 'rgba(22,163,74,0.1)',
                                        color: '#16a34a',
                                        fontFamily: 'Lato, sans-serif',
                                        fontSize: '0.72rem',
                                        fontWeight: '700',
                                        padding: '0.15rem 0.6rem',
                                        borderRadius: '100px',
                                    }}>
                                        Ref: {order.payment_reference}
                                    </span>
                                )}

                                <span style={{
                                    backgroundColor: order.payment_status === 'paid'
                                        ? 'rgba(22, 163, 74, 0.1)'
                                        : 'rgba(217, 119, 6, 0.1)',
                                    color: order.payment_status === 'paid' ? '#16a34a' : '#d97706',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '0.72rem',
                                    fontWeight: '700',
                                    padding: '0.15rem 0.6rem',
                                    borderRadius: '100px',
                                }}>
                                    {order.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                                </span>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.6rem',
                            marginBottom: '1rem',
                            padding: '1rem',
                            backgroundColor: '#fdfaf4',
                            borderRadius: '12px',
                        }}>
                            {order.items?.map((item, j) => (
                                <div key={j} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '8px',
                                                objectFit: 'cover',
                                            }}
                                        />

                                        <span style={{
                                            fontFamily: 'Lato, sans-serif',
                                            fontSize: '0.85rem',
                                            color: '#1c0f00',
                                            fontWeight: '600',
                                        }}>
                                            {item.name}
                                        </span>
                                    </div>

                                    <span style={{
                                        fontFamily: 'Lato, sans-serif',
                                        fontSize: '0.82rem',
                                        color: '#4a2e00',
                                        opacity: 0.7,
                                    }}>
                                        x{item.quantity} — ₦{Number(item.price).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '1rem',
                        }}>
                            <p style={{
                                fontFamily: 'Playfair Display, serif',
                                fontWeight: '800',
                                color: '#d4a017',
                                fontSize: '1.1rem',
                                margin: 0,
                            }}>
                                &#8358;{Number(order.total_amount).toLocaleString()}
                            </p>

                            {/* Status Selector */}
                            <select
                                value={order.status}
                                onChange={e => handleStatusChange(order.id, e.target.value)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '10px',
                                    border: '2px solid rgba(212,160,23,0.3)',
                                    backgroundColor: '#fff8e7',
                                    fontFamily: 'Lato, sans-serif',
                                    fontWeight: '700',
                                    fontSize: '0.85rem',
                                    color: '#1c0f00',
                                    cursor: 'pointer',
                                    outline: 'none',
                                }}
                            >
                                {statusOptions.map(s => (
                                <option key={s} value={s}>
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                </option>
                                ))}
                            </select>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}

export default ManageOrders