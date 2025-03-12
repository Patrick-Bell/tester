# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_03_09_133106) do
  create_schema "auth"
  create_schema "extensions"
  create_schema "graphql"
  create_schema "graphql_public"
  create_schema "pgbouncer"
  create_schema "pgsodium"
  create_schema "pgsodium_masks"
  create_schema "realtime"
  create_schema "storage"
  create_schema "vault"

  # These are extensions that must be enabled in order to support this database
  enable_extension "extensions.pg_stat_statements"
  enable_extension "extensions.pgcrypto"
  enable_extension "extensions.pgjwt"
  enable_extension "extensions.uuid-ossp"
  enable_extension "graphql.pg_graphql"
  enable_extension "pg_catalog.plpgsql"
  enable_extension "pgsodium.pgsodium"
  enable_extension "vault.supabase_vault"

  create_table "events", force: :cascade do |t|
    t.string "title"
    t.date "deadline"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "orders", force: :cascade do |t|
    t.jsonb "products", default: []
    t.decimal "total_price", precision: 10, scale: 2, null: false
    t.string "status", default: "pending"
    t.datetime "date", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.text "address", null: false
    t.string "payment_method", null: false
    t.datetime "delivery_date"
    t.boolean "paid", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "order_id"
    t.string "tracking_id"
    t.bigint "user_id"
    t.decimal "shipping_fee", precision: 10, scale: 2, default: "0.0", null: false
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.string "image"
    t.float "price"
    t.integer "stock"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "team"
    t.string "category"
    t.float "sale_price"
    t.float "height"
    t.float "weight"
    t.string "tag"
    t.string "accessories"
    t.float "bought"
    t.boolean "active", default: false
    t.string "notes"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "name"
    t.string "header"
    t.string "text"
    t.integer "rating", default: 5
    t.string "platform"
    t.boolean "reviewed", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "product_id", null: false
    t.index ["product_id"], name: "index_reviews_on_product_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "orders", "users"
  add_foreign_key "reviews", "products"
end
