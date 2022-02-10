set -x

git checkout master
git pull
pnpm install
pnpm build
git checkout gh-pages
cp -r dist/* .
git add .
git commit -m "building time"
git push