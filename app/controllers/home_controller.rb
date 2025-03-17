class HomeController < ApplicationController
    def index
      render file: Rails.root.join('index.html'), layout: false
    end
  end
  