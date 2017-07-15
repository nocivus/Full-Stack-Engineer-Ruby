
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
    end

    result = ComicsService.get_comics(params[:page], params[:per_page], char_ids ? char_ids.join(',') : nil)

    # Go through the results and check for upvotes (updating data as needed)
    result[:data].each do |comic|
      comic[:upvoted] = Upvote.upvoted?(comic["id"])
    end

    render json: result
  end

  def upvote
    Upvote.upvote(params[:id])

    # TODO: error handling

    render json: { result: "success" }
  end

  def downvote
    Upvote.downvote(params[:id])

    # TODO: error handling

    render json: { result: "success" }
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