<template>
  <section class="">
    <div class="contentWrapper">
      <div v-if="data.data">
        <div
          class="layout"
          v-for="(layout, index) in data.data.allnews"
          :key="index"
          :id="layout.id"
          :class="[
            {
              'no-margin': layout.disableMargin
            }
          ]"
        >
          <div
            class="layout--column"
            v-for="(column, index) in layout.columns"
            :key="index"
            :class="[`column-span-${column.span}`]"
          >
            <component
              v-for="(block, index) in column.blocks"
              :is="block.type"
              :key="index"
              :data="block.data"
              :id="block.id"
            />
          </div>
        </div>

        <!-- <component
          :is="block.type"
          v-for="(block, index) in contentdata.data.infotext"
          :key="index"
          :data="block.data"
        /> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'News',
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
  created() {}
};
</script>

<style lang="scss" scoped>
.contentWrapper {
  margin-bottom: 100px;

  ::v-deep .layout {
    h2 {
      // font-size: 28px;
      margin-bottom: 16px;
    }

    p,
    a,
    li,
    ul {
      font-size: 16px;
      line-height: 135%;
    }

    a {
      text-decoration: underline;
    }

    a:hover {
      font-weight: normal;
      font-style: italic;
      color: $black;
    }
  }
}

/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px) {
  .contentWrapper {
    padding-left: 10px;
    padding-right: 10px;

    p,
    a {
      font-size: 18px !important;
      line-height: 25px !important;
    }
  }
}
</style>
