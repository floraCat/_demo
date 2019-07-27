<template>
  <router-link :to="{name: 'C2'}">切换到C2</router-link>
</template>

<script>
  import {store1} from './store';
  export default {
    name: 'C1',
    data () {
      return {};
    },
    mounted () {
      if (this.$store.state.module2) {
      this.$store.unregisterModule(['module2']);
      }
      store1.install(this.$store);
      console.log('--------------C1', this.$store.state);
      console.log(111, this.$store.state.module1.test);
      // ---------------------------------------
      this.$store.commit('module1/putTest', 'yyy');
      console.log(222, this.$store.state.module1.test);
      // ---------------------------------------
      this.$store.dispatch('module1/setTest', 'zzz');
      console.log(333, this.$store.state.module1.test);
    },
  };
</script>
