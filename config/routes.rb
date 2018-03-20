Rails.application.routes.draw do
  namespace :api do
    get 'battle', to: 'battle#index', default: { format: :json }
  end

  root to: 'static_pages#index'
  get '/auth/:provider/callback', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
