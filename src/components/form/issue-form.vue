<script setup lang="ts">
import { useForm } from '@/hooks/forms'
import type { ElForm } from 'element-plus'

const { t } = useI18n()
const { form, rules, reset } = $(useForm())

const formRef = $ref<InstanceType<typeof ElForm> | undefined>(undefined)
let preview = $ref(false)

const handlePreview = async () => {
  await formRef?.validate()
  preview = true
}
</script>

<template>
  <el-form
    ref="formRef"
    class="form"
    :model="form"
    :rules="rules"
    label-position="top"
  >
    <el-form-item :label="t('issueType')" prop="type">
      <el-radio-group v-model="form.type">
        <el-radio-button label="bug-report">
          {{ t('issueTypeBugReport') }}
        </el-radio-button>
        <el-radio-button label="feature-request">
          {{ t('issueTypeFeatureRequest') }}
        </el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item :label="t('issueTitle')" prop="title" required>
      <el-input v-model="form.title" />
    </el-form-item>

    <bug-report
      v-if="form.type === 'bug-report'"
      v-model:form="form.bugReport"
    />
    <feature-request
      v-else-if="form.type === 'feature-request'"
      v-model:form="form.featureRequest"
    />

    <el-form-item :label="t('bug.additionalComments')" prop="additional">
      <el-input
        v-model="form.additional"
        class="font-mono"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 10 }"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        class="flex-grow-0"
        type="primary"
        size="large"
        @click="handlePreview"
      >
        {{ t('preview') }}
      </el-button>
      <div class="flex-1 text-right">
        <el-button type="danger" plain @click="reset">
          {{ t('resetForm') }}
        </el-button>
      </div>
    </el-form-item>
  </el-form>

  <issue-preview v-model="preview" :form="form" />
</template>

<style lang="less" scoped>
.form {
  :deep(.el-form--label-top .el-form-item__label) {
    padding-bottom: 0;
  }

  :deep(.el-form-item--default.el-form-item) {
    margin-bottom: 8px;
  }

  :deep(.sub-title) {
    border-bottom: 1px solid var(--el-border-color-base);
    color: #333;
    padding-bottom: 0.25rem;
    margin: 1rem 0 0.5rem 0;
  }
}
</style>
