<template>
  <el-input @input="filter" v-model="inputTxt"></el-input>
</template>

<script>
  import { DebounceTimeFn } from './rx-debounce.js';
export default {
  name: 'rx-debounce',
  data () {
    return {
      debounceTime: null,
      inputTxt: null,
      testTime: 0
    }
  },
  mounted () {
    this.debounceTime = new DebounceTimeFn(300);
    this.debounceTime.subscribe(() => {
      this.getData();
    });
  },
  destroyed () {
  	this.debounceTime.unsubscribe();
  },
  methods: {
    filter() {
      this.debounceTime.next();
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
