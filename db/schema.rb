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

ActiveRecord::Schema[7.0].define(version: 2023_05_31_203550) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "listings", force: :cascade do |t|
    t.integer "lister_id", null: false
    t.string "pictures", null: false
    t.string "city", null: false
    t.string "night_price", null: false
    t.string "country", null: false
    t.string "description", null: false
    t.string "unique_type", default: "Ocean", null: false
    t.integer "bedrooms", default: 2, null: false
    t.integer "bathrooms", default: 1, null: false
    t.integer "max_guests", default: 3, null: false
    t.string "rental_type", default: "House", null: false
    t.decimal "latitude", precision: 9, scale: 6, null: false
    t.decimal "longitude", precision: 9, scale: 6, null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.boolean "wifi", default: true
    t.boolean "kitchen", default: true
    t.boolean "pets_allowed", default: false
    t.boolean "parking", default: true
    t.boolean "self_check_in", default: true
    t.integer "sleeps", null: false
    t.string "unique_activity"
    t.string "lister_name", default: "Michael"
    t.index ["bathrooms"], name: "index_listings_on_bathrooms"
    t.index ["bedrooms"], name: "index_listings_on_bedrooms"
    t.index ["city"], name: "index_listings_on_city"
    t.index ["country"], name: "index_listings_on_country"
    t.index ["lister_id"], name: "index_listings_on_lister_id"
    t.index ["max_guests"], name: "index_listings_on_max_guests"
    t.index ["night_price"], name: "index_listings_on_night_price"
    t.index ["rental_type"], name: "index_listings_on_rental_type"
    t.index ["unique_activity"], name: "index_listings_on_unique_activity"
    t.index ["unique_type"], name: "index_listings_on_unique_type"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "listings", "users", column: "lister_id"
end
