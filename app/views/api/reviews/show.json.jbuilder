# json.review do
#     json.extract! @review, :id, :reservation_id, :reviewer_id, :cleanliness, :accuracy, :value, :communication, :check_in, :location, :overall_rating, :body
# end

      json.review do
        json.extract! review, :id, :reviewer_id, :listing_id, :body, :rating, :cleanliness, 
                      :communication, :check_in, :accuracy, :location, :value
        
        json.reviewer review.reviewer.name
        json.reviewerProfilePicture review.reviewer.profile_picture
      end

  