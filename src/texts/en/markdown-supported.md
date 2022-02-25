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

<h3 class="my-1">Markdown Supported</h3>

Please refer to code below to wrap your code, if you need to enter the code in the input box below.

<details>

<summary>Example Code</summary><br>

<el-input
  class="font-mono"
  :model-value="exampleCode"
  type="textarea"
  autosize
  readonly
/>

</details>
