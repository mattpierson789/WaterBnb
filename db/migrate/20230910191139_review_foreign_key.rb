class ReviewForeignKey < ActiveRecord::Migration[7.0]
  def change

    add_reference :reviews, :reservation, foreign_key: true

  end
end

