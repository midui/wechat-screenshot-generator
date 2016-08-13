#! /bin/bash

rm -rf .deploy_gh_pages
git clone git@github.com:open-ideas-club/wechat-screenshot-generator.git .deploy_gh_pages
cd .deploy_gh_pages

git checkout gh-pages

rsync -a ../public/ ./

git add --all
git commit -m "Update gh-pages"
git push origin gh-pages

cd ..
rm -rf .deploy_gh_pages
