module Api
    class ReviewsController < ApplicationController
  
      def create 
        @review = Review.new(review_params)
  
        if @review.save 
          render :show 
        else 
            debugger
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
        params.require(:review).permit(:reviewer_id, :listing_id, :rating, :body, :cleanliness, :communication, :check_in, :accuracy, :location, :value)
      end
    end
  end
  