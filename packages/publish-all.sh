#!/bin/bash
# publish-all.sh

# 遍历所有子目录
for dir in */ ; do
  if [ -f "${dir}package.json" ]; then
    echo "📦 处理项目: $dir"
    
    # 进入项目目录
    cd "$dir" || continue
  
    
    # 执行构建
    echo "🏗️ 构建项目..."
    npm run build
    
    
    # 发布到 npm
    echo "🚀 发布到 npm..."
    npm publish
    
    # 返回上级目录
    cd ..
    echo "✅ $dir 发布完成"
    echo "----------------------------------------"
  fi
done

echo "🎉 所有项目发布完成！"