Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://minifigs-mania-47c93479337f.herokuapp.com'

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end

  allow do
    origins 'http://localhost:5173'

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end

end
