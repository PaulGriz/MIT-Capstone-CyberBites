import { create } from "zustand"
import { persist } from "zustand/middleware"
import { MenuItem, CartItem } from "@/types"
import toast from "react-hot-toast"

// --------------------------------------------
// Types & Interfaces
// --------------------------------------------

type CheckoutItem = {
  price: string
  quantity: number
}

interface State {
  cart: CartItem[]
  cartCount: number
  cartTotal: number
  restaurantId: string
  restaurantName: string
  isDelivery: boolean
  deliveryFee: number
  tip: number
}

interface Actions {
  addItemToCart: (item: MenuItem) => void
  incrementItem: (item: MenuItem) => void
  decrementItem: (item: MenuItem) => void
  removeItem: (item: MenuItem) => void
  clearCart: () => void
  setDelivery: (isDelivery: boolean) => void
  setTip: (new_tip: number) => void
  processCheckout: (raw_cart: CartItem[]) => CheckoutItem[]
}

// --------------------------------------------
// Functions & Utils
// --------------------------------------------

function calculateCartTotal(
  cart: CartItem[],
  deliveryFee: number,
  tip: number,
  isDelivery: boolean
) {
  const subtotal = cart.reduce((acc, i) => acc + i.item.price * i.quantity, 0)
  const cartTotal = subtotal + tip
  if (isDelivery) {
    return cartTotal + deliveryFee
  } else {
    return cartTotal
  }
}

function clearCartUtil() {
  return {
    cart: [],
    cartCount: 0,
    cartTotal: 0,
    restaurantId: "",
    restaurantName: "",
    isDelivery: true,
  }
}

// --------------------------------------------
// State
// --------------------------------------------

const useCartStore = create(
  persist<State & Actions>(
    (set) => ({
      cart: [],
      restaurantId: "",
      restaurantName: "",
      cartCount: 0,
      cartTotal: 0,
      tip: 0,
      deliveryFee: 2.99,
      isDelivery: true,

      addItemToCart: (item: MenuItem) => {
        set((state) => {
          const cart = [...state.cart]
          let restaurantId = state.restaurantId
          let restaurantName = state.restaurantName
          const index = cart.findIndex((i) => i.item.id === item.id)
          // If item is not in cart, add it to cart and set restaurantId
          if (index === -1) {
            // If item is in cart, but from a different restaurant, throw error
            if (restaurantId !== item.restaurantId && restaurantId !== "") {
              toast.error("Cannot add items from a different restaurant. Please clear cart first.")
              return { cart, restaurantId }
            } else {
              restaurantName = item.restaurantName
              restaurantId = item.restaurantId
              cart.push({ item, quantity: 1 })
            }
          } else {
            // If item is in cart, increment quantity
            cart[index].quantity++
          }
          state.cartCount++
          const cartTotal = calculateCartTotal(cart, state.deliveryFee, state.tip, state.isDelivery)
          toast.success(`${item.name} added to cart`)
          return { cart, restaurantId, restaurantName, cartTotal }
        })
      },

      incrementItem: (item: MenuItem) => {
        set((state) => {
          const cart = [...state.cart]
          const index = cart.findIndex((i) => i.item.id === item.id)
          cart[index].quantity++
          state.cartCount++
          const cartTotal = calculateCartTotal(cart, state.deliveryFee, state.tip, state.isDelivery)
          return { cart, cartTotal }
        })
      },

      decrementItem: (item: MenuItem) => {
        set((state) => {
          let cart = [...state.cart]
          let cartCount = state.cartCount
          const index = cart.findIndex((i) => i.item.id === item.id)
          cart[index].quantity--
          cartCount--
          if (cart[index].quantity === 0) {
            cart = cart.filter((i) => i.item.id !== item.id)
            cartCount = cart.reduce((acc, i) => acc + i.quantity, 0)
          }

          if (cartCount === 0) return clearCartUtil()

          const cartTotal = calculateCartTotal(cart, state.deliveryFee, state.tip, state.isDelivery)
          return { cart, cartCount, cartTotal }
        })
      },

      removeItem: (item: MenuItem) =>
        set((state) => {
          let cart = [...state.cart]
          let cartCount = state.cartCount
          cart = cart.filter((i) => i.item.id !== item.id)
          cartCount = cart.reduce((acc, i) => acc + i.quantity, 0)
          const cartTotal = calculateCartTotal(cart, state.deliveryFee, state.tip, state.isDelivery)

          if (cartCount === 0) return clearCartUtil()

          return { cart, cartCount, cartTotal }
        }),

      clearCart: () => set(clearCartUtil()),

      setDelivery: (isDelivery) => {
        set((state) => {
          const cartTotal = calculateCartTotal(state.cart, state.deliveryFee, state.tip, isDelivery)
          return { isDelivery, cartTotal }
        })
      },

      setTip: (new_tip) => set({ tip: new_tip }),

      processCheckout: (raw_cart) => {
        const { isDelivery } = useCartStore.getState()
        const processed_cart = raw_cart.map((i) => ({
          price: i.item.stripePriceId,
          quantity: i.quantity,
        }))
        if (isDelivery) {
          processed_cart.push({
            price: "price_1NUvJeBniWTmNg9LeSVJ1o6O",
            quantity: 1,
          })
        }
        return processed_cart
      },
    }),
    {
      name: "cart-storage", // LocalStorage key
    }
  )
)

export default useCartStore
