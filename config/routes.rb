Rails.application.routes.draw do
  # List of comics
  get  "/comics/"             => "comics#index",    as: :comics

  # Up and downvotes
  post "/comics/:id/upvote"   => "comics#upvote",   as: :upvote
  post "/comics/:id/downvote" => "comics#downvote", as: :downvote

  # Main entry point
  root "application#main"
end
