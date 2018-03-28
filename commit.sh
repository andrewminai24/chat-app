#!/bin/sh

read commitMessage

git add -f *
git commit -m commitMessage
git push origin master
