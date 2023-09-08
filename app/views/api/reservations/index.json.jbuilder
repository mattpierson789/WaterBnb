json.reservations do
    @reservations.each do |reservation|
      json.set! reservation.id do
        json.id reservation.id
        json.partial! "api/reservations/reservation", reservation: reservation

        if reservation.listing&.photos&.any?
            json.photos reservation.listing.photos.map { |photo| photo ? url_for(photo) : 'https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1' }
        else
          json.photo nil
        end
      end
    end
  end
  
  
  json.listings do
    @listings.each do |listing|
      json.set! listing.id do
        json.partial! "api/listings/listing", listing: listing
      end
    end
  end
  
  listingsData = @listings.includes(:lister)
  
  json.hosts do
    listingsData.each do |listing|
      host = listing.lister
      json.set! host.id do
        json.extract! host, :id, :name
      end
    end
  end


