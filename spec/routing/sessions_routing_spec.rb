require 'rails_helper'

RSpec.describe SessionsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(:get => '/auth/github/callback').to route_to(
        'sessions#create',
        provider: 'github'
      )
    end
  end
end
