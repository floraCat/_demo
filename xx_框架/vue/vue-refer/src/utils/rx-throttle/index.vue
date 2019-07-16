<template>
  <el-input @input="filter" v-model="inputTxt"></el-input>
</template>

<script>
  import { ThrottleTimeFn } from './rx-throttle.js';
export default {
  name: 'rx-throttle',
  data () {
    return {
      debounceTimeQuery: null,
      inputTxt: null,
      testTime: 0
    }
  },
  mounted () {
    this.debounceTimeQuery = new ThrottleTimeFn(500);
    this.debounceTimeQuery.subscribe(() => {
      this.getData();
    });
  },
  methods: {
    filter() {
      this.debounceTimeQuery.next();
    },
    getData () {
      this.testTime ++;
      console.log(this.testTime);

    }
  }
}
</script>

<style scoped>

</style>
