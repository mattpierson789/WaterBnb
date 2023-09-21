class RemoveForeignKeyConstraintFromReservations < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :reservations, :users, column: :reserver_id
  end
end
