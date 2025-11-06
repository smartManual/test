<template>
  <div class="hello">
    <a-space>
      <a-button type="primary" @click="onClick">点击调用ios方法</a-button>
      <a-button @click="onClickB">点击调用不存在的方法</a-button>
    </a-space>
  </div>
</template>

<script>
import { callNative } from '@/utils/helper'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    onClick() {
      callNative('audioSessionSwitch', {}, (res) => {
        if (res.success) {
          this.$message.success('调用成功')
        } else {
          this.$message.error('调用失败')
        }
      })
    },
    onClickB() {
      callNative('audioSessionSwitchB', {}, (res) => {
        if (res.success) {
          this.$message.success('调用成功')
        } else {
          this.$message.error('调用失败')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
