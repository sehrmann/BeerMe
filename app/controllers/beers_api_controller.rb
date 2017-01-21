class BeersApiController < ApplicationController

  def api
    response = BeerClient.get('/' + params[:request])
    render json: response
  end

end
