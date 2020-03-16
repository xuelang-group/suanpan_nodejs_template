## 如何使用
1. 模版repo https://github.com/ryanaltair/suanpan_nodejs_template/
2. 点击 __Use_This_Template__ 按钮创建 github repo
3. 将 repo 代码 git clone 到本地

## 初始化
git clone your.repo

## 如何构建容器
### 修改待推送容器名字与标签
- `nano docker/imagename`
- `nano docker/version`

### 推荐使用以下npm命令构建容器
- 构建并推送 `npm run docker`
- 仅构建不推送 `npm run buildDockerOnly`

### 可使用 tools/update.sh 将代码rsync到指定位置并构建
> 需要修改update.sh文件
`npm run syncBuild`
