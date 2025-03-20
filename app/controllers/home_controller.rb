class HomeController < ApplicationController
  def index
    Rails.logger.debug "Rendering the index page..."
    Rails.logger.debug "Request params: #{params.inspect}"
    render file: Rails.root.join('public', 'index.html'), layout: false
    Rails.logger.debug "Index page rendered successfully!"
  end
end
