class Reservation < ApplicationRecord

    belongs_to :reserver, 
    primary_key: :id,
    foreign_key: :reserver_id,
    class_name: :User

    belongs to :listing,


end
