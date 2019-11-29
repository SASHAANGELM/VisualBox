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
        <button class="btn minimaze" @click="controlMinimize">
          <div class="line"></div>
        </button>
        <button :class="{maximized: isMaximized}" class="btn maximize" @click="controlMaximize">
          <div class="box"></div>
          <div class="box"></div>
        </button>
        <button class="btn close" @click="controlClose">
          <div class="line"></div>
          <div class="line"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMaximized: false
    }
  },
  computed: {
    currentWindow() {
      return this.$electron.remote.getCurrentWindow();
    }
  },
  created() {
    this.isMaximized = this.currentWindow.isMaximized();
  },
  methods: {
    controlMinimize() {
      this.currentWindow.minimize();
    },
    controlMaximize() {
      if (this.currentWindow.isMaximized()) {
        this.currentWindow.unmaximize();
        this.isMaximized = false;
      } else {
        this.currentWindow.maximize();
        this.isMaximized = true;
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
  height: 30px;
  background-color: rgb(40,48,56);
  color: rgba(255,255,255,0.5);
  font-size: 14px;

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
      position: relative;
      width: 45px;

      &.minimaze {

        .line {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 12px;
          height: 1px;
          margin-left: -6px;
          background-color: #fff;
          opacity: 0.5;
        }
      }

      &.maximize {

        &.maximized {

          .box { 
            width: 9px;
            height: 9px;
            
            &:nth-child(1) {
              margin: -6px 0 0 -4px;
            }
            &:nth-child(2) {
              margin: -4px 0 0 -6px;
            }
          }
        }

        .box {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 10px;
          height: 10px;
          border: 1px solid rgba(#fff, 0.5);
          background-color: rgb(40,48,56);
          
          
          &:nth-child(1) {
            margin: -6px 0 0 -6px;
          }
          &:nth-child(2) {
            margin: -6px 0 0 -6px;
          }
        }
      }

      &.close {

        &:hover {
          background-color: #f44336;
          border-bottom-color: transparent;
        }

        .line {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 16px;
          height: 1px;
          margin-left: -8px;
          background-color: #fff;
          opacity: 0.5;

          &:nth-child(1) {
            transform: rotate(45deg)
          }
          &:nth-child(2) {
            transform: rotate(-45deg)
          }
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