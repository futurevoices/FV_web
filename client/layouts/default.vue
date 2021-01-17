<template>
  <div>
    <navbar />
    <div
      v-if="
        ['contribute', 'explore', 'index', 'about', 'imprint'].indexOf(
          $route.name
        ) > -1
      "
    >
      <div
        v-if="
          ['contribute', 'explore', 'index', 'about', 'imprint'].indexOf(
            $route.name
          ) > -1
        "
        class="header-spacer"
      ></div>
      <steamFooter />
    </div>
    <nuxt />
  </div>
</template>
<style lang="scss">
.header-spacer {
  position: relative;
  margin: 0;
  padding: 0;
  height: 40px;
  top: 0;
  margin-bottom: 24px;
}
</style>

<script>
import navbar from '@/partial/navbar';
import steamFooter from '@/partial/footer';

// import vhCheck from 'vh-check'
// const test = vhCheck()

export default {
  components: {
    navbar,
    steamFooter
  },
  data() {
    return {
      radioComponent: 'steamFooter'
    };
  }
};
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
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
