Rails.application.routes.draw do
  get 'reservations/create'
  get 'reservations/update'
  get 'reservations/destroy'
  get 'reservations/show'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'api/test', to: 'application#test'
  get 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do

    resources :users, only: [:create]
    resource :session, only: [:show, :create, :destroy]
    resources :listings, only: [:create, :show, :index]
    resources :reservations, only: [:create, :show, :update, :destroy, :index]

    get 'listings/unique_type/:unique_type', to: 'listings#unique_type_index'
    get 'listings/unique_activity/:unique_activity', to: 'listings#unique_activity_index'

  end 

  get '*path', to: "static_pages#frontend_index"

end
