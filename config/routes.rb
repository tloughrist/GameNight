Rails.application.routes.draw do
  
  resources :messages, only: [:create, :show, :destroy]
  resources :attendances, only: [:create, :update, :destroy]
  resources :invitations, only: [:create, :show, :destroy]
  resources :game_nights, only: [:create, :update, :destroy, :show]
  resources :friend_requests, only: [:index, :create, :show, :destroy]
  resources :friendships, only: [:create, :show]
  resources :user_games, only: [:create, :show, :destroy]
  resources :games, only: [:index, :show, :create, :update, :destroy]
  resources :users, only: [:index, :update, :destroy]

  post "/signup", to: "users#create"
  get "/me", to: "users#self"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "users/:id/search", to: "users#find"
  get "users/:id/friends", to: "users#get_friends"
  get "/users/:user_id/messages/", to: "messages#get_messages"
  get "/users/:user_id/games/", to: "user_games#get_games"
  get "game/search", to: "games#find"
  get "users/game_nights/:user_id", to: "game_nights#get_nights"
  get "game_nights/:id/invitees", to: "game_nights#get_invitees"
  get "game_nights/:id/attendees", to: "game_nights#get_attendees"
  get "users/:id/friend_requests", to: "users#get_friend_requests"
  delete "friendships/:user_id/:friend_id", to: "friendships#destroy"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
