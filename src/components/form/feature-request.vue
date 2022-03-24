<script setup lang="ts">
import { featureTypes, useComponentList } from '@/hooks/forms'
import { useTexts } from '@/hooks/texts'
import { useSupportedEpVersion } from '@/utils'
import type { FormFeatureRequest } from '@/hooks/forms'
const { t } = useI18n()
const { MarkdownSupported } = useTexts()

const props = defineProps<{
  form: FormFeatureRequest
}>()
const emit = defineEmits<{
  (name: 'update:form', form: FormFeatureRequest): void
}>()

const form = $(useVModel(props, 'form', emit))

const featureTypesText = $computed(() =>
  featureTypes.map((type) => t(`feature.featureTypes.${type}`, type))
)

const epVersions = useSupportedEpVersion()
const components = useComponentList(epVersions)
</script>

<template>
  <el-form-item
    :label="t('feature.featureType')"
    prop="featureRequest.featureType"
    required
  >
    <el-select v-model="form.featureType" clearable>
      <el-option
        v-for="(featureType, index) in featureTypes"
        :key="featureType"
        :value="featureType"
        :label="featureTypesText[index]"
      />
    </el-select>
  </el-form-item>

  <el-form-item
    v-if="form.featureType === 'New Component'"
    :label="t('feature.newComponentName')"
    prop="featureRequest.newComponentName"
    required
  >
    <el-input v-model="form.newComponentName" placeholder="e.g. ElHelloWorld" />
  </el-form-item>

  <el-form-item
    v-else
    :label="t('feature.enhancedComponentName')"
    prop="featureRequest.enhancedComponentName"
    required
  >
    <el-select
      v-model="form.enhancedComponentName"
      filterable
      style="width: 100%"
    >
      <el-option
        v-for="component in ['All', 'N/A', ...components]"
        :key="component"
        :label="component"
        :value="component"
      />
    </el-select>
  </el-form-item>

  <div class="bg-#fdf6ec" rounded-lg mt-4 mb-2 p-4 text-gray-600>
    <markdown-supported />
  </div>

  <el-form-item
    :label="t('feature.description')"
    prop="featureRequest.description"
    required
  >
    <el-input
      v-model="form.description"
      font-mono
      type="textarea"
      :autosize="{ minRows: 3, maxRows: 10 }"
  /></el-form-item>
</template>
