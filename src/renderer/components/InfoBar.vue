<template>
  <div class="infobar">
    <div>InfoBar</div>
    <div>InfoBar</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .infobar {
    display: flex;
    align-items: center;
    height: 35px;
    background-color: rgb(40,48,56);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255,255,255,0.5);

    &:before {
      content: '';
      position: absolute;
      top: 0;
      height: 1px;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
</style>