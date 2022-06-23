<script setup>
const example = `
## I would like to have a component \`ElEllipse\` / 我需要一个组件 \`ElEllipse\`

### Features / 特性
1. Be able to truncate texts. / 可以截断文本。
2. Be able to show tooltips / 可以有文字提示。
3. etc / 等等...

### Living examples (if any) / 已有的例子 (如果有的话)
link to any existing component libs / 其他组件库的链接
`.trim()
</script>

请尽可能详细描述您需要的特性。

<details>

<summary>例子</summary><br>

<el-input
  class="font-mono"
  :model-value="example"
  type="textarea"
  autosize
  readonly
/>

</details>
