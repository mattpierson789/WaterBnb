json.user do
  json.extract! @user, :id, :email, :username, :first_name, :last_name, :profile_picture, :created_at, :updated_at
end
