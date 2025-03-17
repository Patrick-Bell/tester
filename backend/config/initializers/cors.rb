Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://minifigmania-47fa062622db.herokuapp.com', 'http://localhost:5173', 'http://localhost:3000'

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end
