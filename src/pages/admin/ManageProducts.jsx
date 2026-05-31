import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPlus, HiOutlineTrash, HiOutlinePencil, HiX } from 'react-icons/hi'
import api from '../../services/api'
import toast from 'react-hot-toast'
import useImageUpload from '../../hooks/useImageUpload.js'
import { HiOutlinePhotograph } from 'react-icons/hi'

const emptyForm = {
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: 'Cakes',
    stock: '',
}

const categories = ['Cakes', 'Cupcakes', 'Cuisine', 'Wedding', 'Snacks', 'Drinks']

function ManageProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [submitting, setSubmitting] = useState(false)
    const { uploadImage, uploading, preview, setPreview, resetPreview } = useImageUpload()

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products')
            setProducts(res.data)
        } catch (err) {
            toast.error('Failed to load products')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleChange = (e) => {
        const sanitized = e.target.value
        .replace(/[<>"'`]/g, '')
        .trimStart()
        setForm(prev => ({ ...prev, [e.target.name]: sanitized }))
    }

    // openAddModal reset preview:
    const openAddModal = () => {
    setEditingProduct(null)
    setForm(emptyForm)
    resetPreview()
    setShowModal(true)
    }

    // openEditModal set preview:
    const openEditModal = (product) => {
    setEditingProduct(product)
    setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.image_url,
        category: product.category,
        stock: product.stock,
    })
    setPreview(product.image_url || '')
    setShowModal(true)
    }

    const handleSubmit = async () => {
        if (!form.name || !form.price || !form.stock) {
        toast.error('Name, price and stock are required')
        return
        }
        setSubmitting(true)
        try {
        if (editingProduct) {
            await api.put(`/products/${editingProduct.id}`, form)
            toast.success('Product updated successfully')
        } else {
            await api.post('/products', form)
            toast.success('Product added successfully')
        }
        setShowModal(false)
        fetchProducts()
        } catch (err) {
        toast.error(err.response?.data?.message || 'Something went wrong')
        } finally {
        setSubmitting(false)
        }
    }

    const handleDelete = async (product) => {
        if (!window.confirm(`Delete "${product.name}"?`)) return
        try {
        await api.delete(`/products/${product.id}`)
        toast.success('Product deleted')
        fetchProducts()
        } catch (err) {
        toast.error('Failed to delete product')
        }
    }

    const inputStyle = {
        width: '100%',
        padding: '0.8rem 1rem',
        borderRadius: '10px',
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
        fontSize: '0.82rem',
        fontWeight: '700',
        color: '#1c0f00',
        display: 'block',
        marginBottom: '0.35rem',
    }

    return (
        <div>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
            }}>
                <p style={{
                    fontFamily: 'Lato, sans-serif',
                    color: '#4a2e00',
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    margin: 0,
                }}>
                    {products.length} product{products.length !== 1 ? 's' : ''} in database
                </p>

                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={openAddModal}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: '#d4a017',
                        color: '#1c0f00',
                        border: 'none',
                        borderRadius: '100px',
                        padding: '0.7rem 1.5rem',
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(212,160,23,0.3)',
                    }}
                >
                    <HiPlus /> Add Product
                </motion.button>
            </div>

            {/* Loading */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ fontFamily: 'Lato, sans-serif', color: '#4a2e00', opacity: 0.6 }}>
                        Loading products...
                    </p>
                </div>
                ) : products.length === 0 ? (
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
                            marginBottom: '1rem',
                        }}>
                            No products yet
                        </p>

                        <button
                            onClick={openAddModal}
                            style={{
                            backgroundColor: '#d4a017',
                            color: '#1c0f00',
                            border: 'none',
                            borderRadius: '100px',
                            padding: '0.7rem 1.5rem',
                            fontFamily: 'Lato, sans-serif',
                            fontWeight: '700',
                            cursor: 'pointer',
                            }}
                        >
                            Add your first product
                        </button>
                    </div>
                ) : (

                /* Products Table */
                <div style={{
                    backgroundColor: '#fff8e7',
                    borderRadius: '20px',
                    border: '1px solid rgba(212,160,23,0.15)',
                    overflow: 'hidden',
                }}>

                    {/* Table Header */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '60px 1fr 120px 100px 80px 100px',
                        gap: '1rem',
                        padding: '1rem 1.5rem',
                        backgroundColor: '#2e1a00',
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        color: 'rgba(255,248,231,0.6)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                    }}>
                        <span>Image</span>
                        <span>Product</span>
                        <span>Category</span>
                        <span>Price</span>
                        <span>Stock</span>
                        <span>Actions</span>
                    </div>

                    {/* Table Rows */}
                    {products.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '60px 1fr 120px 100px 80px 100px',
                                gap: '1rem',
                                padding: '1rem 1.5rem',
                                alignItems: 'center',
                                borderBottom: i < products.length - 1
                                ? '1px solid rgba(212,160,23,0.1)'
                                : 'none',
                                transition: 'background 0.2s ease',
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(212,160,23,0.04)'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            {/* Image */}
                            <img
                                src={product.image_url || 'https://placehold.co/60x60/fff8e7/d4a017?text=No+Img'}
                                alt={product.name}
                                style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '10px',
                                objectFit: 'cover',
                                }}
                            />

                            {/* Name + Description */}
                            <div>
                                <p style={{
                                    fontFamily: 'Lato, sans-serif',
                                    fontWeight: '700',
                                    color: '#1c0f00',
                                    fontSize: '0.9rem',
                                    margin: '0 0 0.2rem',
                                }}>
                                    {product.name}
                                </p>

                                <p style={{
                                    fontFamily: 'Lato, sans-serif',
                                    fontSize: '0.78rem',
                                    color: '#4a2e00',
                                    margin: 0,
                                    opacity: 0.6,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '200px',
                                }}>
                                    {product.description}
                                </p>
                            </div>

                            {/* Category */}
                            <span style={{
                                backgroundColor: 'rgba(212,160,23,0.1)',
                                color: '#b8860b',
                                fontFamily: 'Lato, sans-serif',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                padding: '0.25rem 0.7rem',
                                borderRadius: '100px',
                                width: 'fit-content',
                            }}>
                                {product.category}
                            </span>

                            {/* Price */}
                            <span style={{
                                fontFamily: 'Playfair Display, serif',
                                fontWeight: '800',
                                color: '#d4a017',
                                fontSize: '0.95rem',
                            }}>
                                &#8358;{Number(product.price).toLocaleString()}
                            </span>

                            {/* Stock */}
                            <span style={{
                                fontFamily: 'Lato, sans-serif',
                                fontWeight: '700',
                                fontSize: '0.88rem',
                                color: product.stock > 5 ? '#16a34a' : product.stock > 0 ? '#d97706' : '#dc2626',
                            }}>
                                {product.stock}
                            </span>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => openEditModal(product)}
                                    style={{
                                        width: '34px',
                                        height: '34px',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(212,160,23,0.3)',
                                        backgroundColor: 'rgba(212,160,23,0.08)',
                                        color: '#d4a017',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(212,160,23,0.2)'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(212,160,23,0.08)'}
                                >
                                    <HiOutlinePencil />
                                </button>

                                <button
                                    onClick={() => handleDelete(product)}
                                    style={{
                                        width: '34px',
                                        height: '34px',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(220,38,38,0.3)',
                                        backgroundColor: 'rgba(220,38,38,0.08)',
                                        color: '#dc2626',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.2)'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.08)'}
                                >
                                    <HiOutlineTrash />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                zIndex: 100,
                            }}
                        />

                        {/* Modal */}
                        <div style={{
                            position: 'fixed',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 101,
                            padding: '1rem',
                        }}>
                            {/* Modal */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                backgroundColor: '#fff8e7',
                                borderRadius: '24px',
                                padding: '2rem',
                                width: '100%',
                                maxWidth: '520px',
                                maxHeight: '85vh',
                                overflowY: 'auto',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                                WebkitOverflowScrolling: 'touch',
                                position: 'relative',
                                }}
                            >
                                {/* Modal Header */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '1.5rem',
                                }}>
                                    <h2 style={{
                                        fontFamily: 'Playfair Display, serif',
                                        fontSize: '1.3rem',
                                        fontWeight: '800',
                                        color: '#1c0f00',
                                        margin: 0,
                                    }}>
                                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                                    </h2>

                                    <button
                                        onClick={() => setShowModal(false)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#4a2e00',
                                            fontSize: '1.3rem',
                                            opacity: 0.6,
                                        }}
                                    >
                                        <HiX />
                                    </button>
                                </div>

                                {/* Form */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                                    {/* Name */}
                                    <div>
                                        <label style={labelStyle}>Product Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="e.g Royal Chocolate Cake"
                                            style={inputStyle}
                                            onFocus={e => e.currentTarget.style.borderColor = '#d4a017'}
                                            onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.25)'}
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label style={labelStyle}>Description</label>
                                        <textarea
                                            name="description"
                                            value={form.description}
                                            onChange={handleChange}
                                            placeholder="Describe this product..."
                                            rows={3}
                                            style={{ ...inputStyle, resize: 'none', lineHeight: '1.6' }}
                                            onFocus={e => e.currentTarget.style.borderColor = '#d4a017'}
                                            onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.25)'}
                                        />
                                    </div>

                                    {/* Price + Stock */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div>
                                            <label style={labelStyle}>Price (&#8358;)</label>

                                            <input
                                            type="number"
                                            name="price"
                                            value={form.price}
                                            onChange={handleChange}
                                            placeholder="e.g 15000"
                                            style={inputStyle}
                                            onFocus={e => e.currentTarget.style.borderColor = '#d4a017'}
                                            onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.25)'}
                                            />

                                        </div>

                                        <div>
                                            <label style={labelStyle}>Stock</label>
                                            <input
                                                type="number"
                                                name="stock"
                                                value={form.stock}
                                                onChange={handleChange}
                                                placeholder="e.g 10"
                                                style={inputStyle}
                                                onFocus={e => e.currentTarget.style.borderColor = '#d4a017'}
                                                onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.25)'}
                                            />
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label style={labelStyle}>Category</label>
                                        <select
                                            name="category"
                                            value={form.category}
                                            onChange={handleChange}
                                            style={{ ...inputStyle, cursor: 'pointer' }}
                                            onFocus={e => e.currentTarget.style.borderColor = '#d4a017'}
                                            onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.25)'}
                                        >
                                            {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Image Upload */}
                                    <div>
                                        <label style={labelStyle}>Product Image</label>

                                        {/* Upload Area */}
                                        <label
                                            htmlFor="image-upload"
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem',
                                                padding: '1.5rem',
                                                borderRadius: '12px',
                                                border: '2px dashed rgba(212,160,23,0.4)',
                                                backgroundColor: 'rgba(212,160,23,0.04)',
                                                cursor: uploading ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.3s ease',
                                                marginBottom: '0.5rem',
                                            }}
                                            onMouseEnter={e => {
                                            if (!uploading)
                                                e.currentTarget.style.backgroundColor = 'rgba(212,160,23,0.08)'
                                            }}
                                            onMouseLeave={e => {
                                            e.currentTarget.style.backgroundColor = 'rgba(212,160,23,0.04)'
                                            }}
                                        >
                                            <HiOutlinePhotograph style={{ color: '#d4a017', fontSize: '1.8rem' }} />
                                            <p style={{
                                                fontFamily: 'Lato, sans-serif',
                                                fontSize: '0.85rem',
                                                color: '#4a2e00',
                                                margin: 0,
                                                fontWeight: '600',
                                            }}>
                                                {uploading ? 'Uploading...' : 'Click to upload image'}
                                            </p>

                                            <p style={{
                                                fontFamily: 'Lato, sans-serif',
                                                fontSize: '0.75rem',
                                                color: '#4a2e00',
                                                margin: 0,
                                                opacity: 0.5,
                                            }}>
                                                JPEG, JPG, PNG or WEBP — max 5MB
                                            </p>

                                            <input
                                                id="image-upload"
                                                type="file"
                                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                                style={{ display: 'none' }}
                                                disabled={uploading}
                                                onChange={async (e) => {
                                                    const file = e.target.files[0]
                                                    if (!file) return
                                                    const url = await uploadImage(file)
                                                    if (url) {
                                                    setForm(prev => ({ ...prev, image_url: url }))
                                                    }
                                                }}
                                            />
                                        </label>

                                        {/* Preview */}
                                        {(preview || form.image_url) && (
                                            <div style={{ position: 'relative' }}>
                                                <img
                                                    src={preview || form.image_url}
                                                    alt="preview"
                                                    style={{
                                                    width: '100%',
                                                    height: '160px',
                                                    objectFit: 'cover',
                                                    borderRadius: '10px',
                                                    border: '2px solid rgba(212,160,23,0.2)',
                                                    }}
                                                    onError={e => e.currentTarget.style.display = 'none'}
                                                />

                                                {/* Remove image button */}
                                                <button
                                                    onClick={() => {
                                                    setPreview('')
                                                    setForm(prev => ({ ...prev, image_url: '' }))
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '8px',
                                                        right: '8px',
                                                        width: '28px',
                                                        height: '28px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#dc2626',
                                                        border: 'none',
                                                        color: '#fff',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '0.9rem',
                                                    }}
                                                >
                                                    <HiX />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handleSubmit}
                                        disabled={submitting}
                                        style={{
                                            width: '100%',
                                            padding: '0.95rem',
                                            borderRadius: '12px',
                                            border: 'none',
                                            backgroundColor: submitting ? 'rgba(212,160,23,0.5)' : '#d4a017',
                                            color: '#1c0f00',
                                            fontFamily: 'Lato, sans-serif',
                                            fontWeight: '700',
                                            fontSize: '1rem',
                                            cursor: submitting ? 'not-allowed' : 'pointer',
                                            marginTop: '0.5rem',
                                            transition: 'background 0.3s ease',
                                        }}
                                    >
                                        {submitting
                                            ? 'Saving...'
                                            : editingProduct ? 'Update Product' : 'Add Product'}
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ManageProducts