<template>
  <el-input @input="filter" v-model="inputTxt"></el-input>
</template>

<script>
  import { ThrottleTimeFn } from './rx-throttle.js';
export default {
  name: 'rx-throttle',
  data () {
    return {
      throttleTime: null,
      inputTxt: null,
      testTime: 0
    }
  },
  mounted () {
    this.throttleTime = new ThrottleTimeFn(500);
    this.throttleTime.subscribe(() => {
      this.getData();
    });
  },
  destroyed () {
  	this.throttleTime.unsubscribe();
  },
  methods: {
    filter() {
      this.throttleTime.next();
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
