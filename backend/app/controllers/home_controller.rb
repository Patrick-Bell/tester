class HomeController < ApplicationController
    def index
      # Read the Vite manifest to get the correct JS and CSS assets
      manifest_path = Rails.root.join('public', 'vite', 'manifest.json')
      
      if File.exist?(manifest_path)
        @manifest = JSON.parse(File.read(manifest_path))
      else
        @manifest = {}
      end
    end
  end
  