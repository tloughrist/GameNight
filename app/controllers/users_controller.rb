class UsersController < ApplicationController

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

    def show
        user = User.find_by(id: params[:id])
        if user
          render json: user
        else
          render json: { error: "User not found" }, status: :not_found
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
        params.permit(:username, :dob, :pronouns, :blurb, :password, :password_confirmation)
    end

end