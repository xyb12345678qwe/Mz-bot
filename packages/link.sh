#!/bin/bash

# 遍历所有子目录
for dir in */ ; do
  if [ -f "${dir}package.json" ]; then
    echo "📦 处理项目: $dir"
    
    # 进入项目目录
    cd "$dir" || continue
    
    
    # 发布到 npm
    echo "🚀 开始link"
    bun link
    
    # 返回上级目录
    cd ..
    echo "✅ $dir link完成"
    echo "----------------------------------------"
  fi
done

echo "🎉 所有项目link完成！"