class OrdersController < ApplicationController
  before_action :set_order, only: %i[ show update destroy ]

  # GET /orders
  def index
    @orders = Order.includes(:line_items).all

    render json: @orders.to_json(include: :line_items)
  end

  # GET /orders/1
  def show
    order = Order.includes(:line_items).find(params[:id])
    render json: order.to_json(include: :line_items)
  end

  # POST /orders
  def create
    @order = Order.new(order_params)

    if @order.save
      render json: @order, status: :created, location: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /orders/1
  def update
    if @order.update(order_params)
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # DELETE /orders/1
  def destroy
    @order.destroy!
  end

  def user_orders
    @orders = @current_user.orders 
    render json: @orders
  end
  


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def order_params
      params.expect(order: [ :user_id, :total_price, :status, :date, :address, :payment_method, :delivery_date, :paid, :shipping_fee, :tracking_id, :order_id ])
    end
end
