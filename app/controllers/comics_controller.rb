
# The comics controller
class ComicsController < ApplicationController
  before_action :set_default_request_format

  def index
    sanitize_pagination_params

    # $data = ComicsService.get_comics(params[:page], params[:per_page])

    $data[:data][0]["upvoted"] = true

    render json: $data
  end

  private

  def sanitize_pagination_params
    params[:page] = params[:page] ? params[:page].to_i : 1
    params[:per_page] = params[:per_page] ? params[:per_page].to_i : 15
  end

  def set_default_request_format
    request.format = :json
  end
end