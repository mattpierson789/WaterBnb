class Api::SessionsController < ApplicationController


  protect_from_forgery with: :exception


    def show
        if @user =  current_user

        render 'api/users/show'

        else

          render json: { user: nil }

      end

  end 

    def create
      @user = User.find_by_credentials(
        credential = params[:session][:credential],
        password = params[:session][:password]
      )

      if @user

        login!(@user)

        render 'api/users/show'

      else

        render json: ['Invalid email or password'], status: :unprocessable_entity

      end

    end

    def destroy

      if current_user

        logout!

        render json: { message: 'Sucessfully logged out'}

      else

        render json: { message: 'No current user' }, status: :not_found

      end



    end


end
