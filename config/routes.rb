Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'api/test', to: 'application#test'
  get 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do

    resources :users, only: [:create]
    resource :session, only: [:show, :create, :destroy]
    resources :listings, only: [:create, :show, :index]
    get 'listings/unique_type/:unique_type', to: 'listings#unique_type_index'

  end 

  

end
