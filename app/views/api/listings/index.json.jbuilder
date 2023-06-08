json.listings do
    @listings.each do |listing|
        json.set! listing.id do
            json.extract! listing, :id, :city, :country, :night_price, :latitude, :longitude, :description, :bedrooms, :sleeps, :bathrooms, :rental_type, :unique_type, :kitchen, :wifi, :parking, :pets_allowed, :self_check_in, :rating, :unique_activity, :max_guests, :lister_name
            
            json.photos listing.photos.map {|photo| photo ? url_for(photo) : 'https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1'}
        end
    end
end