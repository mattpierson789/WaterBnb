class Listing < ActiveRecord::Migration[7.0]
  def change

    add_column :listings, :rating, :float 
  end
end
