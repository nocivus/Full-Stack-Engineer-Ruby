Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # List of comics
  get "/comics/" => "comics#index", as: :comics

  root "application#main"
end
