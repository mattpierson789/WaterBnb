class Edit < ActiveRecord::Migration[7.0]
  def change

    add_column :listings, :wifi, :boolean, default: true
    add_column :listings, :kitchen, :boolean, default: true
    add_column :listings, :pets_allowed, :boolean, default: false
    add_column :listings, :parking, :boolean, default: true

    change_column_default :listings, :bathrooms, 1
    change_column_default :listings, :bedrooms, 2
    change_column_default :listings, :max_guests, 3
    change_column_default :listings, :rental_type, "House"
    change_column_default :listings, :unique_type, "Ocean"



  end
end
