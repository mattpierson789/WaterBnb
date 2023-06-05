class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.datetime :start_date
      t.datetime :end_date
      t.integer :reserver_id
      t.integer :listing_id


      t.timestamps
    end
    add_index :reservations, :reserver_id
    add_index :reservations, :listing_id

    add_foreign_key :reservations, :users, column: :reserver_id
    add_foreign_key :reservations, :listings, column: :listing_id
    

  end
end
