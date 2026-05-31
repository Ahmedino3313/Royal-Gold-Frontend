import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineTrash, HiArrowRight, HiArrowLeft } from 'react-icons/hi'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../store/slices/cartSlice.js'
import Footer from '../components/Footer'

function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { items } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    const subtotal = items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
    const shippingFee = items.length > 0 ? 1500 : 0
    const total = subtotal + shippingFee

    const handleCheckout = () => {
        if (!user) {
        navigate('/login')
        return
        }
        navigate('/checkout')
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
                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        color: '#d4a017',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        marginBottom: '0.3rem',
                    }}>
                        Review Your Order
                    </p>

                    <h1 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                        fontWeight: '800',
                        color: '#1c0f00',
                        margin: 0,
                    }}>
                        Your Cart
                    </h1>
                </motion.div>

                {/* Empty Cart */}
                {items.length === 0 ? (
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
                            Your cart is empty
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
                            <HiArrowLeft /> Browse Products
                        </Link>
                    </motion.div>
                ) : (
                    <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            gap: '2rem',
                        }}
                        className="lg:grid-cols-[1fr_360px]"
                    >
                        {/* Cart Items */}
                        <div>
                            <AnimatePresence>
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30, height: 0 }}
                                        transition={{ duration: 0.35 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1.2rem',
                                            backgroundColor: '#fff8e7',
                                            borderRadius: '16px',
                                            padding: '1.2rem',
                                            marginBottom: '1rem',
                                            border: '1px solid rgba(212,160,23,0.15)',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        {/* Image */}
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                borderRadius: '12px',
                                                objectFit: 'cover',
                                                flexShrink: 0,
                                            }}
                                        />

                                        {/* Details */}
                                        <div style={{ flex: 1, minWidth: '150px' }}>
                                            <p style={{
                                                fontFamily: 'Playfair Display, serif',
                                                fontWeight: '700',
                                                color: '#1c0f00',
                                                fontSize: '1rem',
                                                margin: '0 0 0.2rem',
                                            }}>
                                                {item.name}
                                            </p>

                                            <p style={{
                                                fontFamily: 'Lato, sans-serif',
                                                color: '#d4a017',
                                                fontWeight: '700',
                                                fontSize: '0.95rem',
                                                margin: 0,
                                            }}>
                                                &#8358;{(Number(item.price) * item.quantity).toLocaleString()}
                                            </p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.6rem',
                                            backgroundColor: '#fdfaf4',
                                            borderRadius: '100px',
                                            padding: '0.3rem 0.6rem',
                                            border: '1px solid rgba(212,160,23,0.2)',
                                        }}>
                                            <button
                                                onClick={() => dispatch(decreaseQuantity(item.id))}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: '#1c0f00',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '0.2rem',
                                                }}
                                            >
                                                <HiMinus />
                                            </button>

                                            <span style={{
                                                fontFamily: 'Lato, sans-serif',
                                                fontWeight: '700',
                                                color: '#1c0f00',
                                                fontSize: '0.95rem',
                                                minWidth: '20px',
                                                textAlign: 'center',
                                            }}>
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => dispatch(increaseQuantity(item.id))}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: '#1c0f00',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '0.2rem',
                                                }}
                                                >
                                                <HiPlus />
                                            </button>
                                        </div>

                                        {/* Item Total */}
                                        <p style={{
                                            fontFamily: 'Playfair Display, serif',
                                            fontWeight: '800',
                                            color: '#1c0f00',
                                            fontSize: '1rem',
                                            margin: 0,
                                            minWidth: '90px',
                                            textAlign: 'right',
                                        }}>
                                             &#8358;{(item.price * item.quantity).toLocaleString()}
                                        </p>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: '#dc2626',
                                                fontSize: '1.1rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                opacity: 0.7,
                                                transition: 'opacity 0.2s ease',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.opacity = 1}
                                            onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
                                        >
                                            <HiOutlineTrash />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Clear Cart */}
                            <button
                                onClick={() => dispatch(clearCart())}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#dc2626',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    opacity: 0.7,
                                    marginTop: '0.5rem',
                                    transition: 'opacity 0.2s ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                                onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
                            >
                                Clear Cart
                            </button>
                        </div>

                        {/* Order Summary */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{
                                backgroundColor: '#fff8e7',
                                borderRadius: '20px',
                                padding: '1.8rem',
                                border: '1px solid rgba(212,160,23,0.15)',
                                height: 'fit-content',
                                position: 'sticky',
                                top: '100px',
                            }}
                        >
                            <h2 style={{
                                fontFamily: 'Playfair Display, serif',
                                fontSize: '1.3rem',
                                fontWeight: '800',
                                color: '#1c0f00',
                                margin: '0 0 1.5rem',
                            }}>
                                Order Summary
                            </h2>

                            {/* Summary Lines */}
                            {[
                                { label: 'Subtotal', value: ` ₦${subtotal.toLocaleString()}` },
                                { label: 'Shipping Fee', value: ` ₦${shippingFee.toLocaleString()}` },
                            ].map(line => (
                                <div key={line.label} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '0.8rem',
                                }}>
                                    <span style={{
                                        fontFamily: 'Lato, sans-serif',
                                        color: '#4a2e00',
                                        fontSize: '0.9rem',
                                        opacity: 0.8,
                                    }}>
                                    {line.label}
                                    </span>

                                    <span style={{
                                        fontFamily: 'Lato, sans-serif',
                                        fontWeight: '700',
                                        color: '#1c0f00',
                                        fontSize: '0.9rem',
                                    }}>
                                    {line.value}
                                    </span>
                                </div>
                            ))}

                            {/* Divider */}
                            <div style={{
                                borderTop: '1px solid rgba(212,160,23,0.2)',
                                margin: '1rem 0',
                            }} />

                            {/* Total */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '1.5rem',
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

                            {/* Checkout Button */}
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={handleCheckout}
                                style={{
                                    width: '100%',
                                    padding: '0.95rem',
                                    borderRadius: '12px',
                                    border: 'none',
                                    backgroundColor: '#d4a017',
                                    color: '#1c0f00',
                                    fontFamily: 'Lato, sans-serif',
                                    fontWeight: '700',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '1rem',
                                    transition: 'background 0.3s ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b8860b'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d4a017'}
                            >
                                Proceed to Checkout <HiArrowRight />
                            </motion.button>

                            {/* Continue Shopping */}
                            <Link
                                to="/shop"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    color: '#4a2e00',
                                    textDecoration: 'none',
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '0.88rem',
                                    fontWeight: '600',
                                    opacity: 0.7,
                                    transition: 'opacity 0.2s ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                                onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
                            >
                                <HiArrowLeft /> Continue Shopping
                            </Link>
                        </motion.div>
                    </div>
                )}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Cart