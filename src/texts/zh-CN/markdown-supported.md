<script setup>
const exampleCode = `
\`\`\`vue
<script setup>
defineProps({ /* ... */ })
<\/script>

<template>
  <h1>Hello World</h1>
</template>
\`\`\``.trim()
</script>

<h3 class="my-1">支持 Markdown</h3>

如果你需要输入代码到文本框，请参考和使用下面的的格式。

<details>

<summary>示例代码</summary><br>

<el-input
  class="font-mono"
  :model-value="exampleCode"
  type="textarea"
  autosize
  readonly
/>

</details>
