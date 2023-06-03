module Api
  class ListingsController < ApplicationController

    def index
      @listings = Listing.all
      render json: @listings
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
      render json: @listing 
    end
    
    

    private

    def listing_params
      params.require(:listing).permit(:lister_id, :pictures, :city, :night_price, :country, 
          :description, :unique_type, :bedrooms, :bathrooms, :max_guests, :rental_type, :latitude, :longitude)
    end
  end
end
