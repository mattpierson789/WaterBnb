json.listing do
    json.extract! @listing, :id, :city, :country, :night_price, :latitude, :longitude, :description, 
                  :bedrooms, :sleeps, :bathrooms, :rental_type, :unique_type, :kitchen, :wifi, 
                  :parking, :pets_allowed, :self_check_in, :rating, :unique_activity, :max_guests

                  
      json.photos @listing.photos.map {|photo| photo ? url_for(photo) : 'https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1' }
    # json.photos @listing.photos do |photo|
    #   json.set! :url, url_for(photo)
    #   json.set! :filename, photo.filename
    # end
end



