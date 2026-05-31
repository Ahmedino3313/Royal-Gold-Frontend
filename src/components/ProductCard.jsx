import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { BsStarFill } from 'react-icons/bs'
import { addToCart } from '../store/slices/cartSlice'

function ProductCard({ product }) {
    const dispatch = useDispatch()

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            style={{
                backgroundColor: '#fff8e7',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(28,15,0,0.08)',
                transition: 'box-shadow 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,160,23,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(28,15,0,0.08)' }}
            >
                {/* Image: clicking this goes to product detail */}
                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ position: 'relative', overflow: 'hidden', height: '220px', cursor: 'pointer' }}>
                        <img
                            src={product.image_url}
                            alt={product.name}
                            style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.4s ease',
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        />

                        {/* Category badge */}
                        <div style={{
                            position: 'absolute',
                            top: '12px',
                            left: '12px',
                            backgroundColor: '#2e1a00',
                            color: '#d4a017',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '0.7rem',
                            fontWeight: '700',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '100px',
                        }}>
                            {product.category}
                        </div>
                    </div>
                </Link>

                {/* Content */}
                <div style={{ padding: '1.2rem' }}>

                    {/* Stars */}
                    <div style={{ display: 'flex', gap: '2px', marginBottom: '0.5rem' }}>
                        {[...Array(5)].map((_, i) => (
                            <BsStarFill key={i} style={{ color: '#d4a017', fontSize: '0.7rem' }} />
                        ))}
                    </div>

                    {/* Name — clicking this also goes to product detail */}
                    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                        <h3 style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            color: '#1c0f00',
                            margin: '0 0 0.4rem',
                            cursor: 'pointer',
                        }}>
                            {product.name}
                        </h3>
                    </Link>

                    {/* Description */}
                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '0.82rem',
                        color: '#4a2e00',
                        margin: '0 0 1rem',
                        lineHeight: '1.5',
                        opacity: 0.8,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}>
                        {product.description}
                    </p>

                    {/* Price */}
                    <p style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '1.2rem',
                        fontWeight: '800',
                        color: '#d4a017',
                        margin: '0 0 1rem',
                    }}>
                        &#8358;{Number(product.price).toLocaleString()}
                    </p>

                    {/* Buttons Row */}
                    <div style={{ display: 'flex', gap: '0.6rem' }}>

                    {/* View Details */}
                    <Link
                        to={`/products/${product.id}`}
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.55rem 0.8rem',
                            borderRadius: '100px',
                            border: '2px solid #1c0f00',
                            color: '#1c0f00',
                            textDecoration: 'none',
                            fontFamily: 'Lato, sans-serif',
                            fontWeight: '700',
                            fontSize: '0.78rem',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#1c0f00'
                            e.currentTarget.style.color = '#fff8e7'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.color = '#1c0f00'
                        }}
                    >
                        View Details
                    </Link>

                    {/* Add to Cart */}
                    <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={() => dispatch(addToCart({
                        ...product,
                        price: Number(product.price),
                        }))}
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            backgroundColor: '#1c0f00',
                            color: '#fff8e7',
                            border: 'none',
                            borderRadius: '100px',
                            padding: '0.55rem 0.8rem',
                            fontFamily: 'Lato, sans-serif',
                            fontWeight: '700',
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d4a017'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1c0f00'}
                    >
                        <HiOutlineShoppingCart />
                        Add to Cart
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard