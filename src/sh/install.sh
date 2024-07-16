echo "开始克隆mz-bot"
git clone "https://gitee.com/xyb12345678qwe/mz-bot"
# 检查克隆是否成功
if [ $? -eq 0 ]; then
    echo "克隆成功"
    echo "开始安装依赖(如遇安装缓慢请更换npm源)"
    cd mz-bot
    NPM_CONFIG_REGISTRY=https://registry.npm.taobao.org npm i yarn -g
    yarn install
    if [ $? -eq 0 ]; then
        echo "安装依赖成功"
    else
        echo "安装依赖失败"
    fi
else
    echo "克隆失败"
fi
