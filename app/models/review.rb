class Review < ApplicationRecord
    belongs_to :reviewer, class_name: 'User'
    belongs_to :listing
  
    
    validates :body, :rating, :cleanliness, :communication, :check_in, :accuracy, :location, :value, presence: true
    validates :rating, :cleanliness, :communication, :check_in, :accuracy, :location, numericality {in: 0..5 }

  end
  