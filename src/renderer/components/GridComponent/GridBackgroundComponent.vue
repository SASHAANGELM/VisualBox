<template>
  <div ref="grid-background" class="grid-background">
    <canvas id="grid"
            :width="grid.width"
            :height="grid.height"
            @mousedown='gridDown'
            @mousemove='gridMove'
            @mouseup='gridUp'
            @mouseleave="gridUp">
    </canvas>
    <div class="debug">
      width: {{ grid.width }} <br>
      height: {{ grid.height }} <br>
      x: {{ grid.x }} <br>
      y: {{ grid.y }} <br>
      drag: {{ drag }} <br>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dots: [
        {
          type: 'dot',
          color: 'rgba(80,80,80,1)',
          size: 1
        },
        {
          type: 'line',
          color: 'rgba(60,60,60,1)',
          size: 24
        }
      ],
      drag: false,
    };
  },
  computed: {
    grid() {
      return this.$store.state.grid;
    }
  },
  mounted() {
  	window.addEventListener('resize', this.resizeEvent);
    window.addEventListener('keydown', this.keydownEvent);
    this.resizeEvent();
    this.gridCentering();
  },
  methods: {
    setWidth(width) {
      this.grid.width = width;
      this.$store.state.grid.width = width;
    },
    setHeight(height) {
      this.grid.height = height;
      this.$store.state.grid.height = height;
    },
    resizeEvent() {
      // Get element for grid width and height.
      const width = this.$refs['grid-background'].clientWidth;
      const height = this.$refs['grid-background'].clientHeight;

      // Center grid on x:0, y:0.
      const newWidtn = width - this.grid.width;
      const newHeight = height - this.grid.height;
      this.grid.x -= Math.round(newWidtn / 2);
      this.grid.y -= Math.round(newHeight / 2);

      // Set grid width and height
      this.grid.width = width;
      this.grid.height = height;

      this.renderGrid();
    },
    multipleSize(size) {
      return this.grid.size * size;
    },
  	renderGrid() {
      const canvas = document.getElementById('grid');
      const ctx = canvas.getContext('2d');
      
      this.$nextTick(() => {
        ctx.clearRect(0, 0, this.grid.width, this.grid.height);

        this.dots.forEach((dot) => {
        	const offsetX = -(this.grid.x % this.multipleSize(dot.size)) - 1 - this.multipleSize(dot.size);
          const offsetY = -(this.grid.y % this.multipleSize(dot.size)) - 1;
        	ctx.fillStyle = dot.color;
          
          if (dot.type === 'dot') {
            for (let y = offsetY; y < this.grid.height; y += this.multipleSize(dot.size)) {
              for (let x = offsetX; x < this.grid.width; x += this.multipleSize(dot.size)) {
                  ctx.fillRect(x, y, 2, 2);
              }
            }
          } else if (dot.type === 'line') {
          	for (let y = offsetY; y < this.grid.height; y += this.multipleSize(dot.size)) {
            	ctx.fillRect(0, y, this.grid.width, 2);
            }
            for (let x = offsetX; x < this.grid.width; x += this.multipleSize(dot.size)) {
            	ctx.fillRect(x, 0, 2, this.grid.height);
            }
          }
        })        
      });
		},
    gridDown(event) {
    	this.drag = true;
		},
    gridMove(event) {
    	if (this.drag) {
        this.grid.x -= event.movementX;
        this.grid.y -= event.movementY;
        this.renderGrid();
      }
		},
    gridUp(event) {
    	this.drag = false;
    },
    keydownEvent(event) {
    	// event.preventDefault();
    	console.log('keypress', event);
      if(event.key === 'h' && event.ctrlKey) {
        this.gridCentering();
      }
    },
    gridCentering() {
      // Take center from width and subtract big
      const bigDotsSize = this.dots[this.dots.length - 1].size
      this.grid.x = -Math.round(this.grid.width / 2) + (this.grid.size * (bigDotsSize/ 2));
      this.grid.y = -Math.round(this.grid.height / 2) + (this.grid.size * 8);
      this.renderGrid();
    }
  },
	beforeDestroy() {
    window.removeEventListener('resize', this.resizeEvent);
    window.removeEventListener('keydown', this.keydownEvent);    
  },
}
</script>

<style lang="scss">
.grid-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  canvas#grid {
    position: absolute;
    top: 0;
    left: 0;
  }

  .debug {
    position: absolute;
    bottom: 0;
    right: 0;
    color: white;
    text-align: right;
    font-size: 14px;
    user-select: none;
    pointer-events: none;
    opacity: 0.25;
  }
}


</style>