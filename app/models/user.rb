class User < ApplicationRecord

  has_secure_password
  before_create :assign_random_profile_picture

  validates :username, 
  length: { in: 6..30 },
  format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" },
  presence: true, 
  uniqueness: true

  validates :email, 
  length: { in: 3..255 },
  format: { with: URI::MailTo::EMAIL_REGEXP },
  presence: true, 
  uniqueness: true

  has_one_attached :photo

  has_many :listings,
  class_name: :Listing,
  foreign_key: :lister_id,
  dependent: :destroy

  has_many :reservations,
  foreign_key: :reserver_id

  has_many :trip_listings,
  through: :reservations,
  source: :listing

  has_many :reviews_given,
  class_name: :Review,
  foreign_key: :reviewer_id,
  dependent: :destroy


  validates :password_digest, presence: true

  validates :session_token, presence: true, uniqueness: true


  before_validation :ensure_session_token


  def self.find_by_credentials(credential, password)
    field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
    user = User.find_by(field => credential)
    user&.authenticate(password)
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end

 
  private 

  def assign_random_profile_picture
    profile_picture_links = [
      "https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg", #Blue
      "https://i.pinimg.com/originals/46/72/f8/4672f876389036583190d93a71aa6cb2.jpg",  #Red 
      "https://i.pinimg.com/originals/f1/da/a7/f1daa70c9e3343cebd66ac2342d5be3f.jpg",  # Green
      "https://tdsknutsford.com/wp-content/uploads/2015/08/icon-profile-yellow.png",   # Yellow 
      "https://i.pinimg.com/236x/dc/83/30/dc8330010f904860bb5f81e66cd02f5c.jpg?nii=t", # Orange 
      "https://i.pinimg.com/originals/91/2c/e1/912ce19bfeadb1e9e2b7cee8f0a4f1bc.jpg", #Purple
      "https://i.pinimg.com/originals/bd/70/22/bd702201a2b6d8960734f60f34a22754.jpg", #Pink
      "https://i.pinimg.com/originals/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg", #Brown
    ]
    self.profile_picture ||= profile_picture_links.sample

  end 


  def generate_unique_session_token
      self.session_token = SecureRandom::urlsafe_base64
      while User.find_by(session_token: self.session_token)
          self.session_token = SecureRandom::urlsafe_base64
      end
      self.session_token
  end

  def ensure_session_token
      self.session_token ||= generate_unique_session_token
  end


end
