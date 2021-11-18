<script lang="ts" setup>
const version = import.meta.env.VERSION
</script>

<template>
  <el-divider />
  <p
    class="flex justify-center text-base"
    style="color: var(--el-color-primary)"
  >
    <img
      src="@/assets/element-plus-logo-small.svg"
      alt="Logo"
      class="h-6 mr-1"
    />
    <a
      class="no-underline"
      style="color: var(--el-color-primary)"
      href="https://github.com/element-plus/element-plus-issue-helper"
    >
      Element Plus Issue Helper v{{ version }}
    </a>
  </p>
</template>
