<template>
  <a-config-provider :locale="locale">
    <div id="app" class="main-container">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import('ant-design-vue/dist/antd.css');
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
export default {
  data() {
    return {
      locale: zhCN
    };
  },
  mounted() {},
  methods: {
    moment
  }
};
</script>

<style lang="less">
@import '@/assets/less/reset.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
</style>