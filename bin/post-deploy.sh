#!/usr/bin/env bash

# load node
. $HOME/.bashrc
. "$NVM_DIR/nvm.sh" && nvm use v11

host=$(hostname)
name=ylla
project=ylla-web

. $HOME/www/${name}/${project}/.env

production=$YLLA_PRODUCTION_HOST
development=$YLLA_DEVELOPMENT_HOST

node -v
npm -v

echo "current host: $host production: $production development: $development"

if [[ $host == "$production" ]] || [[ $host == "$development" ]]; then
  cd $HOME/www/${name}/${project}
  # npm run restart:production
fi
