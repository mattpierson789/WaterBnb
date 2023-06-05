json.reservations do 
    @reservations.each do |reservation| 
        json.set! reservation.id do
            json.extract! reservation, :id, :start_date, :end_date, :num_guests, :reserver_id, :listing_id
        end

        json.listingRentalType reservation.listing.rental_type
        json.listingCity reservation.listing.city
        json.listingCountry reservation.listing.country
        json.listingNightPrice reservation.listing.night_price
        json.listingListerName reservation.listing.lister_name
        json.listingMaxGuests reservation.listing.max_guests


    end
end 