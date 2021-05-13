<template>
  <div>
    <News :data="data" />
  </div>
</template>
<script>
import axios from 'axios';
import News from '@/components/news/news';
export default {
  components: {
    News
  },
  transition: 'standard',
  data() {
    return {
      data: {}
    };
  },
  async fetch() {
    this.data = await this.$axios
      .$get(`https://fv.cms.ungroup.group/news.json`)
      .then(res => {
        return res;
      })
      .catch(() => {
        return this.$router.push('/');
      });
  }
};
</script>
