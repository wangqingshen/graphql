<template>
  <keep-alive :include="includeComponents">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: 'blank',
  computed: {
    includeComponents() {
      return [];
    }
  }
};
</script>

<style >
</style>