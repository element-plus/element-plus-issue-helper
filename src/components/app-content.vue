<script setup lang="ts">
const { t } = useI18n()
const { BeforeYouStart } = toRefs(useTexts())
</script>

<template>
  <el-row class="content" justify="center">
    <el-col :xs="18" :sm="18" :md="12">
      <div class="bg-#ecf5ff dark:bg-dark" rounded-lg my-4 p-4>
        <h1 my-1 fw-400>{{ t('beforeYouStart') }}</h1>
        <p leading-6>
          <BeforeYouStart />
        </p>
        <!-- <a text-base tabindex="-1">{{ t('whyStrict') }} (WIP)</a> -->
      </div>

      <issue-form />
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.content {
  :deep(a) {
    text-decoration: none;
    color: var(--el-color-primary);
  }
}
</style>
