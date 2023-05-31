class CreateListings < ActiveRecord::Migration[6.0]
  def change
    create_table :listings do |t|
      t.integer :lister_id, null: false
      t.string :pictures, null: false
      t.string :city, null: false
      t.string :night_price, null: false
      t.string :country, null: false
      t.string :description, null: false
      t.string :unique_type, null: false
      t.integer :bedrooms, null: false
      t.integer :bathrooms, null: false
      t.integer :max_guests, null: false
      t.string :rental_type, null: false
      t.decimal :latitude, null: false, precision: 9, scale: 6
      t.decimal :longitude, null: false, precision: 9, scale: 6
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
    end

    add_foreign_key :listings, :users, column: :lister_id
    add_index :listings, :lister_id
    add_index :listings, :night_price
    add_index :listings, :city
    add_index :listings, :country
    add_index :listings, :rental_type
    add_index :listings, :unique_type
    add_index :listings, :bedrooms
    add_index :listings, :bathrooms
    add_index :listings, :max_guests
  end
end
