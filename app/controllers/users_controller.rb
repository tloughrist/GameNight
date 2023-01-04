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
        user = User.find_by(id: params[:id])
        if user
          render json: user
        else
          render json: { error: "User not found" }, status: :not_found
        end
    end

    def show
      user = User.find_by(id: session[:user_id])
      if user
        render json: user
      else
        render json: { error: "Not authorized" }, status: :unauthorized
      end
    end

    def update
        user = User.find_by(id: session[:user_id])
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