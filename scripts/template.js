// 组件模板
module.exports = {
  vueTemplate: compoenntName => {
    return `<template>
    <div class="main-container">${compoenntName}内容区域</div>
  </template>
  <script>
  export default {
    name: '${compoenntName}',
    data() { return {}; },
    watch: {},
    created() {},
    methods: {}
  };
  </script>
  <style lang="less" scoped>

  </style>`;
  }
};