require 'http'
require 'json'

class EbayController < ApplicationController
  EBAY_BASE_URL = "https://api.ebay.com/sell/inventory/v1/inventory_item"

  def fetch_inventory
    response = HTTP.headers(
      "Authorization" => "Bearer #{ENV['EBAY_ACCESS_TOKEN']}",
      "Content-Type" => "application/json"
    ).get(EBAY_BASE_URL)

    inventory = JSON.parse(response.body.to_s)
    
    render json: inventory
  end

  def sync_inventory
    inventory = fetch_inventory_data

    inventory["inventoryItems"].each do |item|
      product = Product.find_or_initialize_by(ebay_id: item["sku"])
      
      product.update(
        name: item["title"],
        price: item["price"]["value"].to_f,
        stock: item["availability"]["shipToLocationAvailability"]["quantity"],
        image_url: item.dig("product", "imageUrls")&.first
      )
    end

    render json: { message: "Inventory synced successfully" }
  end

  private

  def fetch_inventory_data
    response = HTTP.headers(
      "Authorization" => "Bearer #{ENV['EBAY_ACCESS_TOKEN']}",
      "Content-Type" => "application/json"
    ).get(EBAY_BASE_URL)

    JSON.parse(response.body.to_s)
  end
end
