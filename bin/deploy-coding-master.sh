#! /bin/bash
set -e

git checkout master

git remote add coding git@git.coding.net:open-ideas-club/wechat-screenshot-generator.git
git push coding master
