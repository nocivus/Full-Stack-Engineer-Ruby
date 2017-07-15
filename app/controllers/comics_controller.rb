
# The comics controller
class ComicsController < ApplicationController
  before_action :set_default_request_format

  def index
    sanitize_pagination_params

    # Parse search characters
    if params[:search_query]
      chars = []
      params[:search_query].split(',').each do |char|
        chars << char.strip
      end
      char_ids = ComicsService.find_char_ids(chars)
      puts char_ids
    end

    $data = ComicsService.get_comics(params[:page], params[:per_page], char_ids ? char_ids.join(',') : nil)

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