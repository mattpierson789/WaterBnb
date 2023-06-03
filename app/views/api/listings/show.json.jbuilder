json.listing do
    json.extract! @listing, :id, :city, :country, :night_price, :latitude, :longitude, :description, :bedrooms, :sleeps, :bathrooms, :rental_type, :unique_type, :kitchen, :wifi, :parking, :pets_allowed, :self_check_in, :rating, :unique_activity, :max_guests
end