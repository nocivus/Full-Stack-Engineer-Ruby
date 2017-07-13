def self.authentication_params
  timestamp = Time.now.to_i.to_s
  hash = Digest::MD5.hexdigest(timestamp + MARVEL_PRIVATE_API_KEY + MARVEL_PUBLIC_API_KEY)
  { ts: timestamp, apikey: MARVEL_PUBLIC_API_KEY, hash: hash }
end

task comics: :environment do
  response = RestClient.get(
    MARVEL_COMICS_URL,
    params: {
      orderBy: :modified,
      limit: 1
    }.merge(authentication_params),
    content_type: :json, 
    accept: :json
  )

  # TODO: Error handling

  pp JSON.parse(response.body)
end