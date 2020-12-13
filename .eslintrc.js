module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser', // 指定ESLint解析器
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended', // 使用来自 @eslint-plugin-react 的推荐规则
    'plugin:@typescript-eslint/recommended', // 使用来自@typescript-eslint/eslint-plugin的推荐规则
    'prettier/@typescript-eslint', // 使用 ESLint -config-prettier 禁用来自@typescript-eslint/ ESLint 与 prettier 冲突的 ESLint 规则
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:import/errors',
  ],
  parserOptions: {
    ecmaVersion: 2018, // 允许解析最新的 ECMAScript 特性
    sourceType: 'module', // 允许使用 import
    ecmaFeatures: {
      jsx: true, // 允许对JSX进行解析
      tsx: true,
    },
  },
  rules: {
    // 自定义规则
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'linebreak-style': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'ts', 'tsx'] }],
    'no-console': 0,
    'no-shadow': 0,
    'no-use-before-define': 0,
    'global-require': 0,
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-var-requires': ['off'],
  },
  settings: {
    react: {
      version: 'detect', // 告诉 eslint-plugin-react 自动检测 React 的版本
    },
  },
};
