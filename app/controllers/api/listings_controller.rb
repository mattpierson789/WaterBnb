module Api
  class ListingsController < ApplicationController

    def index
      @listings = Listing.all.limit(10)
      render 'api/listings/index'
    end
    
    

    # def show
    #   @listing = Listing.find(params[:id])
    #   @photos_urls = @listing.photos.map do |photo|
    #     rails_blob_url(photo.blob)
    #   end
    #   render json: {listing: @listing, photos: @photos_urls}
    # end

    def show
      @listing = Listing.find(params[:id])
      render :show
    end

    def unique_type_index
      @listings = Listing.where("unique_type LIKE ?", "%#{params[:unique_type]}%")
      render 'api/listings/index'
    end

    def unique_activity_index
      @listings = Listing.where("unique_type LIKE ?", "%#{params[:unique_activity]}%")
      render 'api/listings/index'
      debugger
    end
    
    
    private

    def listing_params
      params.require(:listing).permit(:lister_id, :pictures, :city, :night_price, :country, 
          :description, :unique_type, :bedrooms, :bathrooms, :max_guests, :rental_type, :latitude, :longitude)
    end
  end
end
