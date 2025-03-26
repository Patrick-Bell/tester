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
  { name: "Reus", image: "https://minifigurebricks.com/cdn/shop/files/e4dc5256-89df-49db-87b8-16c5202f127a.jpg", price: 3.25, quantity: 1 },
  { name: "Zlatan - Inter Milan", image: "https://i.ebayimg.com/images/g/FsIAAOSwvNln2XmJ/s-l1600.webp", price: 4.49, quantity: 1 },
  { name: "Saka", image: "https://minifigurebricks.com/cdn/shop/files/93d1a581-535b-4125-a678-dfe0ec2b1170.jpg", price: 4.49, quantity: 1 },
  { name: "Kane", image: "https://minifigurebricks.com/cdn/shop/files/d8faa921-28c2-4ec6-ab14-940b2331efe2.jpg", price: 4.49, quantity: 2 },
  { name: "Courtois", image: "https://minifigurebricks.com/cdn/shop/files/858eeadd-3d78-4d4f-b7c9-79a422f74959_7ed68797-82f9-474c-ac2e-49289edc90ab.jpg", price: 4.49, quantity: 1 }
]

products.each do |product|
  order.line_items.create!(product)
end
