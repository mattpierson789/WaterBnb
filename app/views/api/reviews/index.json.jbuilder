json.reviews do
  @reviews.each do |review|
    json.set! review.id do
      json.extract! review, :id, :reviewer_id, :listing_id, :body, :rating, :cleanliness, 
                    :communication, :check_in, :accuracy, :location, :value
      
      json.reviewer review.reviewer.name
      json.reviewerFirstName review.reviewer.first_name
      json.reviewerLastName review.reviewer.last_name
      json.reviewerProfilePicture review.reviewer.profile_picture
    end
  end
end

