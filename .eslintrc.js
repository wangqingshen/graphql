module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    quotes: ['error', 'single'], //强制使用单引号
    semi: ['error', 'always'], //强制不使用分号结尾
    eqeqeq: ['error', 'always'], // 强制在任何情况下都使用 === 和 !==
    'brace-style': ['error', '1tbs', {
      allowSingleLine: true
    }], //强制在代码块中使用一致的大括号风格
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      'registeredComponentsOnly': false,
      'ignores': []
    }], //强制引入组件时在 DOM 模板中总是 kebab-case 的
    'vue/prop-name-casing': ['error', 'camelCase'], //在声明 prop 的时候，其命名应该始终使用 camelCase
    'vue/require-prop-types': 'error', //props定义尽量详细
    'vue/require-v-for-key': 'error', //给v-for设置键值，与key结合使用
    'vue/no-use-v-if-with-v-for': ['error', {
      'allowUsingIterationVar': false
    }], //不要把 v-if 和 v-for 用在同一个元素上
    'vue/max-attributes-per-line': ['error', {
      'singleline': 10,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }], //多个特性的元素应该分多行撰写，每个特性一行
    'vue/v-bind-style': ['error', 'shorthand'], //指令缩写
    'vue/v-on-style': ['error', 'shorthand'], //指令缩写
    'vue/order-in-components': ['error', {
      'order': [
        'el',
        'name',
        'parent',
        'functional',
        ['delimiters', 'comments'],
        ['components', 'directives', 'filters'],
        'extends',
        'mixins',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'data',
        'computed',
        'watch',
        'LIFECYCLE_HOOKS',
        'methods',
        ['template', 'render'],
        'renderError'
      ]
    }], //组件/实例的选项的顺序
    'vue/attributes-order': ['error', {
      'order': [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'GLOBAL',
        'UNIQUE',
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'EVENTS',
        'CONTENT'
      ]
    }], //元素/组件特性的顺序
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    // parser: '@typescript-eslint/parser'
    parser: 'babel-eslint'
  }
}