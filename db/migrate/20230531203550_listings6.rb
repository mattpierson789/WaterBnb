class Listings6 < ActiveRecord::Migration[7.0]
  def change

    add_column :listings, :lister_name, :string, default: "Michael"

  end
end
