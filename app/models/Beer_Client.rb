class BeerClient
  include HTTParty
  base_uri "http://api.brewerydb.com/v2/"
  default_params key: ENV['BREWERY_DB_KEY']
  format :json
end
