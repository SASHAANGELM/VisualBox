<template>
  <div class="home-template">
    <TitleBar></TitleBar>
    <router-view class="content"></router-view>
    <InfoBar></InfoBar>
  </div>
</template>

<script>
import TitleBar from '../components/TitleBar';
import InfoBar from '../components/InfoBar';

export default {
  components: { TitleBar, InfoBar }
}
</script>

<style lang="scss">
  .home-template {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: rgb(40,40,40);
    color: rgba(255,255,255,0.5);

    .content {
      flex: 1 0 auto;
    }
  }
</style>