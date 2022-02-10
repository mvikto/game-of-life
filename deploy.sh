set -x
set -e

git checkout master
git pull
pnpm install
pnpm build
git checkout gh-pages
rm index.html
rm -rf assets
cp -r dist/* .
git add .
git commit -m "building time"
git push
git checkout master