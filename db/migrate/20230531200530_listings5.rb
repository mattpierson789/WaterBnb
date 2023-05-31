class Listings5 < ActiveRecord::Migration[7.0]
  def change

    add_index :listings, :unique_activity

  end
end
