"use client"
// ---------------------Libs---------------------
import axios from "axios"
import useCartStore from "@/state/cart"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
// ---------------------Components---------------------
import FixedCartIcon from "@/components/Carts/FixedCartIcon"
import { Button } from "@/components/ui/button"

interface pageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function CheckoutPage({ searchParams }: pageProps) {
  const router = useRouter()
  const { cart, processCheckout, clearCart } = useCartStore((state) => state)

  function onCheckout() {
    const line_items = processCheckout(cart)
    try {
      axios.post("/api/checkout", line_items).then((res: any) => {
        console.log(res)
        router.push(res.data.url)
      })
    } catch (error) {
      console.error(error)
      toast.error("Error processing checkout. Please try again.")
    }
  }

  return (
    <main className="flex min-h-[80vh] flex-col items-center pt-10">
      <h1 className="mb-3 text-2xl font-semibold">Checkout Page</h1>
      {searchParams?.canceled === "true" && (
        <>
          <p className="text-red-500">Payment for your order was canceled</p>
          <p className="mb-3">Would you like to try again or clear cart for a new order?</p>
          <div className="flex flex-row gap-2">
            <Button variant="default" onClick={onCheckout}>
              Checkout Again
            </Button>
            <Button variant="destructive" onClick={() => clearCart()}>
              Clear Cart
            </Button>
          </div>
        </>
      )}
      {searchParams?.success === "true" && (
        <>
          <p className="text-green-500">Payment for your order was successful!</p>
          <p>Thank you for choosing us for your food delivery</p>
        </>
      )}
      <FixedCartIcon />
    </main>
  )
}

// import Stripe from "stripe"
// import ClientCart from "./ClientCart"

// async function getStripeProducts() {
//   if (!process.env.STRIPE_SECRET_KEY) {
//     throw new Error("Missing Stripe secret key")
//   }
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//     apiVersion: "2022-11-15",
//   })

//   const products = await stripe.products.list()
//   const prices = await stripe.prices.list()
//   return { products, prices }
// }

// export default async function CheckoutPage() {
//   const { products, prices } = await getStripeProducts()
//   const productsList = products.data
//   // console.log("---------------------------------")
//   // console.log(products)
//   // console.log("---------------------------------")
//   // console.log(prices)
//   // console.log("---------------------------------")
//   if (products && prices) {
//     return (
//       <div>
//         <p>Checkout Page</p>
//         <div className="mb-3 bg-slate-300">
//           {productsList.map((product) => {
//             return (
//               <div key={product.id}>
//                 <p>{product.name}</p>
//               </div>
//             )
//           })}
//         </div>

//         <ClientCart stripeProducts={productsList} />
//       </div>
//     )
//   }
// }
