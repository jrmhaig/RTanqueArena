class User < ApplicationRecord
  def self.from_omniauth auth_hash
    user = find_or_create_by(
             uid: auth_hash['uid'],
             provider: auth_hash['provider']
           )
    user.name = auth_hash['info']['name']
    user.nickname = auth_hash['info']['nickname']
    user.image_url = auth_hash['info']['image']
    user.save!
    user
  end
end
