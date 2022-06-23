<script setup>
const example = `
## I would like to have a component \`ElEllipse\`

### Features
1. Be able to truncate texts.
2. Be able to show tooltips
3. etc

### Living examples (if any)
link to any existing component libs
`.trim()
</script>

Please describe in detail the features you need.

<details>

<summary>Example</summary><br>

<el-input
  class="font-mono"
  :model-value="example"
  type="textarea"
  autosize
  readonly
/>

</details>
