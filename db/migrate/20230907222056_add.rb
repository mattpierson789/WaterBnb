class Add < ActiveRecord::Migration[7.0]
  def change
    add_column :reservations, :total_price, :float, default: 0.0, null: false
  end
end
