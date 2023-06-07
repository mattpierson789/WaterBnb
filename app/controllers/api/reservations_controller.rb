
module Api
  class ReservationsController < ApplicationController
debugger
    skip_before_action :verify_authenticity_token, only: :create

  wrap_parameters Reservation.attribute_names + [:start_date, :end_date, :num_guests, :listing_id, :reserver_id]

  def index

    @reservations = Reservation.all.where(reserver_id: current_user.id).order("start_date")


  end 

  def create
    debugger
    @reservation = Reservation.new(reservation_params)
    debugger
    if @reservation.save
      debugger
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
    debugger
    
    params.require(:reservation).permit(:reserver_id, :listing_id, :start_date, :end_date, :num_guests)
    
  end
  

  end

end
