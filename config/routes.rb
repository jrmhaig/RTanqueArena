Rails.application.routes.draw do
  root to: 'static_pages#index'
  get '/auth/:provider/callback', to: 'sessions#create'
end
