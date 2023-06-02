class Listings8 < ActiveRecord::Migration[7.0]
  def change

    add_column :listings, :title, :string
  
    add_index :listings, :title

  end
end
