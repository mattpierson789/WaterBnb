module Api
  class ReviewsController < ApplicationController

    skip_before_action :verify_authenticity_token, only: :create

    def create 
      reservation = Reservation.find(params[:review][:reservation_id])
      params[:review][:reviewer_id] = reservation.reserver_id
      params[:review][:listing_id] = reservation.listing_id   # <-- Add this line
      @review = reservation.build_review(review_params)
      
      if @review.save 
        render :show 
      else 
        puts @review.errors.inspect   
        render json: @review.errors.full_messages, status: 422
      end
    end 
    
       

    def index 
      @reviews = Review.where(listing_id: params[:listing_id])
      render :index
    end 

    def show 
      @review = Review.find(params[:id])
      render :show
    end 

    def destroy 
      @review = Review.find(params[:id])
      @review.destroy
      render :show
    end 

    def update 
      @review = Review.find(params[:id])
  
      if @review.update(review_params)
        render :show
      else
        render json: @review.errors.full_messages, status: 422
      end
    end 

    private 

    def review_params 
      params.require(:review).permit(:reviewer_id, :listing_id, :rating, :body, :cleanliness, :communication, :check_in, :accuracy, :location, :value, :reservation_id)
    end
  end
end
