class HomeController < ApplicationController
    def index
      render file: 'public/vite/index.html', layout: false
    end
  end
  