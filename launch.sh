#!/usr/bin/env bash

TRIES=5
MIGR_DONE=0

while
    npm run db:migrate
    if [[ $? -eq 0 ]]; then
        MIGR_DONE=1
        TRIES=0
    else
        TRIES=$(($TRIES - 1))
    fi
    [[ $TRIES -gt 0 ]]
do
    sleep 3
done

if [[ $MIGR_DONE -eq 1 ]]; then
    npm run start:prod
else
    exit 1
fi