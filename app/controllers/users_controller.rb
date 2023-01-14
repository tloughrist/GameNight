class UsersController < ApplicationController

  before_action :authorize
  skip_before_action :authorize, only: [:create]

    def create
        user = User.create(user_params)
        if user.valid?
          session[:user_id] = user.id
          render json: user, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
        users = User.all
        render json: users, status: :accepted
    end

    def find
        users = User.where('username LIKE ?', '%' + params[:query] + '%').all
        if users.size > 0
          def has_existing_request(receiver, sender_id)
            requests = receiver.receiver_friend_requests
            if requests.size > 0
              matching_request = requests.find_by(sender_id: sender_id)
              if matching_request
                true
              else
                false
              end
            end
          end
          users_w_requests = users.map {|user| {user: user, requests: has_existing_request(user, params[:id]) || has_existing_request(User.find_by(id: params[:id]), user.id)}}
          render json: users_w_requests
        else
          render json: { error: "No users match search criteria" }, status: :not_found
        end
    end

    def self
      user = User.find_by(id: session[:user_id])
      if user
        render json: user
      else
        render json: { error: "Not authorized" }, status: :unauthorized
      end
    end

    def show
      user = User.find_by(id: params[:id])
      if user
        render json: user
      else
        render json: { error: "User not found" }, status: :not_found
      end
    end

    def get_friends
      user = User.find(params[:id])
      friends = user.friends
      render json: friends
    end

    def get_friend_requests
      user = User.find(params[:id])
      requests = user.receiver_friend_requests
      package = requests.map {|request| {request_id: request.id, sender_id: request.sender.id, sender_name: request.sender.name, sender_username: request.sender.username}}
      render json: package
    end 

    def get_games
      packaged_games = Game.all.map {|game| game.package_game(params[:id])}
      games = packaged_games.select {|game| game[:owned] == true || game[:originated] == true}
      render json: games
    end

    def update
        user = User.find(params[:id])
        user.update(user_params)
        if user.valid?
          session[:user_id] = user.id
          render json: user, status: :accepted
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        user.delete
        head :no_content
    end

    private

    def user_params
        params.permit(:name, :username, :dob, :pronouns, :blurb, :password, :email)
    end

    def authorize
      return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

end