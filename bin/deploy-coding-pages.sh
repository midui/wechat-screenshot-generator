#! /bin/bash

rm -rf .deploy_coding_pages
git clone git@github.com:open-ideas-club/wechat-screenshot-generator.git .deploy_coding_pages
cd .deploy_coding_pages

git checkout coding-pages

rsync -a ../public/ ./

git add --all
git commit -m "Update coding-pages"
git push origin coding-pages

cd ..
rm -rf .deploy_coding_pages
