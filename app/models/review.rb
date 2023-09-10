class Review < ApplicationRecord
  validates :body, :rating, :cleanliness, :communication, :check_in, :accuracy, :location, :value, presence: true
  validates :rating, :cleanliness, :communication, :check_in, :accuracy, :location, :value, numericality: { in: 0..5 }

  before_validation :calculate_rating

  belongs_to :reservation
  
  belongs_to :reviewer,
             class_name: :User,
             foreign_key: :reviewer_id

  def calculate_rating
    self.rating = ((cleanliness + accuracy + value + communication + check_in + location) / 6.0).round(2)
  end
end
