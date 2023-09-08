module Api
  class ReservationsController < ApplicationController

    skip_before_action :verify_authenticity_token, only: :create
    wrap_parameters Reservation.attribute_names + [:start_date, :end_date, :num_guests, :listing_id, :reserver_id]

    def index
      @reservations = Reservation.all.where(reserver_id: current_user.id).order("start_date")
      @listings = current_user.trip_listings
      render :index
    end

    def create
      @reservation = Reservation.new(reservation_params)
      @reservation.reserver_id ||= current_user.id
      if @reservation.save
        render :show
      else
        render json: @reservation.errors.full_messages, status: 422
      end
    end

    def update
      @reservation = Reservation.find(params[:id])
      if @reservation.update(reservation_params)
        render :show
      else
        render json: @reservation.errors.full_messages, status: 422
      end
    end

    def destroy
      @reservation = Reservation.find(params[:id])
      @reservation.destroy
      render :show
    end

    def show
      @reservation = Reservation.find(params[:id])
      render :show
    end

    private

    def reservation_params
      params.require(:reservation).permit(:reserver_id, :listing_id, :start_date, :end_date, :num_guests)
    end
  end
end
