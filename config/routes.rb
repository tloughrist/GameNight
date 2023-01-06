Rails.application.routes.draw do
  
  resources :messages, only: [:create, :show, :destroy]
  resources :attendances, only: [:create, :update, :destroy]
  resources :invitations, only: [:create, :show, :destroy]
  resources :game_nights, only: [:create, :update, :destroy, :show]
  resources :friend_requests, only: [:index, :create, :show, :destroy]
  resources :friendships, only: [:create, :show, :destroy]
  resources :user_games, only: [:create, :show, :destroy]
  resources :games, only: [:index, :show, :create, :update, :destroy]
  resources :users, only: [:index, :show, :update, :destroy]

  post "/signup", to: "users#create"
  get "/me", to: "users#self"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "user/search", to: "users#find"
  get "/friends/:id", to: "users#get_friends"
  delete "users/:user_id/friends/:friend_id", to: "friendships#destroy"
  get "/users/:user_id/messages/", to: "messages#get_messages"
  get "/users/:user_id/games/", to: "user_games#get_games"
  get "game/search", to: "games#find"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
