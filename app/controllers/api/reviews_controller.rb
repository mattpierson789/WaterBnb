# module Api
#   class ReviewsController < ApplicationController

#     skip_before_action :verify_authenticity_token, only: :create

#     def create 
#       reservation = Reservation.find(params[:review][:reservation_id])
#       params[:review][:reviewer_id] = reservation.reserver_id
#       params[:review][:listing_id] = reservation.listing_id   # <-- Add this line
#       @review = reservation.build_review(review_params)
      
#       if @review.save 
#         render :show 
#       else 
#         puts @review.errors.inspect   
#         render json: @review.errors.full_messages, status: 422
#       end
#     end 
    
       

#     def index 
#       @reviews = Review.where(listing_id: params[:listing_id])
#       render :index
#     end 

#     def show 
#       @review = Review.find(params[:id])
#       render :show
#     end 

#     def destroy 
#       @review = Review.find(params[:id])
#       @review.destroy
#       render :show
#     end 

#     def update 
#       @review = Review.find(params[:id])
  
#       if @review.update(review_params)
#         render :show
#       else
#         render json: @review.errors.full_messages, status: 422
#       end
#     end 

#     private 

#     def review_params 
#       params.require(:review).permit(:reviewer_id, :listing_id, :rating, :body, :cleanliness, :communication, :check_in, :accuracy, :location, :value, :reservation_id)
#     end
#   end
# end

class Api::ReviewsController < ApplicationController
  before_action :require_logged_in, only: [:create, :show, :update, :destroy, :reservation_review]
  before_action :set_review, only: [:show, :update, :destroy]
  skip_before_action :verify_authenticity_token, only: :create

  def index
    @listing = Listing.find_by(id: params[:listing_id])
    @reviews = @listing.reviews.includes(:reviewer)
    render :index
  end

  def create
    reservation = Reservation.find_by(id: params[:reservation_id])
    # debugger
    if reservation
      @review = reservation.build_review(review_params)
      @review.reviewer_id = current_user.id

      # debugger

      if @review.save 
        render :show 
      else 
        render json: @review.errors.full_messages, status: 422
      end
    else
      render json: { errors: ["Reservation could not be found"] }, status: 404
    end
  end

  def show
    if @review
      render :show
    else
      render json: { errors: ["Review could not be found"] }, status: 404
    end
  end

  def reservation_review
    reservation = Reservation.find_by(id: params[:reservation_id])
    @review = reservation&.review
    if @review
      render :show
    else
      render json: { message: ["No review associated with the given reservation"] }
    end
  end

  def listing_review
    listing = Listing.find_by(id: params[:listing_id])
    @reviews = listing&.reviews
    if @reviews.present?
      render :index
    else
      render json: { message: ["No reviews associated with the given listing"] }
    end
  end
  

  def update
    if @review
      if @review.reviewer_id == current_user.id
        if @review.update(review_params)
          render :show
        else
          render json: { errors: @review.errors.full_messages }, status: 422
        end
      else
        render json: { errors: ["Not allowed. That review was not posted by you."] }
      end
    else
      render json: { errors: ["Review could not be found"] }, status: 404
    end
  end

  def destroy
    if @review&.reviewer_id == current_user.id
      @review.destroy
      head :no_content
    else
      render json: { errors: ["Not allowed. That review was not posted by you."] }
    end
  end

  private

  def set_review
    @review = Review.find_by(id: params[:id])
  end

  def review_params
    params.require(:review).permit(:reservation_id, :cleanliness, :accuracy, :value, :communication, :check_in, :location, :body, :listing_id)
  end
end

