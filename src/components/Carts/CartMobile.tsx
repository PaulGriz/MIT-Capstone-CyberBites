"use client"
// ---------------------Libs---------------------
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"
// ---------------------Icons---------------------
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { BsCart2 } from "react-icons/bs"
// ---------------------Components---------------------
import { BsTrash } from "react-icons/bs"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// ---------------------State & Types---------------------
import useCartStore from "@/state/cart"
import { CartItem } from "@/types"

export function CartModal() {
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
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative grid place-items-center px-1 py-0">
          <BsCart2 size={22} className=" hover:fill-blue-200" />
          {cartCount > 0 && (
            <div className="absolute grid aspect-square h-8 animate-addToCart place-content-center rounded-full bg-blue-400 text-white transition-transform duration-500 group-hover:scale-110">
              <p className="text-base">{cartCount}</p>
            </div>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="min-w-[350px] max-w-[550px] sm:min-w-[450px] md:min-w-[500px]">
        {cartCount > 0 ? (
          <SheetHeader>
            <SheetTitle>{restaurantName} Order</SheetTitle>
            <SheetDescription>
              Make changes to your cart here. Checkout when you&apos;re ready.
            </SheetDescription>
          </SheetHeader>
        ) : (
          <SheetHeader>
            <SheetTitle>Cart is Empty</SheetTitle>
            <SheetDescription>Add items to your cart to get started.</SheetDescription>
          </SheetHeader>
        )}

        {/* ------------------------- */}
        {/* Cart Content */}
        {/* ------------------------- */}
        <div className="w-full">
          {/* Pickup / Delivery Tab Group */}
          {cartCount > 0 && (
            <>
              <hr className="my-3 h-px border-0 bg-gray-200 " />
              <div className="flex w-full flex-row justify-center">
                <Tabs
                  defaultValue="delivery"
                  className="mb-3 flex w-[400px] flex-row justify-center"
                >
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
                    <span className="text-muted-foreground">Price: ${item.item.price}</span>
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
                        <span className="text-muted-foreground">Subtotal:</span> $
                        {(item.item.price * item.quantity).toLocaleString()}
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
                  <span className="text-muted-foreground">Delivery Fee:</span> $
                  {deliveryFee.toLocaleString()}
                </p>
              ) : (
                <></>
              )}

              {/* <p>Tip: ${tip.toLocaleString()}</p> */}
              <p>
                <span className="text-muted-foreground">Total:</span> ${cartTotal.toLocaleString()}
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
        <SheetFooter>
          <SheetClose asChild>
            <div className="mt-1 flex w-full flex-row justify-center">
              {cartCount <= 0 ? (
                <Button className="w-[60%]">Close</Button>
              ) : (
                <Button onClick={onCheckout} disabled={cartCount <= 0} className="w-[60%]">
                  Checkout
                </Button>
              )}
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
