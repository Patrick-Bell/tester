Product.create!([
    {
        name: "Kane",
        price: 5,
        stock: 6,
        team: 'England',
        category: 'football',
        image: "https://minifigurebricks.com/cdn/shop/files/918376a2-c98a-4754-89d1-7696ef3a33b9.jpg?crop=center&height=533&v=1731540875&width=533"
    },
    {
        name: "Saka",
        price: 8.99,
        stock: 3,
        team: 'Arsenal',
        category: 'champions',
        image: 'https://minifigurebricks.com/cdn/shop/files/93d1a581-535b-4125-a678-dfe0ec2b1170.jpg?crop=center&height=533&v=1731190057&width=533'
    },
    {
        name: "Ronaldo",
        price: 4,
        stock: 3,
        team: 'Manchester United',
        category: 'football',
        image: 'https://minifigurebricks.com/cdn/shop/files/id0_c64156_u2911.jpg?crop=center&height=533&v=1719492330&width=533'
    },
    {
        name: "Bellingham",
        price: 4,
        stock: 4,
        team: 'Real Madrid',
        category: 'champions',
        image: 'https://minifigurebricks.com/cdn/shop/files/8ecb4db7-1a59-4123-92cd-e11812aba668.jpg?crop=center&height=533&v=1729176922&width=533'
    },
    {
        name: 'Mbappe',
        price: 3,
        stock: 4,
        team: 'France',
        category: 'football',
        image: 'https://minifigurebricks.com/cdn/shop/files/918376a2-c98a-4754-89d1-7696ef3a33b9.jpg?crop=center&height=533&v=1731540875&width=533'
    },
    {
        name: "Haaland",
        price: 4.99,
        stock: 4,
        team: "Manchester City",
        category: 'football',
        image: 'https://minifigurebricks.com/cdn/shop/files/id0_c64155_u2911_1.jpg?crop=center&height=533&v=1719493472&width=533'
    },
    {
        name: "Van Dijk",
        price: 5,
        stock: 5,
        team: "Liverpool",
        category: 'football',
        image: 'https://minifigurebricks.com/cdn/shop/files/Football-Player-Virgil-van-Dijk-Minifigures-Professional-Soccer-player-Lego-Compatible.jpg?crop=center&height=533&v=1707920456&width=533'
    },
    {
        name: "Vinicius Jr",
        price: 6,
        stock: 2,
        team: 'Real Madrid',
        category: 'champions',
        image: 'https://minifigurebricks.com/cdn/shop/files/704397e4-d2a0-4a7c-a415-b6dbbed4456b.jpg?crop=center&height=533&v=1731540501&width=533'
    },
    {
        name: "Kaka",
        price: 2.99,
        stock: 6,
        team: 'Ac Milan',
        category: 'football',
        image: 'https://minifigurebricks.com/cdn/shop/files/TV7012.jpg?crop=center&height=533&v=1719489962&width=533'
    },
    {
        name: 'Griezmann',
        price: 4,
        stock: 3,
        team: "Athletico Madrid",
        category: 'champions',
        image: 'https://minifigurebricks.com/cdn/shop/files/11ecadd5-2b10-42f2-aeaa-db4bf6e30b4a.jpg?crop=center&height=533&v=1729245948&width=533'
    },
    {
        name: 'Deadpool',
        price: 2.99,
        stock: 3,
        team: 'Marvel',
        category: 'marvel',
        image: 'https://minifigurebricks.com/cdn/shop/products/XP028_1.jpg?crop=center&height=533&v=1602812937&width=533'
    },
    {
        name: 'SpiderMan',
        price: 4,
        stock: 6,
        team: 'marvel',
        category: 'marvel',
        image: 'https://minifigurebricks.com/cdn/shop/files/XP422.jpg?crop=center&height=533&v=1725921106&width=533'
    },
    {
        name: 'Wolverine',
        price: 4,
        stock: 3,
        category: 'marvel',
        image: 'https://minifigurebricks.com/cdn/shop/files/GH0569.png?crop=center&height=533&v=1725154322&width=533'
    },
    {
        name: 'Batman',
        price: 6,
        stock: 6,
        image: 'https://minifigurebricks.com/cdn/shop/products/PG011-_Batman_1.jpg?crop=center&height=533&v=1596973830&width=533',
        category: 'marvel'
    },
    {
        name: 'Goofy',
        price: 7,
        stock: 2,
        image: 'https://minifigurebricks.com/cdn/shop/files/PG1400.webp?crop=center&height=350&v=1705422578&width=350',
        category: 'disney'
    },
    {
        name: 'Minnie Mouse',
        price: 5,
        stock: 1,
        image: 'https://minifigurebricks.com/cdn/shop/files/id0_c57586_u1.jpg?crop=center&height=533&v=1719101592&width=533',
        category: 'disney'
    },
    {
        name: 'Leonardo',
        price: 6,
        stock: 2,
        image: 'https://minifigurebricks.com/cdn/shop/files/id0_c60753_u1.jpg?crop=center&height=533&v=1731075853&width=533',
        category: 'tmnt'
    },
    {
        name: 'Raphael',
        price: 8,
        stock: 10,
        image: 'https://minifigurebricks.com/cdn/shop/files/Cartoon-TMNT-Raphael-Mutant-Mayhem-KF3002-Minifigures.png?crop=center&height=533&v=1731076519&width=533',
        category: 'tmnt'
    }
])


Order.create!([
    {
  products: [
    { name: "Saka", quantity: 1, price: 9.99, image: "https://minifigurebricks.com/cdn/shop/files/93d1a581-535b-4125-a678-dfe0ec2b1170.jpg?crop=center&height=533&v=1731190057&width=533", reviewed: false },
    { name: "Leonardo", quantity: 2, price: 5.99, image: "https://minifigurebricks.com/cdn/shop/files/id0_c60753_u1.jpg?crop=center&height=533&v=1731075853&width=533", reviewed: true }
  ],
  total_price: (1 * 9.99) + (2 * 5.99), # Correct total calculation
  status: "pending",
  date: Time.current,
  address: "123 Main Street, New York, NY 10001",
  payment_method: "credit_card",
  delivery_date: Time.current + 5.days,
  paid: true,
  shipping_fee: 9.99
},
{
    products: [
      { name: "Saka", quantity: 1, price: 9.99, image: "https://minifigurebricks.com/cdn/shop/files/93d1a581-535b-4125-a678-dfe0ec2b1170.jpg?crop=center&height=533&v=1731190057&width=533", reviewed: false },
      { name: "Leonardo", quantity: 2, price: 5.99, image: "https://minifigurebricks.com/cdn/shop/files/id0_c60753_u1.jpg?crop=center&height=533&v=1731075853&width=533", reviewed: true },
      { name: "Minnie Mouse", quantity: 2, price: 5.99, image: "https://minifigurebricks.com/cdn/shop/files/id0_c57586_u1.jpg?crop=center&height=533&v=1719101592&width=533", reviewed: true },
      { name: "Bellingham", quantity: 2, price: 5.99, image: "https://minifigurebricks.com/cdn/shop/files/8ecb4db7-1a59-4123-92cd-e11812aba668.jpg?crop=center&height=533&v=1729176922&width=533", reviewed: true },
      { name: "Haaland", quantity: 2, price: 5.99, image: "https://minifigurebricks.com/cdn/shop/files/id0_c64155_u2911_1.jpg?crop=center&height=533&v=1719493472&width=533", reviewed: true }

    ],
    total_price: (1 * 9.99) + (2 * 5.99), # Correct total calculation
    status: "pending",
    date: Time.current,
    address: "123 Main Street, New York, NY 10001",
    payment_method: "credit_card",
    delivery_date: Time.current + 5.days,
    paid: false,
    shipping_fee: 9.99
  },
])



=begin


products schema
- name
- team
- price
- stock
- image
- category
- weight
- height
- assessories (message)
- tags
- status (available, out of stock)
- reviews (linked)
- discount price

order schema
- order id: automatically generated
- user id: linked to user or just 'guest'
- products: array of products with name, quantity, price, image, reviewed
- total price
- status (pending, shipped, delivered)
- date
- address
- payment method
- delivery date
- paid
- shipping fee




=end