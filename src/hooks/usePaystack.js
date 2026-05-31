import { usePaystackPayment } from 'react-paystack'

function usePaystackCheckout({ email, amount, onSuccess, onClose }) {
    const config = {
        reference: `RGC-${new Date().getTime()}`,
        email,
        amount: amount * 100, // Paystack uses kobo
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        currency: 'NGN',
        metadata: {
        custom_fields: [
            {
            display_name: 'Shop',
            variable_name: 'shop',
            value: 'Royal Gold Cakes & Cuisine',
            },
        ],
        },
    }

    const initializePayment = usePaystackPayment(config)

    const pay = () => {
        initializePayment(onSuccess, onClose)
    }

    return { pay }
}

export default usePaystackCheckout