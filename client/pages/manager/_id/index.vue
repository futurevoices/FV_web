<template>
  <div>
    <!-- <h1>{{ this.id }}</h1> -->
    <filemanager :dataid="$route.params.id" />
  </div>
</template>
<script>
import filemanager from "@/components/manager/filemanager";
export default {
  data() {
    return {};
  },
  // async asyncData({ params }) {
  //   const id = params.id; // When calling /abc the id will be "abc"
  //   console.log(params);
  //   return { id };
  // },
  components: {
    filemanager
  }
};
</script>
