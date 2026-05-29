import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import ProductCard from './ProductCard'
import Jollofrice from '../assets/jollof-rice.jpg'
import Cupcake from '../assets/cup-cake.jpg'
import Strawberry from '../assets/strawberry.jpg'
import ChocolateCake from '../assets/chocolate-cake.jpg' 
import VelvetCake from '../assets/velvet-cake.jpeg'
import WeddingCake from '../assets/wedding-cake.jpg'

const dummyProducts = [
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
        image_url:  Cupcake,
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
    ]

function FeaturedProducts() {
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
                    Made with premium ingredients and expert care — every order is freshly prepared to perfection.
                </p>
            </motion.div>

            {/* Products Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem',
            }}>
                {dummyProducts.map((product, i) => (
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
                        boxShadow: '0 4px 20px rgba(212, 160, 23, 0.3)',
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
        </div>
        </section>
    )
}

export default FeaturedProducts