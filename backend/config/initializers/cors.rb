
 Rails.application.config.middleware.insert_before 0, Rack::Cors do
   allow do
     origins 'https://tester-rxuy.onrender.com'

     resource "*",
       headers: :any,
       methods: [:get, :post, :put, :patch, :delete, :options, :head]
   end

   allow do
     origins 'http://localhost:5173'

     resource "*",
       headers: :any,
       methods: [:get, :post, :put, :patch, :delete, :options, :head],
       credentials: true
   end
 end
