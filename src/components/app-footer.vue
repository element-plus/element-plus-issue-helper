<script lang="ts" setup>
const version = process.env.VERSION
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
    Element Plus Issue Helper v{{ version }}
  </p>
</template>
