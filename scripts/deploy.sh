#!/usr/bin/bash

pnpm build
cd dist
git init .
echo "tools.shu.moe" > CNAME
git add .
git commit -m 'github pages'
git remote add origin https://github.com/ocian/tools.shu.moe.git
git push origin main:gh-pages -f