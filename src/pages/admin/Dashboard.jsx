import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  MdOutlineReceipt,
  MdOutlineInventory,
  MdLogout,
  MdMenu,
  MdClose,
} from 'react-icons/md'
import { BsBoxSeam } from 'react-icons/bs'
import { logout } from '../../store/slices/authSlice'
import toast from 'react-hot-toast'
import ManageProducts from './ManageProducts'
import ManageOrders from './ManageOrders'
import logo from '../../assets/logo.png'

const navItems = [
  { id: 'products', label: 'Manage Products', icon: <MdOutlineInventory /> },
  { id: 'orders', label: 'Manage Orders', icon: <MdOutlineReceipt /> },
]

function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const [activeTab, setActiveTab] = useState('products')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
    navigate('/')
  }

  const SidebarContent = () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* Logo */}
      <div style={{ marginBottom: '2rem' }}>
        <img
          src={logo}
          alt="Royal Gold"
          style={{ height: '45px', width: 'auto' }}
        />
        <p style={{
          fontFamily: 'Lato, sans-serif',
          color: 'rgba(255,248,231,0.4)',
          fontSize: '0.75rem',
          marginTop: '0.5rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Admin Panel
        </p>
      </div>

      {/* Nav Items */}
      <nav style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        flex: 1,
      }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id)
              setSidebarOpen(false)
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Lato, sans-serif',
              fontWeight: '700',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              backgroundColor: activeTab === item.id
                ? 'rgba(212,160,23,0.15)'
                : 'transparent',
              color: activeTab === item.id
                ? '#d4a017'
                : 'rgba(255,248,231,0.6)',
              borderLeft: activeTab === item.id
                ? '3px solid #d4a017'
                : '3px solid transparent',
              textAlign: 'left',
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* User + Logout */}
      <div style={{
        borderTop: '1px solid rgba(212,160,23,0.15)',
        paddingTop: '1.2rem',
      }}>
        <p style={{
          fontFamily: 'Lato, sans-serif',
          color: '#fff8e7',
          fontWeight: '700',
          fontSize: '0.9rem',
          margin: '0 0 0.2rem',
        }}>
          {user?.name}
        </p>
        <p style={{
          fontFamily: 'Lato, sans-serif',
          color: 'rgba(255,248,231,0.4)',
          fontSize: '0.78rem',
          margin: '0 0 1rem',
        }}>
          {user?.email}
        </p>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: '#dc2626',
            fontFamily: 'Lato, sans-serif',
            fontWeight: '700',
            fontSize: '0.88rem',
            cursor: 'pointer',
            opacity: 0.8,
            transition: 'opacity 0.2s ease',
            padding: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.8}
        >
          <MdLogout /> Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#fdfaf4',
    }}>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 998,
          }}
        />
      )}

      {/* Desktop Sidebar — always visible on large screens */}
      <aside style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '260px',
        backgroundColor: '#1c0f00',
        zIndex: 999,
        padding: '1.5rem',
        display: 'none',
      }}
        className="admin-sidebar-desktop"
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Drawer */}
      <aside style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '260px',
        backgroundColor: '#1c0f00',
        zIndex: 999,
        padding: '1.5rem',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.35s ease',
        display: 'block',
      }}
        className="admin-sidebar-mobile"
      >
        {/* Close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'rgba(255,248,231,0.6)',
            fontSize: '1.3rem',
            cursor: 'pointer',
          }}
        >
          <MdClose />
        </button>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main
        className="admin-main"
        style={{
          flex: 1,
          padding: '1.5rem',
          minHeight: '100vh',
          overflowY: 'auto',
        }}
      >
        {/* Top Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          backgroundColor: '#fff8e7',
          borderRadius: '16px',
          padding: '1rem 1.5rem',
          border: '1px solid rgba(212,160,23,0.15)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          {/* Mobile menu button */}
          <button
            className="admin-menu-btn"
            onClick={() => setSidebarOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#1c0f00',
              fontSize: '1.4rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MdMenu />
          </button>

          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.2rem',
            fontWeight: '800',
            color: '#1c0f00',
            margin: 0,
          }}>
            {navItems.find(i => i.id === activeTab)?.label}
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(212,160,23,0.1)',
            border: '1px solid rgba(212,160,23,0.25)',
            borderRadius: '100px',
            padding: '0.3rem 0.8rem',
          }}>
            <BsBoxSeam style={{ color: '#d4a017', fontSize: '0.85rem' }} />
            <span style={{
              fontFamily: 'Lato, sans-serif',
              fontSize: '0.78rem',
              fontWeight: '700',
              color: '#d4a017',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>
              Admin
            </span>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'products' && <ManageProducts />}
          {activeTab === 'orders' && <ManageOrders />}
        </motion.div>
      </main>
    </div>
  )
}

export default Dashboard