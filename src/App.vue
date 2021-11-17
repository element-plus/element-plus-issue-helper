<script setup lang="ts">
import AppHeader from '@/components/app-header.vue'
import AppContent from '@/components/app-content.vue'

import { useLanguage } from './hooks/language'

const { language } = useLanguage()
</script>

<template>
  <el-config-provider :locale="language.locale">
    <div class="antialiased">
      <app-header />
      <app-content />
    </div>
  </el-config-provider>
</template>

<style lang="less">
body {
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

a:hover,
a:active {
  color: var(--el-color-primary);
  text-decoration: underline;
}
</style>
