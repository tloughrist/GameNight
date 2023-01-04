class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :password_digest, :blurb, :dob, :pronouns, :email
end
