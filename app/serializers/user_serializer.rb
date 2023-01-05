class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :blurb, :dob, :pronouns, :email
end
