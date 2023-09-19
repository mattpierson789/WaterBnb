json.reviews @reviews do |review|
  json.extract! review, :id, :reviewer_id, :listing_id, :body, :rating, :cleanliness, 
                :communication, :check_in, :accuracy, :location, :value

  json.reviewer review.reviewer.name
  json.reviewerProfilePicture review.reviewer.profile_picture
end

