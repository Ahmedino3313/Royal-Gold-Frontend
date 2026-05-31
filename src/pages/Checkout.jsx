import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HiArrowLeft, HiOutlineUser, HiOutlinePhone, HiOutlineLocationMarker,} from 'react-icons/hi'
import { MdOutlineNotes } from 'react-icons/md'
import { BsShieldCheck } from 'react-icons/bs'
import { clearCart } from '../store/slices/cartSlice'
import api from '../services/api'
import toast from 'react-hot-toast'
import Footer from '../components/Footer'

function Checkout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { items } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        fullName: user?.name || '',
        phone: '',
        address: '',
        city: '',
        notes: '',
    })

    const subtotal = items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
    const deliveryFee = 1500
    const total = subtotal + deliveryFee

    const handleChange = (e) => {
        const sanitized = e.target.value
        .replace(/[<>"'`]/g, '')
        .trimStart()
        setForm(prev => ({ ...prev, [e.target.name]: sanitized }))
    }

    const validateForm = () => {
        if (!form.fullName || !form.phone || !form.address || !form.city) {
        toast.error('Please fill in all required fields')
        return false
        }
        if (items.length === 0) {
        toast.error('Your cart is empty')
        return false
        }
        return true
    }

    const saveOrder = async (paymentReference = 'PENDING-PAYMENT') => {
        const orderItems = items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
        }))

        await api.post('/orders', {
            items: orderItems,
            customer_name: form.fullName,
            phone: form.phone,
            address: form.address,
            city: form.city,
            notes: form.notes,
            payment_reference: paymentReference,
            payment_status: 'pending',
        })

        dispatch(clearCart())
        toast.success('Order placed successfully!')
        navigate('/orders')
    }

    const handleCheckout = async () => {
        if (!validateForm()) return
            setLoading(true)
            try {
                await saveOrder('PENDING-PAYMENT')
                toast.success('Order placed! Payment will be set up soon.')
            } catch (err) {
                toast.error('Failed to place order. Please try again.')
            } finally {
                setLoading(false)
            }
        }

    if (items.length === 0) {
        navigate('/shop')
        return null
    }

    const inputStyle = {
        width: '100%',
        padding: '0.85rem 1rem 0.85rem 2.8rem',
        borderRadius: '12px',
        border: '2px solid rgba(212,160,23,0.25)',
        backgroundColor: '#fdfaf4',
        fontFamily: 'Lato, sans-serif',
        fontSize: '0.9rem',
        color: '#1c0f00',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s ease',
    }

    const labelStyle = {
        fontFamily: 'Lato, sans-serif',
        fontSize: '0.85rem',
        fontWeight: '700',
        color: '#1c0f00',
        display: 'block',
        marginBottom: '0.4rem',
        letterSpacing: '0.03em',
    }

    const iconStyle = {
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#d4a017',
        fontSize: '1.1rem',
    }

    return (
        <>
        <section style={{
            minHeight: '100vh',
            backgroundColor: '#fdfaf4',
            paddingTop: '100px',
            paddingBottom: '3rem',
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '2rem' }}
            >
                <button
                onClick={() => navigate('/cart')}
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
                <HiArrowLeft /> Back to Cart
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
                Almost There
                </p>
                <h1 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: '800',
                color: '#1c0f00',
                margin: 0,
                }}>
                Checkout
                </h1>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                alignItems: 'start',
            }}>

                {/* Left — Delivery Form */}
                <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                    backgroundColor: '#fff8e7',
                    borderRadius: '24px',
                    padding: '2rem',
                    border: '1px solid rgba(212,160,23,0.15)',
                }}
                >
                <h2 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.3rem',
                    fontWeight: '800',
                    color: '#1c0f00',
                    margin: '0 0 1.5rem',
                }}>
                    Delivery Details
                </h2>

                {/* Full Name */}
                <div style={{ marginBottom: '1.2rem' }}>
                    <label style={labelStyle}>Full Name</label>
                    <div style={{ position: 'relative' }}>
                    <HiOutlineUser style={iconStyle} />
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        style={inputStyle}
                        onFocus={e => e.currentTarget.style.borderColor = '#d4a017'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.25)'}
                    />
                    </div>
                </div>

                {/* Phone */}
                <div style={{ marginBottom: '1.2rem' }}>
                    <label style={labelStyle}>Phone Number</label>
                    <div style={{ position: 'relative' }}>
                    <HiOutlinePhone style={iconStyle} />
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="e.g 08012345678"
                        style={inputStyle}
                        onFocus={e => e.currentTarget.style.borderColor = '#d4a017'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.25)'}
                    />
                    </div>
                </div>

                {/* Address */}
                <div style={{ marginBottom: '1.2rem' }}>
                    <label style={labelStyle}>Delivery Address</label>
                    <div style={{ position: 'relative' }}>
                    <HiOutlineLocationMarker style={iconStyle} />
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="House number, street name"
                        style={inputStyle}
                        onFocus={e => e.currentTarget.style.borderColor = '#d4a017'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.25)'}
                    />
                    </div>
                </div>

                {/* City */}
                <div style={{ marginBottom: '1.2rem' }}>
                    <label style={labelStyle}>City / Area</label>
                    <div style={{ position: 'relative' }}>
                    <HiOutlineLocationMarker style={iconStyle} />
                    <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="e.g Lagos Island, Abuja"
                        style={inputStyle}
                        onFocus={e => e.currentTarget.style.borderColor = '#d4a017'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.25)'}
                    />
                    </div>
                </div>

                {/* Notes */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>
                    Order Notes{' '}
                    <span style={{ opacity: 0.5, fontWeight: '400' }}>(optional)</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                    <MdOutlineNotes style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '1rem',
                        color: '#d4a017',
                        fontSize: '1.1rem',
                    }} />
                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Any special instructions..."
                        rows={3}
                        style={{
                        ...inputStyle,
                        padding: '0.85rem 1rem 0.85rem 2.8rem',
                        resize: 'none',
                        lineHeight: '1.6',
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = '#d4a017'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.25)'}
                    />
                    </div>
                </div>

                {/* Security Note */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'rgba(212,160,23,0.08)',
                    border: '1px solid rgba(212,160,23,0.2)',
                    borderRadius: '10px',
                    padding: '0.8rem 1rem',
                }}>
                    <BsShieldCheck style={{ color: '#d4a017', fontSize: '1rem', flexShrink: 0 }} />
                    <p style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '0.8rem',
                    color: '#4a2e00',
                    margin: 0,
                    opacity: 0.8,
                    }}>
                    Your information is secure and will only be used for delivery purposes.
                    </p>
                </div>
                </motion.div>

                {/* Right — Order Summary */}
                <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ position: 'sticky', top: '100px' }}
                >
                <div style={{
                    backgroundColor: '#fff8e7',
                    borderRadius: '24px',
                    padding: '1.8rem',
                    border: '1px solid rgba(212,160,23,0.15)',
                    marginBottom: '1rem',
                }}>
                    <h2 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.3rem',
                    fontWeight: '800',
                    color: '#1c0f00',
                    margin: '0 0 1.2rem',
                    }}>
                    Order Summary
                    </h2>

                    {/* Items */}
                    <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem',
                    marginBottom: '1.2rem',
                    maxHeight: '220px',
                    overflowY: 'auto',
                    }}>
                    {items.map(item => (
                        <div key={item.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        }}>
                        <img
                            src={item.image_url}
                            alt={item.name}
                            style={{
                            width: '48px',
                            height: '48px',
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
                            fontSize: '0.85rem',
                            margin: '0 0 0.1rem',
                            }}>
                            {item.name}
                            </p>
                            <p style={{
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '0.78rem',
                            color: '#4a2e00',
                            margin: 0,
                            opacity: 0.6,
                            }}>
                            x{item.quantity}
                            </p>
                        </div>
                        <p style={{
                            fontFamily: 'Lato, sans-serif',
                            fontWeight: '700',
                            color: '#1c0f00',
                            fontSize: '0.88rem',
                            margin: 0,
                        }}>
                            ₦{(Number(item.price) * item.quantity).toLocaleString()}
                        </p>
                        </div>
                    ))}
                    </div>

                    {/* Totals */}
                    <div style={{
                    borderTop: '1px solid rgba(212,160,23,0.2)',
                    paddingTop: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.7rem',
                    }}>
                    {[
                        { label: 'Subtotal', value: `₦${subtotal.toLocaleString()}` },
                        { label: 'Delivery Fee', value: `₦${deliveryFee.toLocaleString()}` },
                    ].map(line => (
                        <div key={line.label} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        }}>
                        <span style={{
                            fontFamily: 'Lato, sans-serif',
                            color: '#4a2e00',
                            fontSize: '0.88rem',
                            opacity: 0.8,
                        }}>
                            {line.label}
                        </span>
                        <span style={{
                            fontFamily: 'Lato, sans-serif',
                            fontWeight: '700',
                            color: '#1c0f00',
                            fontSize: '0.88rem',
                        }}>
                            {line.value}
                        </span>
                        </div>
                    ))}

                    {/* Total */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderTop: '1px solid rgba(212,160,23,0.2)',
                        paddingTop: '0.8rem',
                        marginTop: '0.3rem',
                    }}>
                        <span style={{
                            fontFamily: 'Playfair Display, serif',
                            fontWeight: '800',
                            color: '#1c0f00',
                            fontSize: '1.1rem',
                        }}>
                            Total
                        </span>

                        <span style={{
                            fontFamily: 'Playfair Display, serif',
                            fontWeight: '800',
                            color: '#d4a017',
                            fontSize: '1.2rem',
                        }}>
                            &#8358;{total.toLocaleString()}
                        </span>
                    </div>
                    </div>
                </div>

                {/* Pay Button */}
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCheckout}
                    disabled={loading}
                    style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '14px',
                    border: 'none',
                    backgroundColor: loading ? 'rgba(212,160,23,0.5)' : '#d4a017',
                    color: '#1c0f00',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: '700',
                    fontSize: '1rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    letterSpacing: '0.05em',
                    transition: 'background 0.3s ease',
                    boxShadow: '0 4px 20px rgba(212,160,23,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.8rem',
                    }}
                    onMouseEnter={e => {
                    if (!loading) e.currentTarget.style.backgroundColor = '#b8860b'
                    }}
                    onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = loading
                        ? 'rgba(212,160,23,0.5)'
                        : '#d4a017'
                    }}
                >
                    {loading ? 'Placing Order...' : `Place Order — ₦${total.toLocaleString()}`}
                </motion.button>

                {/* Paystack Trust Badge */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    opacity: 0.5,
                }}>
                    <BsShieldCheck style={{ color: '#4a2e00', fontSize: '0.85rem' }} />
                        <p style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '0.78rem',
                        color: '#4a2e00',
                        margin: 0,
                        }}>
                            Secured by Paystack
                        </p>
                </div>
                </motion.div>
            </div>
            </div>
        </section>
        <Footer />
        </>
    )
}

export default Checkout