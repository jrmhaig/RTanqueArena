require 'rails_helper'

RSpec.describe User, type: :model do
  describe '.from_omniauth' do
    let(:oauth_data) {
      {
        'provider'=>'github',
        'uid'=>'1234567',
        'info'=>
          {
            'nickname'=>'btables',
            'name'=>'Bobby Tables',
            'image'=>'https://imgs.xkcd.com/comics/exploits_of_a_mom.png'
          }
      }
    }

    it 'registers a new user' do
      expect{User.from_omniauth(oauth_data)}.to change(User, :count).by 1
    end

    it 'does not register a duplicate user' do
      User.from_omniauth(oauth_data)
      expect{User.from_omniauth(oauth_data)}.to change(User, :count).by 0
    end

    it 'gets the users name' do
      expect(User.from_omniauth(oauth_data).name).to eq 'Bobby Tables'
    end

    it 'gets the users nickname' do
      expect(User.from_omniauth(oauth_data).nickname).to eq 'btables'
    end

    it 'gets the users avitar' do
      expect(User.from_omniauth(oauth_data).image_url).to eq 'https://imgs.xkcd.com/comics/exploits_of_a_mom.png'
    end
  end
end
