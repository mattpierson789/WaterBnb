class Listing4 < ActiveRecord::Migration[7.0]
  def change

    add_column :listings, :unique_activity, :string

  end
end
