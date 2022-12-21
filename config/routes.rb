Rails.application.routes.draw do
  
  resources :messages, only: [:create, :show, :destroy]
  resources :attendances, only: [:create, :update, :destroy]
  resources :invitations, only: [:create, :show, :destroy]
  resources :game_nights, only: [:create, :update, :destroy, :show]
  resources :friend_requests, only: [:create, :show, :destroy]
  resources :friendships, only: [:create, :show, :destroy]
  resources :user_games, only: [:create, :show, :destroy]
  resources :games, only: [:index, :show, :create, :update, :destroy]
  resources :users, only: [:index, :show, :create, :update, :destroy]
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
