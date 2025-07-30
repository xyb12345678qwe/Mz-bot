#!/bin/bash

# 遍历 package 目录下的所有子目录
for dir in */ ; do
  if [ -f "$dir/package.json" ]; then
    echo "Building $dir"
    (cd "$dir" && npm run build)
  fi
done