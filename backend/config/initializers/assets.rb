# config/initializers/assets.rb

# Add Vite output directory to the asset load paths
Rails.application.config.assets.paths << Rails.root.join('public', 'vite', 'assets')

# Optionally add the manifest file for Rails to reference in production
Rails.application.config.assets.configure do |env|
  env.append_path Rails.root.join('public', 'vite', 'assets')
end
