<template>
  <div v-if="data" class="block block--image">
    <figure v-if="data.highRes">
      <a v-if="data.link" :href="data.link" target="_blank">
        <LazyLoadImage :data="data" />
      </a>
      <LazyLoadImage v-else :data="data" />
      <figcaption v-if="data.caption" v-html="data.caption" />
    </figure>
  </div>
</template>
<script>
export default {
  name: 'ImageBlock',
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
}
</script>
