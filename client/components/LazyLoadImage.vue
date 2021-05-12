<template>
  <div class="aspect-ratio-wrap" :style="{ paddingBottom: `${aspectRatio}%` }">
    <picture>
      <source media="(min-width: 1600px)" :data-srcset="data.superHighRes" />
      <source media="(min-width: 1400px)" :data-srcset="data.highRes" />
      <source
        media="(min-width: 801px)"
        :data-srcset="`${data.mediumRes} 1x, ${data.highRes} 2x`"
      />
      <source media="(max-width: 800px)" :data-srcset="data.lowRes" />
      <img class="lazy" :data-src="data.lowRes" :alt="data.alt" />
    </picture>
  </div>
</template>
<script>
import LazyLoad from 'vanilla-lazyload'

export default {
  name: 'LazyLoadImage',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          fullRes: null, // full res image
          superHighRes: null, // 2000px width
          highRes: null, // 1400px width
          mediumRes: null, // 1200px width
          lowRes: null, // 800px width
          placeholder: null, // 100px width
          caption: null,
          size: {
            width: null,
            height: null,
          },
          alt: null,
          link: null, // if there should be a link on the image
        }
      },
    },
  },
  data() {
    return {
      lazyLoad: null,
    }
  },
  computed: {
    aspectRatio() {
      if (this.data.size.height || this.data.size.width) {
        return (this.data.size.height / this.data.size.width) * 100
      } else {
        return null
      }
    },
  },
  mounted() {
    this.lazyLoad = new LazyLoad()
  },
}
</script>
