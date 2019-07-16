<template>
  <el-input @input="filter" v-model="inputTxt"></el-input>
</template>

<script>
  import { debounce } from './debounce.js';
export default {
  name: 'debounce',
  data () {
    return {
      inputTxt: null,
      testTime: 0
    }
  },
  methods: {
    filter: debounce(function() {
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
