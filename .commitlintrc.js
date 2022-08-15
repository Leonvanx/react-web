/**
 * feat：新功能
 * fix：修补 BUG
 * docs：修改文档，比如 README, CHANGELOG, CONTRIBUTE 等等
 * style：不改变代码逻辑 (仅仅修改了空格、格式缩进、逗号等等)
 * refactor：重构（既不修复错误也不添加功能）
 * perf：优化相关，比如提升性能、体验
 * test：增加测试，包括单元测试、集成测试等
 * build：构建系统或外部依赖项的更改
 * ci：自动化流程配置或脚本修改
 * chore：非 src 和 test 的修改，发布版本等
 * revert：恢复先前的提交
 * 详情见https://www.conventionalcommits.org/en/v1.0.0/
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert']
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72]
  }
};
