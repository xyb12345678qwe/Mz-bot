import { access } from 'fs/promises';
import { join } from 'path';

interface OptionalDependency<T> {
  isAvailable: boolean;
  module?: T;
  error?: Error;
}

async function loadOptional<T = any>(
  name: string,
  options?: {
    versionCheck?: string;
    importPath?: string; // 支持子路径导入
  }
): Promise<OptionalDependency<T>> {
  const result: OptionalDependency<T> = { isAvailable: false };

  try {
    // 1. 检查物理路径是否存在
    const modulePath = require.resolve(name, {
      paths: [process.cwd()]
    });
    await access(modulePath);

    // 2. 动态加载
    const mod = await import(options?.importPath || name);
    const module = mod?.default ?? mod;

    // 3. 版本验证（可选）
    if (options?.versionCheck && module.version) {
      const semver = await import('semver');
      if (!semver.satisfies(module.version, options.versionCheck)) {
        throw new Error(`Version requirement not met: ${options.versionCheck}`);
      }
    }

    return {
      isAvailable: true,
      module
    };
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return result; // 正常情况，不标记为错误
    }
    return {
      isAvailable: false,
      error: err instanceof Error ? err : new Error(String(err))
    };
  }
}

// 使用示例
// const { isAvailable, module: axios } = await loadOptional('axios');
// if (isAvailable) {
//   await axios.get('https://example.com');
// }
await loadOptional('@mz-botjs/adapter_onebotv11')