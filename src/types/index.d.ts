// ------------------------------------------
// Config Types
// ------------------------------------------
export type SiteConfig = {
  name: string
  description: string
  keywords: string[]
  authorURL: string
  authorName: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

// ------------------------------------------
// Model Types
// ------------------------------------------
export type User = {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  hashedPassword: string | null
  createdAt: Date
  updatedAt: Date
}

export type Restaurant = {
  id: string
  name: string
  slug: string
  tag_line: string
  description: string
  image: string
  address: string
  phone: string
  createdAt: Date
  updatedAt: Date
}

export type MenuItem = {
  id: string
  stripePriceId: string
  name: string
  slug: string
  description: string
  calories: number
  category: string
  price: number
  image: string
  createdAt: Date
  updatedAt: Date
  restaurantId: string
  restaurantName: string
}

// ------------------------------------------
// State Types
// ------------------------------------------

type CartItem = {
  item: MenuItem
  quantity: number
}
