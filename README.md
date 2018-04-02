# RTanque Arena

This application is very much in development but if you have found it you are
most welcome.

At the moment I am using OAuth authentication although nothing is currently
restricted behind user log in. However, the encrypted credential will prevent
you from starting the application without my private key (see
https://github.com/jrmhaig/RTanqueArena/issues/1 for details). The simplest
solution is the edit `config/settings.yml` to change the keys `_secure_id` and
`_secure_secret` to `id` and `secret` respectively. Authentication will then
fail but the application should work otherwise.

## Requirements

* yarn. See https://yarnpkg.com/lang/en/docs/install/
