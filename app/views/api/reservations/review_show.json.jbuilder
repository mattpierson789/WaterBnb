
json.set! @review.id do
    json.id @review.id
    json.reviewerId @review.reviewer_id
    json.listingId @review.listing_id
    json.body @review.body
    json.rating @review.rating
    json.cleanliness @review.cleanliness
    json.communication @review.communication
    json.checkIn @review.check_in
    json.accuracy @review.accuracy
    json.location @review.location
    json.value @review.value
    json.reviewer @review.reviewer
  end
  