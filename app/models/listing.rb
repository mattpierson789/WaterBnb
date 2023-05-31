class Listing < ApplicationRecord

    validates :lister_id, :pictures, :city, :night_price, :country, :description, :unique_type,
    :bedrooms, :bathrooms, :max_guests, :rental_type, :latitude, :longitude,
    :created_at, :updated_at, presence: true

    validates :latitude , numericality: { greater_than_or_equal_to:  -90, less_than_or_equal_to:  90 }
    validates :longitude, numericality: { greater_than_or_equal_to: -180, less_than_or_equal_to: 180 }
    validates :rating, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
    validates :price, numericality: { greater_than: 0 }
    validates :unique_type, inclusion: { in: ["ocean", "lake", "river", "island", "sea", "mountains"] }
    validates :unique_activity, inclusion: { in: ["surfing", "swimming", "fishing", "camping", "skiing", "hiking"] }
    validates :rental_type, inclusion: { in: ["House", "Apartment", "Cabin", "Villa", "Yurt", "Chalet", "Condo"] }
  

  belongs_to :lister, 
    class_name: :User,
    primary_key: :id,
    foreign_key: :lister_id

  
  has_many :reservations,
  class_name: :Reservation,
  primary_key: :id,
  foreign_key: :listing_id,
  dependent: :destroy


has_many :reviews,
  class_name: :Review,
  primary_key: :id,
  foreign_key: :listing_id,
  dependent: :destroy
  

end
