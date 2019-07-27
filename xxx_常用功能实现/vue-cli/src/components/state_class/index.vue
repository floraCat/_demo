<template>
  <div class="top">
    <child1>child1</child1>
    <child2>child2</child2>
  </div>
</template>

<script>
  import child1 from './child1';
  import child2 from './child2';
  import Service from './service';
  export default {
    name: 'top',
    components: {
      child1,
      child2
    },
    provide: {
      Service
    },
    data () {
      return {};
    },
    mounted() {
    }
  };
</script>
