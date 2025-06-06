#!/usr/bin/env bash

TRIES=${TRIES:-5}
WAIT=${WAIT:-5}
MIGR_DONE=0

# attempt to push db schema, retry on error
while
    npm run db:migr
    if [[ $? -eq 0 ]]; then
        MIGR_DONE=1
        TRIES=0
    else
        TRIES=$(($TRIES - 1))
    fi
    [[ $TRIES -gt 0 ]]
do
    sleep $WAIT
done

# exit if migrations failed
if [[ $MIGR_DONE -eq 0 ]]; then
    exit 1
fi

# start the app
npm run start:prod
