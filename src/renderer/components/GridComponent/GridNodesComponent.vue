<template>
  <div class="grid-nodes">
    <div v-if="dragNodes.length > 0">
      <div v-for="node in dragNodes"
           :key="`node-ghost-${node.id}`"
           :style="getNodeStyle(node, true)"
           class="node ghost">
      </div>
    </div>
    
    
    <div v-for="node in visibleNodes"
        :key="`node-${node.id}`"
        :style="getNodeStyle(node, false)"
        :class="{selected: isSelected(node), draging: drag && isSelected(node)}"
        class="node"
        @mousedown="mousedown(node, $event)"
        @mousemove="mousemove(node, $event)"
        @mouseup="mouseup(node, $event)"
        @mouseleave="mouseleave">
      <div class="debug">
        {{ node }}
      </div>
      <div class="inputs">
        <div v-for="(pin, pinIndex) in node.input" :key="'input_pin_' + pinIndex" :class="getPinClasses(pin)" class="pin">
          <!-- Execute Icon -->
          <div v-if="pin.type === 'execute'">
            <svg class="icon-stroke" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 2C0 0.89543 0.895431 0 2 0H10.5218C11.139 0 11.7216 0.284946 12.1005 0.772119L17.545 7.77212C18.1067 8.49434 18.1067 9.50566 17.545 10.2279L12.1005 17.2279C11.7216 17.7151 11.139 18 10.5218 18H2C0.895431 18 0 17.1046 0 16V2Z" />
            </svg>
            <svg class="icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 1H6.06325C6.36003 1 6.64148 1.13182 6.83147 1.35982L10.1648 5.35982C10.4738 5.73066 10.4738 6.26934 10.1648 6.64018L6.83147 10.6402C6.64148 10.8682 6.36003 11 6.06325 11H2C1.44772 11 1 10.5523 1 10V2C1 1.44772 1.44772 1 2 1Z" />
            </svg>
          </div>
          <!-- Execute Icon -->

          <!-- Variable Icon -->
          <div v-if="pin.type === 'variable'">
            <svg class="icon-stroke" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="18" height="18" rx="9" />
            </svg>

            <svg class="icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="10" height="10" rx="5"/>
            </svg>
          </div>
          <!-- Variable Icon -->

        </div>
      </div>  
      <div class="outputs">
        <div v-for="(pin, pinIndex) in node.output" :key="'output_pin_' + pinIndex" :class="getPinClasses(pin)" class="pin">
          <!-- Execute Icon -->
          <div v-if="pin.type === 'execute'">
            <svg class="icon-stroke" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 2C0 0.89543 0.895431 0 2 0H10.5218C11.139 0 11.7216 0.284946 12.1005 0.772119L17.545 7.77212C18.1067 8.49434 18.1067 9.50566 17.545 10.2279L12.1005 17.2279C11.7216 17.7151 11.139 18 10.5218 18H2C0.895431 18 0 17.1046 0 16V2Z" />
            </svg>
            <svg class="icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 1H6.06325C6.36003 1 6.64148 1.13182 6.83147 1.35982L10.1648 5.35982C10.4738 5.73066 10.4738 6.26934 10.1648 6.64018L6.83147 10.6402C6.64148 10.8682 6.36003 11 6.06325 11H2C1.44772 11 1 10.5523 1 10V2C1 1.44772 1.44772 1 2 1Z" />
            </svg>
          </div>
          <!-- Execute Icon -->

          <!-- Variable Icon -->
          <div v-if="pin.type === 'variable'">
            <svg class="icon-stroke" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="18" height="18" rx="9" />
            </svg>

            <svg class="icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="10" height="10" rx="5"/>
            </svg>
          </div>
          <!-- Variable Icon -->
        </div>
      </div>    
    </div>

    <!-- <div class="select-area"
       :style="{zIndex: this.selectArea.drag ? 9999 : ''}"
       @mousedown="selectMousedown"
       @mousemove="selectMousemove"
       @mouseup="selectMouseup"
       >
      <div class="select" :style="getSelectAreaStyle"></div>
    </div> -->

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      click: false,
      drag: false,
      dragNodes: [],
      selectArea: {
        drag: false,
        start: {
          x: null,
          y: null
        },
        end: {
          x: null,
          y: null
        }
      }
    }
  },
  computed: {
    grid() {
      return this.$store.state.grid;
    },
    nodes() {
      return this.$store.state.grid.nodes;
    },
    visibleNodes() {
      return this.nodes.filter((node) => {
        const {x, y, w, h} = this.getNodeMetrics(node);
        const l = x; // Left.
        const t = y; // Top.
        const r = x + w; // Right.
        const b = y + h; // Bottom.

        return r > 0 && b > 0 && l < this.grid.width && t < this.grid.height;
      });
    },
  	getSelectAreaCoords() {
    	const { start, end } = this.selectArea;
      const x1 = start.x < end.x ? start.x : end.x;
      const y1 = start.y < end.y ? start.y : end.y;
      const x2 = start.x >= end.x ? start.x : end.x;
      const y2 = start.y >= end.y ? start.y : end.y;
    	return {
      	a: {
        	x: x1,
          y: y1
        },
        b: {
        	x: x2,
          y: y2
        }
      };
    },
  	getSelectAreaStyle() {
      const { start, end } = this.selectArea;
      const obj = this.getSelectAreaCoords;
      
      if (start.x !== null && start.y !== null && end.x !== null && end.y !== null ) {
        return {
          left: obj.a.x + 'px',
          top: obj.a.y + 'px',
          width: obj.b.x - obj.a.x + 'px',
          height: obj.b.y - obj.a.y + 'px',
          zIndex: 9999
        }
      }
      return {
      	display: 'none'
      }
    },
    getNodesInSelectedArea() {
      const left = Math.round(this.getSelectAreaCoords.a.x / this.grid.size);
      const top = Math.round(this.getSelectAreaCoords.a.y / this.grid.size);
      const right = Math.round(this.getSelectAreaCoords.b.x / this.grid.size);
      const bottom = Math.round(this.getSelectAreaCoords.b.y / this.grid.size);
      const nodes = this.nodes.filter((node) => {
      	const { x, y, w, h } = node;
      	return (x < right && y < bottom && (x + w) > left && (y + h) > top);
      	
      });
      return nodes
    }
  },
  methods: {
  	isSelected(node) {
    	return this.dragNodes.includes(node) || this.getNodesInSelectedArea.includes(node);
    },
    getPinClasses(pin) {
      const classes = {};
      classes.connected = pin.connections.length;
      classes[pin.type] = true;
      return classes;
    },
    getNodeMetrics(node, ghost) {
    	let x = ghost ? Math.round(node.x) : node.x;
      let y = ghost ? Math.round(node.y) : node.y;
      x = x * this.grid.size - this.grid.x;
      y = y * this.grid.size - this.grid.y;
      
      const w = node.w * this.grid.size;
      const h = node.h * this.grid.size;

      return {
        x,
        y,
        w,
        h
      }
    },
    getNodeStyle(node, ghost) {
      const z = ghost ? 0 : node.z;
      const {x, y, w, h} = this.getNodeMetrics(node, ghost);

      return {
      	left: x + 'px',
        top: y + 'px',
        width: w + 'px',
        height: h + 'px',
        zIndex: z
      }
    },
    mousedown(node, event) {
    	if (event.which === 1) {
        this.click = true;
      }    
    },
    mousemove(node, event) {
    	if (this.click) {
      	this.drag = true;
      }
    	if (this.drag) {
      	if (!this.isSelected(node)) {
      		if (event.ctrlKey) {
            this.dragNodes.push(node);
          } else {
          	this.dragNodes = [node];
          }
        }
      	
      	this.dragNodes.forEach((node) => {
          node.x += (event.movementX / this.grid.size);
          node.y += (event.movementY / this.grid.size);
          node.z = 9999;
        });
      }
    },
    mouseup(node, event) {
    	if (this.drag) {
      	this.dragNodes.forEach((node) => {
          node.x =  Math.round(node.x);
          node.y = Math.round(node.y);
          node.z = 1;
        });
        this.drag = false;
      } else {
      	if (event.which === 1) {
          if (event.ctrlKey) {
            const index = this.dragNodes.indexOf(node)
            if (index === -1) {
              this.dragNodes.push(node);
            } else {
              this.dragNodes.splice(index, 1);
            }
          } else {
            this.dragNodes = [node];
          }
        } else {
          this.dragNodes = [];
        }
      }
      this.click = false;
    },
    mouseleave(event) {
    	if (this.click && this.drag) {
      	this.dragNodes.forEach((node) => {
          node.x =  Math.round(node.x);
          node.y = Math.round(node.y);
          node.z = 1;
        });
        this.click = false;
        this.drag = false;
      }
    },
    
    // selectMousedown(event) {
    // 	this.selectArea.drag = true;
    //   this.selectArea.start.x = event.x;
    //   this.selectArea.start.y = event.y;
    //   this.selectArea.end.x = event.x;
    //   this.selectArea.end.y = event.y;
    //   if (!event.ctrlKey) {
    //   		this.dragNodes = [];
    //   }
    // },
    // selectMousemove(event) {
    // 	if (this.selectArea.drag) {
    //   	this.selectArea.end.x = event.x;
    //  		this.selectArea.end.y = event.y;
    //   }    	
    // },
    // selectMouseup(event) {
    // 	this.dragNodes = [...this.getNodesInSelectedArea];
    //   this.selectArea.drag = false;
    //   this.selectArea.start.x = null;
    //   this.selectArea.start.y = null;
    //   this.selectArea.end.x = null;
    //   this.selectArea.end.y = null;
    // },
  }
}
</script>

<style lang="scss">
.grid-nodes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;

  .node {
    position: absolute;
    background-color: rgba(40, 40, 40, 1);
    border: 2px solid rgba(33, 150, 243, 1);
    border-radius: 12px; 
    color: white;
    user-select: none;
    pointer-events: auto;
    
    &.selected {
      border-color: #fff;
    }
    
    &.draging {
      box-shadow: 0 0 25px -15px rgba(33, 150, 243, 1);
      opacity: 0.8;
      transition-duration: 0s;
      cursor: grabbing;
      
      .pin {
        opacity: 1;
      }
    }

    &.ghost {
      background-color: rgba(#fff, 0.1);
      border: none;
      pointer-events: none;
    }

    .debug {
      position: absolute;
      font-size: 10px;
      opacity: 0.5;
    }

    .inputs {
      left: -14px;
    }

    .outputs {      
      right: -14px;
    }

    .inputs, .outputs {
      display: flex;
      flex-direction: column;
      position: absolute;
      width: 24px;
      top: 0;
      margin: 10px 0;

      .pin {
        position: relative;
        width: 18px;
        height: 18px;
        margin: 3px;
        
        &.connected {

          .point {
            background-color: rgba(33, 150, 243, 1);
          }

          &.execute {

          }
        }

        .point {
          position: relative;
          height: 100%;
          background-color: rgba(40, 40, 40, 1);
          border: 2px solid rgba(33, 150, 243, 1);
          border-radius: 999px;

          &:hover {
            background-color: rgba(60, 60, 60, 1);
          }
        }

        &.execute {

          &:hover, &.connected {

            svg.icon path {
              fill: #fff;
            }
          }

          svg {
            position: absolute;

            &.icon-stroke {

              path {
                fill: rgba(40,40,40,1);
              }
            }

            &.icon {
              margin: 3px;

              path {
                fill: transparent;
                stroke: #fff;
                stroke-width: 2px;
              }
            }
          }
        }
        &.variable {

          &:hover, &.connected {

            svg.icon rect {
              fill: #fff;
            }
          }

          svg {
            position: absolute;

            &.icon-stroke {

              rect {
                fill: rgba(40,40,40,1);
              }
            }

            &.icon {
              margin: 3px;

              rect {
                fill: transparent;
                stroke: #fff;
                stroke-width: 2px;
              }
            }
          }
        }
      }
    }
  }

  .select-area {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;  
    user-select: none;
    
    .select {
      position: absolute;
      background-color:  rgba(#fff, 0.1);
      border: 1px solid rgba(#fff, 0.5);
      pointer-events: none;
    }
  }
}
</style>