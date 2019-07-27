<template>
  <router-link :to="{name: 'C1'}">切换到C1</router-link>
</template>

<script>
  import {store2} from './store';
  export default {
    name: 'C2',
    data () {
      return {};
    },
    mounted () {
      if (this.$store.state.module1) {
        this.$store.unregisterModule(['module1']);
      }
      store2.install(this.$store);
      console.log('==============C2', this.$store.state);
    },
  };
</script>
