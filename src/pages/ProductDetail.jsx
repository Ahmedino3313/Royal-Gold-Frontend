import { useState,  useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { HiArrowLeft, HiOutlineShoppingCart } from 'react-icons/hi'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { BsStarFill } from 'react-icons/bs'
import { MdVerified } from 'react-icons/md'
import { addToCart } from '../store/slices/cartSlice'
import { fetchProductById } from '../services/productService.js'
import Footer from '../components/Footer'


function ProductDetail() {
    // Product details from API

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await fetchProductById(id)
                setProduct(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadProduct()
        }, [id])

        if (loading) {
        return (
            <section style={{
                minHeight: '100vh',
                backgroundColor: '#fdfaf4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '100px',
            }}>
                <p style={{
                    fontFamily: 'Lato, sans-serif',
                    color: '#4a2e00',
                    opacity: 0.6,
                }}>
                    Loading product...
                </p>
            </section>
        )
    }

    if (!product) {
        return (
            <section style={{
                minHeight: '100vh',
                backgroundColor: '#fdfaf4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '100px',
            }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '1.5rem',
                        color: '#4a2e00',
                        opacity: 0.5,
                        marginBottom: '1.5rem',
                    }}>
                        Product not found
                    </p>
                    
                    <button
                        onClick={() => navigate('/shop')}
                        style={{
                        backgroundColor: '#d4a017',
                        color: '#1c0f00',
                        border: 'none',
                        borderRadius: '100px',
                        padding: '0.85rem 1.8rem',
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: '700',
                        cursor: 'pointer',
                        }}
                    >
                        Back to Shop
                    </button>
                </div>
        </section>
        )
    }

    const handleAddToCart = () => {
        dispatch(addToCart({
            ...product,
            price: Number(product.price),
            quantity,
        }))
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

                    {/* Back Button */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => navigate(-1)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#4a2e00',
                            fontFamily: 'Lato, sans-serif',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            marginBottom: '2rem',
                            opacity: 0.7,
                            transition: 'opacity 0.2s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = 1}
                        onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
                    >
                        <HiArrowLeft /> Back
                    </motion.button>

                    {/* Product Layout */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '3rem',
                        alignItems: 'start',
                    }}>

                        {/* Image */}
                        <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        style={{
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 60px rgba(212,160,23,0.15)',
                            position: 'relative',
                        }}
                        >
                        <img
                            src={product.image_url}
                            alt={product.name}
                            style={{
                                width: '100%',
                                height: '450px',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />

                        {/* Category Badge */}
                        <div style={{
                            position: 'absolute',
                            top: '16px',
                            left: '16px',
                            backgroundColor: '#2e1a00',
                            color: '#d4a017',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            padding: '0.4rem 1rem',
                            borderRadius: '100px',
                        }}>
                            {product.category}
                        </div>
                        </motion.div>

                        {/* Details */}
                        <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            {/* Stars */}
                            <div style={{ display: 'flex', gap: '3px', marginBottom: '0.8rem' }}>
                                {[...Array(5)].map((_, i) => (
                                <BsStarFill key={i} style={{ color: '#d4a017', fontSize: '0.85rem' }} />
                                ))}
                                <span style={{
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '0.82rem',
                                    color: '#4a2e00',
                                    marginLeft: '0.4rem',
                                    opacity: 0.7,
                                }}>
                                    (5.0)
                                </span>
                            </div>

                            {/* Name */}
                            <h1 style={{
                                fontFamily: 'Playfair Display, serif',
                                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                                fontWeight: '800',
                                color: '#1c0f00',
                                margin: '0 0 1rem',
                                lineHeight: '1.2',
                            }}>
                                {product.name}
                            </h1>

                            {/* Price */}
                            <p style={{
                                fontFamily: 'Playfair Display, serif',
                                fontSize: '2rem',
                                fontWeight: '800',
                                color: '#d4a017',
                                margin: '0 0 1.2rem',
                            }}>
                                &#8358;{Number(product.price).toLocaleString()}
                            </p>

                            {/* Description */}
                            <p style={{
                                fontFamily: 'Lato, sans-serif',
                                fontSize: '0.95rem',
                                color: '#4a2e00',
                                lineHeight: '1.8',
                                margin: '0 0 1.5rem',
                                opacity: 0.85,
                            }}>
                                {product.description}
                            </p>

                            {/* Stock */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '1.8rem',
                            }}>
                                <MdVerified style={{ color: '#16a34a', fontSize: '1rem' }} />

                                <span style={{
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '0.85rem',
                                    color: '#16a34a',
                                    fontWeight: '700',
                                }}>
                                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                </span>
                            </div>

                            {/* Quantity Selector */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <p style={{
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    color: '#1c0f00',
                                    marginBottom: '0.6rem',
                                }}>
                                    Quantity
                                </p>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem',
                                    backgroundColor: '#fff8e7',
                                    borderRadius: '100px',
                                    padding: '0.4rem 0.8rem',
                                    border: '2px solid rgba(212,160,23,0.25)',
                                    width: 'fit-content',
                                }}>
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#1c0f00',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '0.3rem',
                                        fontSize: '1rem',
                                        }}
                                    >
                                        <HiMinus />
                                    </button>

                                    <span style={{
                                        fontFamily: 'Playfair Display, serif',
                                        fontWeight: '800',
                                        color: '#1c0f00',
                                        fontSize: '1.1rem',
                                        minWidth: '28px',
                                        textAlign: 'center',
                                    }}>
                                        {quantity}
                                    </span>

                                    <button
                                        onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                                        style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#1c0f00',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '0.3rem',
                                        fontSize: '1rem',
                                        }}
                                    >
                                        <HiPlus />
                                    </button>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={handleAddToCart}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    backgroundColor: '#d4a017',
                                    color: '#1c0f00',
                                    border: 'none',
                                    borderRadius: '100px',
                                    padding: '0.9rem 2rem',
                                    fontFamily: 'Lato, sans-serif',
                                    fontWeight: '700',
                                    fontSize: '0.95rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 20px rgba(212,160,23,0.3)',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b8860b'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d4a017'}
                                >
                                    <HiOutlineShoppingCart /> Add to Cart
                                </motion.button>

                                <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={() => {
                                    handleAddToCart()
                                    navigate('/cart')
                                }}
                                style={{
                                    backgroundColor: '#1c0f00',
                                    color: '#fff8e7',
                                    border: 'none',
                                    borderRadius: '100px',
                                    padding: '0.9rem 2rem',
                                    fontFamily: 'Lato, sans-serif',
                                    fontWeight: '700',
                                    fontSize: '0.95rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2e1a00'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1c0f00'}
                                >
                                    Buy Now
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        <Footer />
        </>
    )
}

export default ProductDetail