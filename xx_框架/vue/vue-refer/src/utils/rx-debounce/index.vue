<template>
  <el-input @input="filter" v-model="inputTxt"></el-input>
</template>

<script>
  import { DebounceTimeFn } from './rx-debounce.js';
export default {
  name: 'rx-debounce',
  data () {
    return {
      debounceTimeQuery: null,
      inputTxt: null,
      testTime: 0
    }
  },
  mounted () {
    this.debounceTimeQuery = new DebounceTimeFn(300);
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
