<template>
  <div class="titlebar">
    <div class="actions">
      <div class="h-full flex-shrink-0">
        <button class="btn">File</button>
        <button class="btn">Edit</button>
        <button class="btn">View</button>
        <button class="btn">Window</button>
        <button class="btn">Help</button>
      </div>
      <div class="drag-area"></div>
    </div>
    <div class="title">filename.js - project_name - VisualBox</div>
    <div class="controls">
      <div class="drag-area"></div>
      <div class="h-full flex-shrink-0">
        <button class="btn" @click="controlMinimize">_</button>
        <button class="btn" @click="controlMaximize">o</button>
        <button class="btn close" @click="controlClose">x</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentWindow() {
      return this.$electron.remote.getCurrentWindow();
    }
  },
  created() {
    console.log('close', this.currentWindow);
  },
  methods: {
    controlMinimize() {
      this.currentWindow.minimize();
    },
    controlMaximize() {
      if (this.currentWindow.isMaximized()) {
        this.currentWindow.unmaximize()
        } else {
        this.currentWindow.maximize();
      }
    },
    controlClose() {
      this.currentWindow.close();
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/color-schema.scss';

.titlebar {
  position: relative;
  display: flex;
  align-items: center;
  height: 35px;
  background-color: rgb(40,48,56);
  color: rgba(255,255,255,0.5);

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    height: 1px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .actions, .controls, .title {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
  }
  .actions, .controls {
    flex: 1 1 100%;
  }
  .title {
    flex: 0 0 auto;
  }

  .drag-area {
    flex: 1 0 100%;
    height: 100%;
    user-select: none;
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }

  .actions {

  }
  .title {
    user-select: none;
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }
  .controls {
    justify-content: flex-end;

    .btn {
      width: 50px;

      &.close {

        &:hover {
          background-color: #f44336;
          border-bottom-color: transparent;
        }
      }
    }
  }

  .btn {
    height: 100%;
    padding: 0 10px;
    border-bottom: 1px solid transparent;

    &:hover {
      background-color: rgba($color-primary, 0.15);
      border-bottom-color: $color-primary;
      color: rgba(255,255,255,1);
    }
  }
}
</style>