class Listings7 < ActiveRecord::Migration[7.0]
  def change
    remove_column :listings, :pictures, :string
  end
end
