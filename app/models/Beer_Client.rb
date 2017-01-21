class BeerClient
  include HTTParty
  base_uri "http://api.brewerydb.com/v2/"
  default_params key: Rails.application.secrets.brewery_db_key
  format :json
end
