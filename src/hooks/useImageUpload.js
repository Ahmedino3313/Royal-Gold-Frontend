import { useState } from 'react'
import toast from 'react-hot-toast'

function useImageUpload() {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState('')

    const uploadImage = async (file) => {
        if (!file) return null

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (!validTypes.includes(file.type)) {
        toast.error('Only JPG, PNG or WEBP images allowed')
        return null
        }

        // Validate file size — max 5MB
        if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB')
        return null
        }

        setUploading(true)

        // Show local preview immediately
        const localPreview = URL.createObjectURL(file)
        setPreview(localPreview)

        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                { method: 'POST', body: formData }
            )

            const data = await res.json()

            if (data.secure_url) {
                toast.success('Image uploaded successfully')
                return data.secure_url
            } else {
                toast.error('Image upload failed')
                return null
            }
        } catch (err) {
        toast.error('Image upload failed')
        return null
        } finally {
        setUploading(false)
        }
    }

    const resetPreview = () => setPreview('')

    return { uploadImage, uploading, preview, setPreview, resetPreview }
}

export default useImageUpload