class Listings3 < ActiveRecord::Migration[7.0]
  def change

    add_column :listings, :self_check_in, :boolean, default: true
    add_column :listings, :sleeps, :integer, null: false
     
  end
end
