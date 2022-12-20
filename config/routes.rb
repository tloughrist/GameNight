Rails.application.routes.draw do
  
  resources :messages
  resources :attendances
  resources :invitations
  resources :game_nights
  resources :friend_requests
  resources :friendships
  resources :user_games
  resources :games
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
