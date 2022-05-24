<script setup lang="ts">
import { languages } from '@/hooks/language'
const { lang } = useLanguage()

const dark = useDark()
const toggleDark = useToggle(dark)
</script>

<template>
  <div class="nav-menu">
    <div flex="~" items-center ml-4>
      <a href="https://element-plus.org/" target="_blank">
        <img src="@/assets/element-plus-logo.svg" alt="Logo" h-6 />
      </a>
    </div>

    <div flex="~ gap-5" items-center mr-4>
      <div
        v-for="(name, id) in languages"
        :key="id"
        :class="['nav-menu-item', { active: id === lang }]"
        text-sm
        @click="lang = id"
      >
        {{ name }}
      </div>

      <div
        class="nav-menu-item"
        i-carbon-sun
        dark:i-carbon-moon
        text-xl
        text-black
        dark:text-white
        @click="toggleDark()"
      />

      <a
        class="nav-menu-item"
        href="https://github.com/element-plus/element-plus"
        target="_blank"
        i-mdi-github
        text-xl
        text-black
        dark:text-white
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-menu {
  display: flex;
  justify-content: space-between;
  height: 3rem;
  border-bottom: 1px solid var(--el-border-color);

  .nav-menu-item {
    display: flex;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover,
    &.active {
      color: var(--el-color-primary);
    }
  }
}
</style>
