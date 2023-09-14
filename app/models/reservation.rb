class Reservation < ApplicationRecord

    validates :reserver_id, :listing_id, :start_date, :end_date, :num_guests, :total_price, presence: true

    validate :start_must_come_before_end
    validate :does_not_overlap_reservation
  
    before_validation :calc_total_price

    belongs_to :reserver,
    primary_key: :id,
    foreign_key: :reserver_id,
    class_name: :User

    belongs_to :listing,
    primary_key: :id,
    foreign_key: :listing_id,
    class_name: :Listing

    has_one :review,
    class_name: :Review,
    foreign_key: :reservation_id,
    dependent: :destroy


    def calc_total_price
        if !total_price
          nights = (end_date - start_date).to_i
          listing = Listing.find_by(id: listing_id)
      
          reserve_price = (listing.night_price * nights)
          service_fee = (reserve_price * 0.17).round(2)
      
          self.total_price = (reserve_price + (listing.night_price * 0.3) + service_fee)
          self.total_price = total_price.round(2)
        end
      end
    
      def overlapping_reservations
        if self.id
          Reservation
            .where.not(id: self.id)
            .where(listing_id: listing_id)
            .where.not("start_date > :end_date OR end_date < :start_date",
                       start_date: start_date, end_date: end_date)
        else
          Reservation
            .where(listing_id: listing_id)
            .where.not("start_date > :end_date OR end_date < :start_date",
                       start_date: start_date, end_date: end_date)
        end
      end
    
      def does_not_overlap_reservation
        return if overlapping_reservations.empty?
        errors.add(:base, "Request dates conflict with existing reservation")
      end
    
      def start_must_come_before_end
        return if start_date < end_date
    
        errors.add(:start_date, "must come before end date")
        errors.add(:end_date, "must come after start date")
      end

end

