<template>
  <div class="child1">
    child1111
  </div>
</template>

<script>
  export default {
    name: 'child1',
    inject: ['Service'],
    data () {
      return {};
    },
    mounted() {
      console.log(1111, this.Service.test);
      this.Service.setTest('bbb');
    }
  };
</script>
