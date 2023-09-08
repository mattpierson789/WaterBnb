
json.listing do
    json.partial! "listing", listing: @listing
  end
  
  host = @listing.lister
  json.host do
      json.extract! host, :id, :name
  end
  
  reservations = @listing.reservations
  json.reservations do
    reservations.each do |reservation|
      json.set! reservation.id do
        json.extract! reservation, :id, :listing_id, :reserver_id, :num_guests, :start_date, :end_date, :total_price
      end
    end
  end


