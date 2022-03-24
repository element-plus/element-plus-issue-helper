<script setup lang="ts">
import { languages, useLanguage } from '@/hooks/language'

const { lang } = useLanguage()
</script>

<template>
  <div class="nav-menu">
    <div flex="~" items-center ml-4>
      <a href="https://element-plus.org/" target="_blank">
        <img src="@/assets/element-plus-logo.svg" alt="Logo" h-6 />
      </a>
    </div>

    <div flex>
      <div
        v-for="(name, id) in languages"
        :key="id"
        :class="{ 'nav-menu-item': true, active: id === lang }"
        @click="lang = id"
      >
        {{ name }}
      </div>
      <a
        class="nav-menu-item"
        href="https://github.com/element-plus/element-plus"
        target="_blank"
      >
        <span i-mdi-github text-xl text-black />
      </a>
    </div>
  </div>
</template>

<style lang="less" scoped>
.nav-menu {
  display: flex;
  justify-content: space-between;
  height: 3rem;
  border-bottom: 1px solid var(--el-border-color);

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
