require 'rails_helper'

RSpec.describe SessionsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/auth/github/callback').to route_to(
        'sessions#create',
        provider: 'github'
      )
    end

    it 'routes to #destroy' do
      expect(delete: '/logout').to route_to 'sessions#destroy'
    end
  end
end
