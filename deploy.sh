#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

sudo git init
sudo git add -A
sudo git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/自定义目录blog,也是git上的目录
sudo git push -f git@github.com:Huxiaodan120808/blog.git master:gh-pages

cd -