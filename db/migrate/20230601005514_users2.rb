class Users2 < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :name, :string
    add_column :users, :profile_picture, :string, default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
  end
end
