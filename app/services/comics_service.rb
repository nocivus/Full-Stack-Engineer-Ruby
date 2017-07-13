
# The comics service
class ComicsService
  def self.get_comics(page, per_page)
    response = RestClient.get(
      MARVEL_COMICS_URL,
      params: {
        # orderBy: "-onsaleDate",
        orderBy: "-focDate",
        limit: per_page,
        offset: (page - 1) * per_page
      }.merge(authentication_params),
      content_type: :json, 
      accept: :json
    )

    # TODO: Error handling

    json = JSON.parse(response.body)
    {
      metadata: {
        page: page,
        per_page: per_page,
        total_count: json["data"]["total"]
      },
      data: json["data"]["results"]
    }
  end

  ############### "PRIVATE" ################

  def self.authentication_params
    timestamp = Time.now.to_i.to_s
    hash = Digest::MD5.hexdigest(timestamp + MARVEL_PRIVATE_API_KEY + MARVEL_PUBLIC_API_KEY)
    { ts: timestamp, apikey: MARVEL_PUBLIC_API_KEY, hash: hash }
  end
end