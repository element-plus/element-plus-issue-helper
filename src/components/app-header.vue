<script setup lang="ts">
import { useLanguage } from '@/hooks/language'

const { getLangages, lang } = useLanguage()
const languages = getLangages()
</script>

<template>
  <div class="nav-menu">
    <div class="flex items-center ml-4">
      <a href="https://element-plus.org/" target="_blank">
        <img src="@/assets/element-plus-logo.svg" alt="Logo" class="h-6" />
      </a>
    </div>

    <div class="flex">
      <div
        v-for="language in languages"
        :key="language.id"
        :class="{ 'nav-menu-item': true, active: language.id === lang }"
        @click="lang = language.id"
      >
        {{ language.name }}
      </div>
      <a
        class="nav-menu-item"
        href="https://github.com/element-plus/element-plus"
        target="_blank"
      >
        <div class="i-mdi-github text-xl" />
      </a>
    </div>
  </div>
</template>

<style lang="less" scoped>
.nav-menu {
  display: flex;
  justify-content: space-between;
  height: 3rem;
  border-bottom: 1px solid var(--el-border-color-base);

  .nav-menu-item {
    display: flex;
    padding: 0 0.8rem;
    line-height: 3rem;
    font-size: 14px;
    cursor: pointer;
    align-items: center;
    transition: all 0.2s ease-in-out;
    &:hover,
    &.active {
      color: var(--el-color-primary);
    }
  }
}
</style>
