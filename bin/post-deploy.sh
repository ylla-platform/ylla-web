#!/usr/bin/env bash

# load node v6
. $HOME/.bashrc
. "$NVM_DIR/nvm.sh" && nvm use v12

production=$YLLA_PRODUCTION_HOST
host=$(hostname)
name=ylla
project=ylla-web

node -v
npm -v

echo "current host: $host production: $production"

if [[ $host == "$production" ]]; then
  cd $HOME/www/${name}/${project}
  #npm i
  #npm run start:cluster &
fi
