<template>
  <div>
    <Index :data="data" />
  </div>
</template>
<script>
import Index from '@/components/index/index';
export default {
  components: {
    Index
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
  },

  computed: {},
  methods: {},
  mounted() {},
  created() {}
};
</script>
