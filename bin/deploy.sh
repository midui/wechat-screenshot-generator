#! /bin/bash
set -e

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
echo $TRAVIS_PULL_REQUEST
echo $TRAVIS_BRANCH
echo $SOURCE_BRANCH
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    npm test
    npm run build
    exit 0
fi

npm test
npm run build

git remote add coding git@git.coding.net:xcatliu/wechat-screenshot-generator.git

git checkout master
git push coding master

rm -rf .deploy
git clone git@github.com:open-ideas-club/wechat-screenshot-generator.git .deploy

cd .deploy
git remote add coding git@git.coding.net:xcatliu/wechat-screenshot-generator.git

git checkout gh-pages

rsync -a ../public/ ./

if [ -n "$(git status --porcelain)" ]; then
  git add --all
  git commit -m "Update gh-pages"
  git push origin gh-pages
  git push coding gh-pages:coding-pages
else
  echo "No updates"
fi

cd ..
rm -rf .deploy
