        json.set! @reservation.id do
            json.extract! @reservation, :id, :start_date, :end_date, :num_guests, :reserver_id, :listing_id


        end

      
 