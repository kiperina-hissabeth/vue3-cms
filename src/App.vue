<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'App'
})

import { zhCn } from 'element-plus/es/locales.mjs'
</script>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
