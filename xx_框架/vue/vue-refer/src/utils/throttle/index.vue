<template>
  <el-input @input="filter" v-model="inputTxt"></el-input>
</template>

<script>
  import { throttle } from './throttle.js';
export default {
  name: 'throttle',
  data () {
    return {
      inputTxt: null,
      testTime: 0
    }
  },
  methods: {
    filter: throttle(function() {
        this.getData();
    }),
    getData () {
      this.testTime ++;
      console.log(this.testTime);

    }
  }
}
</script>

<style scoped>

</style>
