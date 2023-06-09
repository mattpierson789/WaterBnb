class Reservation < ApplicationRecord

    validates :reserver_id, :listing_id, :start_date, :end_date, :num_guests, presence: true

    belongs_to :reserver,
    primary_key: :id,
    foreign_key: :reserver_id,
    class_name: :User

    belongs_to :listing,
    primary_key: :id,
    foreign_key: :listing_id,
    class_name: :Listing

end

