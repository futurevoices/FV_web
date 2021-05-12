<template>
  <div v-if="video" class="block block--video">
    <figure>
      <div class="iframe-wrapper">
        <iframe :src="video" />
      </div>
      <figcaption v-if="data.caption" v-html="data.caption" />
    </figure>
  </div>
</template>
<script>
export default {
  name: 'VideoBlock',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          url: null,
          caption: null,
        }
      },
    },
  },
  computed: {
    video() {
      const url = this.data.url

      if (!url) {
        return false
      }

      const youtubePattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const youtubeMatch = url.match(youtubePattern)

      if (youtubeMatch) {
        return 'https://www.youtube-nocookie.com/embed/' + youtubeMatch[2]
      }

      const vimeoPattern = /vimeo\.com\/([0-9]+)/
      const vimeoMatch = url.match(vimeoPattern)

      if (vimeoMatch) {
        return 'https://player.vimeo.com/video/' + vimeoMatch[1]
      }

      return false
    },
  },
}
</script>
