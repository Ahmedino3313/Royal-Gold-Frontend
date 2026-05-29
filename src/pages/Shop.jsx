import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import ChocolateCake from '../assets/chocolate-cake.jpg' 
import VelvetCake from '../assets/velvet-cake.jpeg'
import Strawberry from '../assets/strawberry.jpg'
import Jollofrice from '../assets/jollof-rice.jpg'
import Cupcake from '../assets/cup-cake.jpg'
import WeddingCake from '../assets/wedding-cake.jpg'
import Smallchops from '../assets/small-chops.jpeg'
import Birthdaycake from '../assets/birthday-cake.jpg'
import ChinChin from '../assets/chin-chin.jpeg'
import Zobo from '../assets/zobo.jpg'
import Tigernut from '../assets/tiger-nut.jpeg'
import Footer from '../components/Footer'

const allProducts = [
    {
        id: 1,
        name: 'Royal Chocolate Cake',
        description: 'A rich and moist chocolate cake layered with velvety ganache, fit for royalty.',
        price: 15000,
        image_url: ChocolateCake,
        category: 'Cakes',
    },
    {
        id: 2,
        name: 'Gold Velvet Cake',
        description: 'A stunning gold velvet cake with cream cheese frosting and edible gold dust.',
        price: 18000,
        image_url: VelvetCake,
        category: 'Cakes',
    },
    {
        id: 3,
        name: 'Strawberry Delight',
        description: 'Fresh strawberry layers with whipped cream and a buttery sponge base.',
        price: 12000,
        image_url: Strawberry,
        category: 'Cakes',
    },
    {
        id: 4,
        name: 'Royal Jollof Rice',
        description: 'Perfectly smoky party jollof rice cooked with rich tomato base and spices.',
        price: 8000,
        image_url: Jollofrice,
        category: 'Cuisine',
    },
    {
        id: 5,
        name: 'Luxury Cupcake Box',
        description: 'A box of 6 premium cupcakes with gold-themed frosting and toppings.',
        price: 9500,
        image_url: Cupcake,
        category: 'Cupcakes',
    },
    {
        id: 6,
        name: 'Wedding Tier Cake',
        description: 'Elegant 3-tier wedding cake customized with your colors and floral design.',
        price: 45000,
        image_url: WeddingCake,
        category: 'Wedding',
    },
    {
        id: 7,
        name: 'Small Chops Platter',
        description: 'A premium assorted small chops platter perfect for events and parties.',
        price: 12000,
        image_url: Smallchops,
        category: 'Cuisine',
    },
    {
        id: 8,
        name: 'Birthday Cake',
        description: 'Colorful and fun birthday cake customized with name, age and your favorite theme.',
        price: 14000,
        image_url: Birthdaycake ,
        category: 'Cakes',
    },
    {
        id: 9,
        name: 'Chin Chin Box',
        description: 'Crunchy homemade chin chin in a premium box. Perfect as a gift or snack.',
        price: 3500,
        image_url: ChinChin,
        category: 'Snacks',
    },
    {
    id: 10,
    name: 'Zobo Drink',
    description: 'Freshly brewed hibiscus zobo drink with ginger, cloves and natural sweeteners. Served chilled.',
    price: 1500,
    image_url: Zobo,
    category: 'Drinks',
    },
    {
    id: 11,
    name: 'Tiger Nut Drink',
    description: 'Creamy and naturally sweet tiger nut milk, freshly made with dates and coconut.',
    price: 2000,
    image_url: Tigernut,
    category: 'Drinks',
    },
]

    const categories = ['All', 'Cakes', 'Cupcakes', 'Cuisine', 'Wedding', 'Snacks', 'Drinks']

function Shop() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [search, setSearch] = useState('')

    const filtered = allProducts.filter(p => {
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

                    {/* Results Count */}
                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        color: '#4a2e00',
                        fontSize: '0.88rem',
                        marginBottom: '1.5rem',
                        opacity: 0.7,
                    }}>
                        Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
                    </p>

                    {/* Products Grid */}
                    {filtered.length === 0 ? (
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
                    )}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Shop