class ListingsController < ApplicationController

    def index
        @listings = Listing.all
        redner:index
      end
    
      def show
        @listing = Listing.find(params[:id])
        render: show
      end
    
      def create
        @listing = Listing.new(listing_params)
    
        if @listing.save
          redirect_to @listing, notice: 'Listing was successfully created.'
        else
          render :new
        end
      end


    private

    def listing_params
        params.require(:listing).permit(:lister_id, :pictures, :city, :night_price, :country, 
            :description, :unique_type, :bedrooms, :bathrooms, :max_guests, :rental_type, :latitude, :longitude)
    end


end
