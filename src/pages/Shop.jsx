import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

const categories = ['All', 'Cakes', 'Cupcakes', 'Cuisine', 'Wedding', 'Snacks', 'Drinks']

function Shop() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('All')
    const [search, setSearch] = useState('')

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts()
                setProducts(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadProducts()
    }, [])

    const filtered = products.filter(p => {
        const matchCategory = activeCategory === 'All' || p.category === activeCategory
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
        return matchCategory && matchSearch
    })

    return (
        <>
            <section style={{
                minHeight: '100vh',
                backgroundColor: '#fdfaf4',
                paddingTop: '100px',
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>

                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
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
                            Browse & Order
                        </p>

                        <h1 style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            fontWeight: '800',
                            color: '#1c0f00',
                            margin: '0 0 1rem',
                        }}>
                            Our Products
                        </h1>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ maxWidth: '480px', margin: '0 auto 2rem' }}
                    >
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={e => {
                                const sanitized = e.target.value
                                .replace(/[^a-zA-Z0-9\s]/g, '')
                                .trimStart()
                                setSearch(sanitized)
                            }}
                            style={{
                                width: '100%',
                                padding: '0.85rem 1.5rem',
                                borderRadius: '100px',
                                border: '2px solid rgba(212,160,23,0.3)',
                                backgroundColor: '#fff8e7',
                                fontFamily: 'Lato, sans-serif',
                                fontSize: '0.9rem',
                                color: '#1c0f00',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.3s ease',
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = '#d4a017'}
                            onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.3)'}
                        />
                    </motion.div>

                    {/* Category Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            display: 'flex',
                            gap: '0.7rem',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            marginBottom: '3rem',
                        }}
                    >
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                padding: '0.5rem 1.3rem',
                                borderRadius: '100px',
                                border: '2px solid',
                                borderColor: activeCategory === cat ? '#d4a017' : 'rgba(212,160,23,0.25)',
                                backgroundColor: activeCategory === cat ? '#d4a017' : 'transparent',
                                color: activeCategory === cat ? '#1c0f00' : '#4a2e00',
                                fontFamily: 'Lato, sans-serif',
                                fontWeight: '700',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                letterSpacing: '0.05em',
                                transition: 'all 0.3s ease',
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>

                    {/* Loading */}
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <p style={{
                                fontFamily: 'Lato, sans-serif',
                                color: '#4a2e00',
                                opacity: 0.6,
                            }}>
                                Loading products...
                            </p>
                        </div>

                    ) : filtered.length === 0 ? (
                        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ textAlign: 'center', padding: '4rem 0' }}
                        >
                            <p style={{
                                fontFamily: 'Playfair Display, serif',
                                color: '#4a2e00',
                                fontSize: '1.3rem',
                                opacity: 0.6,
                            }}>
                                No products found
                            </p>
                    </motion.div>

                    ) : (
                        <>
                            <p style={{
                                fontFamily: 'Lato, sans-serif',
                                color: '#4a2e00',
                                fontSize: '0.88rem',
                                marginBottom: '1.5rem',
                                opacity: 0.7,
                            }}>
                                Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
                            </p>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: '1.5rem',
                            }}>
                                {filtered.map((product, i) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.08 }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Shop