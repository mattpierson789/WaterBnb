module Api
  class ListingsController < ApplicationController

    def index
      @listings = Listing.all
      render 'api/listings/index'
    end
    
    
    def show
      @listing = Listing.find(params[:id])
      render :show
    end

    def unique_type_index
      @listings = Listing.where("unique_type LIKE ?", "%#{params[:unique_type]}%")
      render 'api/listings/index'
    end

    def unique_activity_index
      @listings = Listing.where("unique_activity LIKE ?", "%#{params[:unique_activity]}%")
      render 'api/listings/index'
    end

    def villa
      @listings = Listing.where("rental_type LIKE ?", "%#{params[:rental_type]}%")
      render 'api/listings/index'
      debugger
    end


def pets_allowed
  @listings = Listing.where(pets_allowed: true)
  render 'api/listings/index'
end
    
    
    private

    def listing_params
      params.require(:listing).permit(:lister_id, :pictures, :city, :night_price, :country, 
          :description, :unique_type, :bedrooms, :bathrooms, :max_guests, :rental_type, :latitude, :longitude)
    end
  end
end
