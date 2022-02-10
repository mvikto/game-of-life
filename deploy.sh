set -x

git checkout master
git pull
yarn
yarn build
git checkout gh-pages
mv -r dist/* .
git add .
git commit -m "building time"
git push