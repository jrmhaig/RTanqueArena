Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github, Chamber.env.oauth.github.id, Chamber.env.oauth.github.secret
end
