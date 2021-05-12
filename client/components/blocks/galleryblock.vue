<template>
  <div class="block block--gallery">
    <!-- {{ data }} -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(slide, index) in data.slides"
          :key="index"
          class="swiper-slide"
        >
          <LazyLoadImage :data="slide" />

          <!-- <img :src="slide.highRes" class="swiper-lazy" /> -->
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>
<script>
// see docs: https://swiperjs.com/
import Swiper, { Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'

Swiper.use([Navigation, Pagination])

export default {
  name: 'GalleryBlock',
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      swiper: null,
      swiperSettings: {
        lazy: false,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
  mounted() {
    this.swiper = new Swiper('.swiper-container', this.swiperSettings)
  },
}
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: auto;
}
</style>
