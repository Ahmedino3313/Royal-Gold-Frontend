import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import ProductCard from './ProductCard'
import { fetchProducts } from '../services/productService'

function FeaturedProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
        try {
            const data = await fetchProducts()
            setProducts(data.slice(0, 6))
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
        }
        load()
    }, [])

    // Don't render section at all if no products
    if (!loading && products.length === 0) return null

    return (
        <section style={{
        backgroundColor: '#fdfaf4',
        padding: '5rem 1.5rem',
        }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            {/* Section Header */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
            <p style={{
                fontFamily: 'Lato, sans-serif',
                color: '#d4a017',
                fontWeight: '700',
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
            }}>
                Our Specialties
            </p>

            <h2 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '800',
                color: '#1c0f00',
                margin: '0 0 1rem',
            }}>
                Featured Products
            </h2>

            <p style={{
                fontFamily: 'Lato, sans-serif',
                color: '#4a2e00',
                fontSize: '1rem',
                maxWidth: '500px',
                margin: '0 auto',
                opacity: 0.8,
                lineHeight: '1.7',
            }}>
                Handcrafted with the finest ingredients — every product is made fresh to order.
            </p>
            </motion.div>

            {/* Loading */}
            {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <p style={{
                    fontFamily: 'Lato, sans-serif',
                    color: '#4a2e00',
                    opacity: 0.6,
                }}>
                    Loading products...
                </p>
            </div>
            ) : (
            <>
                {/* Products Grid */}
                <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem',
                }}>
                    {products.map((product, i) => (
                        <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                        <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center' }}
                >
                <Link
                    to="/shop"
                    style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#d4a017',
                    color: '#1c0f00',
                    padding: '0.9rem 2rem',
                    borderRadius: '100px',
                    textDecoration: 'none',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    letterSpacing: '0.05em',
                    boxShadow: '0 4px 20px rgba(212,160,23,0.3)',
                    transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#b8860b'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = '#d4a017'
                    e.currentTarget.style.transform = 'translateY(0)'
                    }}
                >
                    View All Products <HiArrowRight />
                </Link>
                </motion.div>
            </>
            )}
        </div>
        </section>
    )
}

export default FeaturedProducts