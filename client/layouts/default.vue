<template>
  <div>

    <navbar />
    <div v-if="['upload', 'explore', 'index'].indexOf($route.name) > -1">
           <StreamPlayer />
    </div>
    <nuxt />


  </div>
</template>
<script>
import navbar from "@/partial/navbar";
import StreamPlayer from "@/components/stream/streamPlayer";
export default {
  components: {
    navbar, StreamPlayer
  },
  data () {
    return {
      radioComponent: "StreamPlayer"
    }
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
