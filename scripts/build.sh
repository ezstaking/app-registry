#!/bin/bash

shopt -s dotglob

rm -rf public
mkdir public
cp -r chains public
# cp vercel.json public

exit 0
