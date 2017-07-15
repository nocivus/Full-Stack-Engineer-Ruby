
# The comics service
class ComicsService
  def self.get_comics(page, per_page, character_ids)
    params = {
      # orderBy: "-onsaleDate",
      orderBy: "-focDate",
      limit: per_page,
      offset: (page - 1) * per_page
    }

    params[:characters] = character_ids if character_ids.present?

    Rails.logger.debug("Searching for comics with params: #{params}")
    response = make_call(MARVEL_COMICS_URL, params)

    {
      metadata: {
        page: page,
        per_page: per_page,
        total_count: response["data"]["total"]
      },
      data: response["data"]["results"]
    }
  end

  def self.find_char_ids(char_names)
    ids = []
    char_names.each do |char|
      Rails.logger.debug("Searching for characters named: #{char}")
      response = make_call(
        MARVEL_CHARACTERS_URL,
        name: char
      )
      response["data"]["results"].each do |r|
        ids << r["id"]
      end
    end
    ids
  end

  ############### "PRIVATE" ################

  def self.authentication_params
    timestamp = Time.now.to_i.to_s
    hash = Digest::MD5.hexdigest(timestamp + MARVEL_PRIVATE_API_KEY + MARVEL_PUBLIC_API_KEY)
    { ts: timestamp, apikey: MARVEL_PUBLIC_API_KEY, hash: hash }
  end

  def self.make_call(url, params)
    response = RestClient.get(
      url,
      params: params.merge(authentication_params),
      content_type: :json, 
      accept: :json
    )

    # TODO: Error handling

    JSON.parse(response.body)
  end
end