<template>
  <div ref="grid" class="grid">
    <GridBackgroundComponent></GridBackgroundComponent>
    <GridNodesComponent></GridNodesComponent>
  </div>
</template>

<script>
import GridBackgroundComponent from './GridComponent/GridBackgroundComponent';
import GridNodesComponent from './GridComponent/GridNodesComponent';

export default {
  components: { GridBackgroundComponent, GridNodesComponent },
  data() {
    return {
      grid: {
        x: 0,
        y: 0,
      }
    };
  },
  mounted() {
  },
  methods: {
  },
	beforeDestroy() {
  },
}
</script>

<style lang="scss">
.grid {
  position: relative;
  width: 60%;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}
</style>