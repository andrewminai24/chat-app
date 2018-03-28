#!/bin/sh

echo "Enter the commit message"
read commitMessage
git add -f *
git commit -m $commitMessage
git push origin master
