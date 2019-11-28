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

    .content {
      flex: 1 0 auto;
      background-color: rgb(40,48,56);
      color: rgba(255,255,255,0.5);
    }
  }
</style>