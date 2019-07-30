<template>
  <div>
    <button @click="generateId">generateId</button>
    <button @click="generateUUID">generateUUID</button>
    <button @click="generateUuid">generateUuid</button>
    <p>{{id1}}</p>
    <p>{{id2}}</p>
    <p>{{id3}}</p>
  </div>
</template>

<script>
  import { generateId, generateUUID } from './generateId.js';
  import { generateUuid } from './generate-uuid.js';
export default {
  name: 'generate-id',
  data () {
    return {
      id1: null,
      id2: null,
      id3: null,
    }
  },
  methods: {
    generateId () {
      this.id1 = generateId();
    },
    generateUUID () {
      this.id2 = generateUUID();
    },
    generateUuid () {
      this.id3 = generateUuid();
    }
  }
}
</script>

<style scoped>

</style>
