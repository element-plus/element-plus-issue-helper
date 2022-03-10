<script lang="ts" setup>
const version = import.meta.env.APP_VERSION
</script>

<template>
  <el-divider />
  <p flex="~" justify-center text-base style="color: var(--el-color-primary)">
    <img src="@/assets/element-plus-logo-small.svg" alt="Logo" h-6 mr-1 />
    <a
      no-underline
      style="color: var(--el-color-primary)"
      href="https://github.com/element-plus/element-plus-issue-helper"
      target="_blank"
    >
      Element Plus Issue Helper v{{ version }}
    </a>
  </p>
</template>
