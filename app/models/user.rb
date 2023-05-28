class User < ApplicationRecord

  has_secure_password

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
