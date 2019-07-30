<template>
  <grid-layout
    :layout.sync="layout"
    :col-num="12"
    :row-height="30"
    :is-draggable="flag"
    :is-resizable="true"
    :is-mirrored="false"
    :vertical-compact="true"
    :margin="[10, 10]"
    :use-css-transforms="true"
    @layout-created="layoutCreatedEvent"
    @layout-before-mount="layoutBeforeMountEvent"
    @layout-mounted="layoutMountedEvent"
    @layout-ready="layoutReadyEvent"
    @layout-updated="layoutUpdatedEvent"
  >

    <grid-item v-for="(item,index) in layout"
    			:key="index"
               :x="item.x"
               :y="item.y"
               :w="item.w"
               :h="item.h"
               :i="item.i"
               @resize="resizeEvent"
               @move="moveEvent"
               @resized="resizedEvent"
               @moved="movedEvent"
    >
      <p style="width: 100px; height: 100px; color: #fff; background: blue;"
         @mouseover="mouseover"
         @mouseout="mouseout">{{item.i}} - 此范围内不能拖动</p>
    </grid-item>
  </grid-layout>
</template>

<script>

  var testLayout = [
    {"x":0,"y":0,"w":2,"h":2,"i":"0"},
    {"x":2,"y":0,"w":2,"h":4,"i":"1"},
    {"x":4,"y":0,"w":2,"h":5,"i":"2"},
    {"x":6,"y":0,"w":2,"h":3,"i":"3"},
    {"x":8,"y":0,"w":2,"h":3,"i":"4"},
    {"x":10,"y":0,"w":2,"h":3,"i":"5"},

    {"x":0,"y":5,"w":2,"h":5,"i":"6"},
    {"x":2,"y":5,"w":2,"h":5,"i":"7"},
    {"x":4,"y":5,"w":2,"h":5,"i":"8"},
    {"x":6,"y":3,"w":2,"h":4,"i":"9"},
    {"x":8,"y":4,"w":2,"h":4,"i":"10"},
    {"x":10,"y":4,"w":2,"h":4,"i":"11"},

    {"x":0,"y":10,"w":2,"h":5,"i":"12"},
    {"x":2,"y":10,"w":2,"h":5,"i":"13"},
    {"x":4,"y":8,"w":2,"h":4,"i":"14"},
    {"x":6,"y":8,"w":2,"h":4,"i":"15"},
    {"x":8,"y":10,"w":2,"h":5,"i":"16"},
    {"x":10,"y":4,"w":2,"h":2,"i":"17"},

    {"x":0,"y":9,"w":2,"h":3,"i":"18"},
    {"x":2,"y":6,"w":2,"h":2,"i":"19"}
  ];

  import VueGridLayout from 'vue-grid-layout';
export default {
  name: 'table-pagination',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data () {
    return {
      layout: testLayout,
      flag: true
    }
  },
  methods: {
    mouseover () {
      this.flag = false;
    },
    mouseout () {
      this.flag = true;
    },
    layoutCreatedEvent (newLayout) {
      // this.flag = false;
      console.log('layoutCreatedEvent', newLayout);
    },
    layoutBeforeMountEvent (newLayout) {
      console.log('layoutBeforeMountEvent', newLayout);
    },
    layoutMountedEvent (newLayout) {
      console.log('layoutMountedEvent', newLayout);
    },
    layoutReadyEvent (newLayout) {
      console.log('layoutReadyEvent', newLayout);
    },
    layoutUpdatedEvent (newLayout) {
      console.log('layoutUpdatedEvent', newLayout);
    },

    resizeEvent (i, newH, newW, newHPx, newWPx) {
      console.log('resizeEvent', i, newH, newW, newHPx, newWPx);
    },
    moveEvent (i, newX, newY) {
      console.log('moveEvent', i, newX, newY);
    },
    resizedEvent (i, newH, newW, newHPx, newWPx) {
      console.log('resizedEvent', i, newH, newW, newHPx, newWPx);
    },
    movedEvent (i, newX, newY) {
      console.log('movedEvent', i, newX, newY);
    },

  }
}
</script>

<style scoped>
  .vue-grid-item {
    background: red;
  }
</style>
