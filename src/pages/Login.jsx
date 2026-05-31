import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineMail, HiOutlineLockClosed, HiEye, HiEyeOff } from 'react-icons/hi'
import { GiCakeSlice } from 'react-icons/gi'
import { login } from '../store/slices/authSlice.js'
import toast from 'react-hot-toast'


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.auth)
    const [showPassword, setShowPassword] = useState(false)
    const [form, setForm] = useState({ email: '', password: '' })

    const handleChange = (e) => {
        const sanitized = e.target.value
        .replace(/[<>"'`]/g, '')
        .trimStart()
        setForm(prev => ({ ...prev, [e.target.name]: sanitized }))
    }

    const handleSubmit = async () => {
        if (!form.email || !form.password) {
            toast.error('Email and password are required')
            return
        }

        if (form.password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        const result = await dispatch(login(form))

        if (login.fulfilled.match(result)) {
            navigate('/')
        }
    }

    return (
        <section style={{
            minHeight: '100vh',
            backgroundColor: '#fdfaf4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1.5rem',
            paddingTop: '120px',
            }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                backgroundColor: '#fff8e7',
                borderRadius: '24px',
                padding: '2.5rem',
                width: '100%',
                maxWidth: '440px',
                boxShadow: '0 8px 40px rgba(28,15,0,0.1)',
                border: '1px solid rgba(212,160,23,0.15)',
                }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <GiCakeSlice style={{ color: '#d4a017', fontSize: '2rem', marginBottom: '0.5rem' }} />
                    <h1 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '1.8rem',
                        fontWeight: '800',
                        color: '#1c0f00',
                        margin: '0 0 0.3rem',
                    }}>
                        Welcome Back
                    </h1>
                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        color: '#4a2e00',
                        fontSize: '0.9rem',
                        opacity: 0.7,
                        margin: 0,
                    }}>
                        Sign in to your Royal Gold account
                    </p>
                </div>

                {/* Email Field */}
                <div style={{ marginBottom: '1.2rem' }}>
                    <label style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        color: '#1c0f00',
                        display: 'block',
                        marginBottom: '0.4rem',
                        letterSpacing: '0.03em',
                    }}>
                        Email Address
                    </label>
                    <div style={{ position: 'relative' }}>
                        <HiOutlineMail style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#d4a017',
                        fontSize: '1.1rem',
                        }} />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            style={{
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
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = '#d4a017'}
                            onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.25)'}
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div style={{ marginBottom: '1.8rem' }}>
                    <label style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        color: '#1c0f00',
                        display: 'block',
                        marginBottom: '0.4rem',
                        letterSpacing: '0.03em',
                    }}>
                        Password
                    </label>
                    <div style={{ position: 'relative' }}>
                        <HiOutlineLockClosed style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#d4a017',
                        fontSize: '1.1rem',
                        }} />
                        <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        style={{
                            width: '100%',
                            padding: '0.85rem 3rem 0.85rem 2.8rem',
                            borderRadius: '12px',
                            border: '2px solid rgba(212,160,23,0.25)',
                            backgroundColor: '#fdfaf4',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '0.9rem',
                            color: '#1c0f00',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.3s ease',
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = '#d4a017'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.25)'}
                        />
                        <button
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#4a2e00',
                            fontSize: '1.1rem',
                            opacity: 0.6,
                        }}
                        >
                        {showPassword ? <HiEyeOff /> : <HiEye />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '0.95rem',
                        borderRadius: '12px',
                        border: 'none',
                        backgroundColor: loading ? 'rgba(212,160,23,0.5)' : '#d4a017',
                        color: '#1c0f00',
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: '700',
                        fontSize: '1rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        letterSpacing: '0.05em',
                        transition: 'background 0.3s ease',
                        marginBottom: '1.5rem',
                    }}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </motion.button>

                {/* Divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                    }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(212,160,23,0.2)' }} />
                    <span style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '0.8rem',
                        color: '#4a2e00',
                        opacity: 0.6,
                    }}>
                        Don't have an account?
                    </span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(212,160,23,0.2)' }} />
                </div>

                {/* Register Link */}
                <Link
                    to="/register"
                    style={{
                        display: 'block',
                        textAlign: 'center',
                        padding: '0.9rem',
                        borderRadius: '12px',
                        border: '2px solid #1c0f00',
                        color: '#1c0f00',
                        textDecoration: 'none',
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: '700',
                        fontSize: '0.95rem',
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
                    Create an Account
                </Link>
            </motion.div>
        </section>
    )
}

export default Login