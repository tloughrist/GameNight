Rails.application.routes.draw do
  
  resources :attendances, only: [:create, :update]
  resources :invitations, only: [:create, :destroy]
  resources :game_nights, only: [:create, :update, :destroy]
  resources :friend_requests, only: [:create, :show, :destroy]
  resources :friendships, only: [:create, :show]
  resources :users, only: [:update, :destroy]

  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  get "/me", to: "users#self"
  get "/invitations/:user_id", to: "invitations#fetch"
  get "/attendances/:user_id", to: "attendances#fetch"
  get "/users/:id/search", to: "users#find"
  get "/users/:id/friends", to: "users#get_friends"
  get "/users/game_nights/:user_id", to: "game_nights#get_nights"
  get "/game_nights/:user_id", to: "game_nights#get_packages"
  get "/game_nights/:id/invitees", to: "game_nights#get_invitees"
  get "/game_nights/:id/attendees", to: "game_nights#get_attendees"
  get "/users/:id/friend_requests", to: "users#get_friend_requests"
  delete "/logout", to: "sessions#destroy"
  delete "/friendships/:user_id/:friend_id", to: "friendships#destroy"
  delete "/uninvite/:invitee_id/:game_night_id", to: "invitations#destroy"
  delete "/unattend/:attendee_id/:game_night_id", to: "attendances#destroy"
 
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end