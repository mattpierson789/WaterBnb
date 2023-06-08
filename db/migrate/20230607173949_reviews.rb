class Reviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.bigint :reviewer_id, null: false, index: true
      t.bigint :listing_id, null: false, index: true
      t.text :body, null: false
      t.float :rating, null: false
      t.integer :cleanliness, null: false
      t.integer :communication, null: false
      t.integer :check_in, null: false
      t.integer :accuracy, null: false
      t.integer :location, null: false
      t.integer :value, null: false

      t.timestamps
    end

    add_foreign_key :reviews, :users, column: :reviewer_id
    add_foreign_key :reviews, :listings, column: :listing_id
  end
end
