=begin
order = Order.create!(
  total_price: 21.21,
  status: "shipped",
  date: "2025-03-20T17:20:00.824Z",
  address: "3 The Populars Mill Lane, Chesterfield, Derbyshire, S42 5BF",
  payment_method: "credit_card",
  delivery_date: "2025-03-23T15:43:01.829Z",
  paid: true,
  shipping_fee: 3.10,
  name: "Patrick Bell",
  email: "",
  phone: "07788241054",
  platform: "eBay",
)

# Create associated line items
products = [
  { name: "Reus", image: "https://minifigurebricks.com/cdn/shop/files/e4dc5256-89df-49db-87b8-16c5202f127a.jpg", price: 3.25, quantity: 1, product_id: 180 },
  { name: "Zlatan - Inter Milan", image: "https://i.ebayimg.com/images/g/FsIAAOSwvNln2XmJ/s-l1600.webp", price: 4.49, quantity: 1, product_id: 181 },
  { name: "Saka", image: "https://minifigurebricks.com/cdn/shop/files/93d1a581-535b-4125-a678-dfe0ec2b1170.jpg", price: 4.49, quantity: 1, product_id: 182  },
  { name: "Kane", image: "https://minifigurebricks.com/cdn/shop/files/d8faa921-28c2-4ec6-ab14-940b2331efe2.jpg", price: 4.49, quantity: 2, product_id: 183  },
  { name: "Courtois", image: "https://minifigurebricks.com/cdn/shop/files/858eeadd-3d78-4d4f-b7c9-79a422f74959_7ed68797-82f9-474c-ac2e-49289edc90ab.jpg", price: 4.49, quantity: 1, product_id: 184  }
]

products.each do |product|
  order.line_items.create!(product)
end
=end

=begin
# Create products based on order line items
Product.create!([
  {
    name: "Reus",
    stock: 3,
    category: "football",
    tag: 'none',
    price: 3.99,
    image: "https://minifigurebricks.com/cdn/shop/files/e4dc5256-89df-49db-87b8-16c5202f127a.jpg",
    active: true
  },
  {
    name: "Zlatan - Inter Milan",
    stock: 5,
    category: "football",
    tag: 'new',
    price: 4.99,
    image: "https://i.ebayimg.com/images/g/FsIAAOSwvNln2XmJ/s-l1600.webp",
    active: true
  },
  {
    name: "Saka",
    stock: 4,
    category: "football",
    tag: 'none',
    price: 4.99,
    image: "https://minifigurebricks.com/cdn/shop/files/93d1a581-535b-4125-a678-dfe0ec2b1170.jpg",
    active: true
  },
  {
    name: "Kane",
    stock: 6,
    category: "football",
    tag: 'none',
    price: 4.99,
    image: "https://minifigurebricks.com/cdn/shop/files/d8faa921-28c2-4ec6-ab14-940b2331efe2.jpg",
    active: true
  },
  {
    name: "Courtois",
    stock: 3,
    category: "football",
    tag: 'none',
    price: 4.99,
    image: "https://minifigurebricks.com/cdn/shop/files/858eeadd-3d78-4d4f-b7c9-79a422f74959_7ed68797-82f9-474c-ac2e-49289edc90ab.jpg",
    active: true
  },
  {
    name: "Sonic",
    stock: 3,
    category: "sonic",
    tag: 'none',
    price: 4.99,
    image: "https://minifigurebricks.com/cdn/shop/files/K2230.jpg?crop=center&height=720&v=1737046029&width=720",
    active: true
  },
  {
    name: "Knuckles",
    stock: 3,
    category: "sonic",
    tag: 'none',
    price: 4.99,
    image: "https://minifigurebricks.com/cdn/shop/files/K2234.jpg?crop=center&height=720&v=1737048894&width=720",
    active: true
  },
  {
    name: "Tails",
    stock: 3,
    category: "sonic",
    tag: 'none',
    price: 4.99,
    image: "https://minifigurebricks.com/cdn/shop/files/K2231.jpg?crop=center&height=720&v=1737047893&width=720",
    active: true
  },
  {
    name: "Shadow",
    stock: 3,
    category: "sonic",
    tag: 'limited',
    price: 4.99,
    image: "https://minifigurebricks.com/cdn/shop/files/K2236.jpg?crop=center&height=720&v=1737480889&width=720",
    active: true
  },
  {
    name: "Super Sonic",
    stock: 3,
    category: "sonic",
    tag: 'none',
    price: 4.99,
    image: "https://minifigurebricks.com/cdn/shop/files/K2229.jpg?crop=center&height=720&v=1737048688&width=720",
    active: true
  },
  {
    name: "Amy Rose",
    stock: 3,
    category: "sonic",
    tag: 'none',
    price: 4.99,
    image: "https://minifigurebricks.com/cdn/shop/files/K2235.jpg?crop=center&height=720&v=1737049230&width=720",
    active: true
  },
])

=end

Review.create!([
  {
    name: 'John',
    header: 'Perfect',
    text: 'Arrived promptly and seller was helpful.',
    rating: 5,
    platform: 'eBay',
    reviewed: false,
    product_id: 217,
  }
])
