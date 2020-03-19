## 如何使用
1. 模版repo https://github.com/ryanaltair/suanpan_nodejs_template/
2. 点击 __Use_This_Template__ 按钮创建 github repo
3. 将 repo 代码 git clone 到本地

## 初始化
### 修改项目信息
修改package.json中相关信息
例如 
- name 
- description 
- keywords 
- author 
- license

### 修改待推送容器名字与标签
修改package.json中的suanpan_image_name的子条目
{
    amd64:"amd64_image_name_with_namespace",
    arm64_v8:"amd64_image_name_with_namespace"
}

## 构建容器
### 使用以下npm命令构建容器
- 多平台构建 `cross_build_docker`
    > 需要本地支持多平台构建
- 构建并推送 `npm run docker`
    > 需要登录对应registry
- 仅构建不推送 `npm run buildDocker`

### 可使用 tools/update.sh 将代码rsync到指定位置并构建
> 需要修改update.sh文件
`npm run syncBuild`

### 推荐使用npm version 来更新版本号
强烈简易使用semver
