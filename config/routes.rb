# Rails.application.routes.draw do
#   get 'reservations/create'
#   get 'reservations/update'
#   get 'reservations/destroy'
#   get 'reservations/show'
#   # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

#   # Defines the root path route ("/")
#   # root "articles#index"

#   post 'api/test', to: 'application#test'
#   get 'api/test', to: 'application#test'

#   namespace :api, defaults: { format: :json } do
#     resources :users, only: [:create]
#     resource :session, only: [:show, :create, :destroy]
#     resources :listings, only: [:create, :show, :index]
#     resources :reviews, only: [:create, :show, :update, :destroy, :index]
    
#     # Adding the nested route for reviews under reservations
#     resources :reservations, only: [:create, :show, :update, :destroy, :index]
    
#     resources :reservations do
#       resources :reviews, only: [:create, :update, :destroy, :show]
#     end
      
    

#     get 'listings/unique_type/:unique_type', to: 'listings#unique_type_index'
#     get 'listings/unique_activity/:unique_activity', to: 'listings#unique_activity_index'
#     get '/listings/:listing_id', to: 'listings#show'
#     get '/reservations/:id/photo', to: 'reservations#photo'
#   end
# end

Rails.application.routes.draw do
  post 'api/test', to: 'application#test'
  get 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:show, :create, :destroy]
    
    resources :listings, only: [:create, :show, :index] do
      collection do
        get 'unique_type/:unique_type', to: 'listings#unique_type_index'
        get 'unique_activity/:unique_activity', to: 'listings#unique_activity_index'
      end
    end

    resources :reservations, only: [:create, :show, :update, :destroy, :index] do
      member do
        get 'photo', to: 'reservations#photo'
        get 'review', to: 'reservations#review'
      end
      resources :reviews, only: [:create, :update, :destroy, :show]
    end
  end 
end
