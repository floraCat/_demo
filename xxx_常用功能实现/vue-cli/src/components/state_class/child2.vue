<template>
  <div class="child2">
    child2222
  </div>
</template>

<script>
  export default {
    name: 'child2',
    inject: ['Service'],
    data () {
      return {};
    },
    mounted() {
      console.log(2222, this.Service.test);
      console.log(3333, this.Service.getTest());
    }
  };
</script>
