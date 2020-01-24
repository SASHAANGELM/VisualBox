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
    @apply flex flex-col min-h-screen bg-gray-900 text-gray-500;

    .content {
      flex: 1 0 auto;
    }
  }
</style>