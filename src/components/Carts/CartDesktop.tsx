"use client"
// ---------------------Libs---------------------
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"
// ---------------------Icons---------------------
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
// ---------------------Components---------------------
import { BsTrash } from "react-icons/bs"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// ---------------------State & Types---------------------
import useCartStore from "@/state/cart"
import { CartItem } from "@/types"

export default function CartModal() {
  const router = useRouter()
  const {
    cart,
    cartCount,
    cartTotal,
    deliveryFee,
    incrementItem,
    decrementItem,
    restaurantName,
    setDelivery,
    isDelivery,
    processCheckout,
    clearCart,
  } = useCartStore((state) => state)

  async function onCheckout() {
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
    <aside className="sticky top-0 hidden h-screen bg-slate-50 p-3 shadow lg:block lg:min-w-[350px] lg:max-w-[350px] store_md:max-w-[350px] xl:min-w-[450px] xl:max-w-[450px] xl:p-5">
      {cartCount > 0 ? (
        <div className="w-full">
          <h1 className="mb-1 text-center text-xl font-semibold">{restaurantName} Order</h1>
          <p className="text-center text-sm">
            Make changes to your cart here. Checkout when you&apos;re ready.
          </p>
        </div>
      ) : (
        <div className="w-full">
          <h1 className="mb-1 text-center text-2xl font-semibold">Cart is Empty</h1>
          <p className="text-center text-sm">Add items to your cart to get started.</p>
        </div>
      )}

      {/* ------------------------- */}
      {/* Cart Content */}
      {/* ------------------------- */}
      <div className="w-full">
        {/* Pickup / Delivery Tab Group */}
        {cartCount > 0 && (
          <>
            <hr className="my-3 mr-2 h-px border-0 bg-gray-200" />
            <div className="flex w-full flex-row justify-center">
              <Tabs defaultValue="delivery" className="mb-3 flex w-[400px] flex-row justify-center">
                <TabsList>
                  <TabsTrigger value="pickup" onClick={() => setDelivery(false)}>
                    Pickup
                  </TabsTrigger>
                  <TabsTrigger value="delivery" onClick={() => setDelivery(true)}>
                    Delivery
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </>
        )}
        {/* Cart Item List */}
        {cartCount > 0 &&
          cart.map((item: CartItem) => (
            <div key={item.item.id}>
              <div className="flex flex-col justify-between">
                <p className="font-semibold">{item.item.name}</p>
                <p>
                  <span className="text-muted-foreground">
                    Price:{" "}
                    {item.item.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </p>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center gap-1">
                    {/* Plus [Count] Minus  */}
                    <button
                      onClick={() => incrementItem(item.item)}
                      className="flex flex-row items-center rounded px-3 py-2 text-slate-600 hover:text-blue-300"
                    >
                      <AiOutlinePlus />
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() => decrementItem(item.item)}
                      className="flex flex-row items-center rounded px-3 py-2 text-slate-600 hover:text-blue-300"
                    >
                      <AiOutlineMinus />
                    </button>
                  </div>
                  <div className="flex items-end pr-2">
                    <p>
                      <span className="text-muted-foreground">Subtotal:</span>{" "}
                      {(item.item.price * item.quantity).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <hr className="my-2 h-px border-0 bg-gray-200 " />
            </div>
          ))}
        {/* Cart Total */}
        {cartTotal > 0 && (
          <div className="mt-5 flex w-full flex-col">
            {isDelivery ? (
              <p>
                <span className="text-muted-foreground">Delivery Fee:</span>{" "}
                {deliveryFee.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            ) : (
              <></>
            )}

            <p>
              <span className="text-muted-foreground">Total:</span>{" "}
              {cartTotal.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <button
              onClick={() => clearCart()}
              className="flex flex-row items-center gap-1 self-end rounded pr-2 text-red-400 hover:text-red-200"
            >
              Clear Cart <BsTrash />
            </button>
          </div>
        )}
        <hr className="my-3 h-px border-0 bg-gray-200 " />
      </div>
      {/* ------------------------- */}
      <div>
        <div className="mt-1 flex w-full flex-row justify-center">
          {cartCount > 0 && (
            <Button onClick={onCheckout} className="w-[60%]">
              Checkout
            </Button>
          )}
        </div>
      </div>
    </aside>
  )
}
