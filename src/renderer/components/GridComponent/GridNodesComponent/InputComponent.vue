<template>
    <div :class="{empty: isEmpty}" class="input-component">
      <div class="placeholder">{{ node.kind }}</div>
      <input v-model="node.value" class="input-element w-full text-gray-300 bg-transparent hover:bg-gray-800" @mousedown.stop @input="nodeInput(node)">
    </div>
  
</template>

<script>
export default {
  props: {
    node: Object
  },
  computed: {
    isEmpty() {
      return this.node.value === undefined || this.node.value === null || this.node.value.length === 0
    }
  },
  methods: {
    nodeInput(node, event) {
      if (this.isEmpty) {
        document.activeElement.blur();
      }
    },
  }
}
</script>

<style lang="scss">
  .input-component {
    @apply relative;
    margin-top: 8px;

    .placeholder {
      @apply absolute text-gray-600 text-xs pointer-events-none;
      top: -10px;
      transition: 0.2s ease-out;
    }

    .input-element {
      
      &:focus {
        @apply bg-gray-800;
        outline: none;
      }
    }

    &.empty {

      .placeholder {
        @apply text-base;
        top: 0px;
      }
    }
  }
</style>