#!/bin/bash

shopt -s dotglob

mkdir public
cp -r chains public
cp vercel.json public

exit 0
