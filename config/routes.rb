Rails.application.routes.draw do
  root "beers#index"

  resources :beers

  get "/api/:request", to: "beers_api#api"
end
