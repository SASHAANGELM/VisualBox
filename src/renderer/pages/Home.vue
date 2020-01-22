<template>
  <div class="flex">
    <div class="explorer">
      Explorer Component
    </div>
    <div class="editor">
      <div class="tabs">
        <button v-for="file in openedFile" :key="file.id" class="tab">
          <div class="icon"></div>
          <div class="filename">{{file.name}}{{file.ext}}</div>
          <button class="close" @click="closeFile(file)">✕</button>
        </button>
        <button class="tab new" @click="createEmptyFile">+</button>
      </div>
      <div class="space">
        <GridComponent></GridComponent>
        <div class="code">
          code: {{ value }}
          <!-- <MonacoEditor height="500"
                        theme="vs-dark"
                        @change="onChange">
          </MonacoEditor> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import MonacoEditor from 'monaco-editor-vue';

import GridComponent from '@/components/GridComponent';

export default {
  components: { GridComponent },
  data() {
    return {
      value: '',
      openedFile: [
        {
          id: 1,
          name: 'index',
          ext: '.html'
        },
        {
          id: 2,
          name: 'main',
          ext: '.js'
        },
        {
          id: 3,
          name: 'style',
          ext: '.css'
        }
      ]
    }
  },
  methods: {
    createEmptyFile() {
      const id = Math.round(Math.random() * 1000000);
      this.openedFile.push({
        id,
        name: 'Untitled',
        ext: ''
      })
    },
    closeFile(file) {
      const index = this.openedFile.indexOf(file);
      this.openedFile.splice(index, 1);
    },
    // onChange(value) {
    //   this.value = value;
    // }
  }
}
</script>

<style lang="scss">
@import '../assets/css/color-schema.scss';

.explorer {
  width: 320px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.editor {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;

  .tabs {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 35px;
    font-size: 14px;

    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      height: 1px;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.1);
    }

    .tab {
      display: flex;
      align-items: center;
      position: relative;
      height: 100%;
      border-bottom: 1px solid transparent;
      transition: all 0.2s ease-out;

      &:hover, &.active {
        background-color: rgba($color-primary, 0.15);
        border-bottom-color: $color-primary;
        color: #fff;
      }

      &:hover {

        .close {
          opacity: 0.5;
        }
      }

      &.new {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
        margin-left: 10px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 4px;

        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: rgba(255,255,255,0.5);
        }
      }

      .icon {
        width: 35px;
      }

      .close {
        width: 35px;
        height: 35px;
        margin-left: 5px;
        padding-bottom: 3px;
        opacity: 0;
        transition: all 0.2s ease-out;

        &:hover {
          opacity: 1;
          background-color: rgba(255, 255, 255, 0.05);
        }
      }
    }
  }

  .space {
    flex: 1 1 auto;
    display: flex;
    
    

    .code {
      width: 40%;
    }
  }
}
</style>