
class Upvote < ApplicationRecord
  validates :comic_id, presence: true

  def self.upvote(comic_id)
    find_or_create_by!(comic_id: comic_id)
  end

  def self.downvote(comic_id)
    where(comic_id: comic_id).delete_all
  end

  def self.upvoted?(comic_id)
    find_by(comic_id: comic_id).present?
  end
end