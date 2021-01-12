<template>
  <div>
    <Uploader />
    <!-- <keep-alive>
      <component :is='radioComponent' />
    </keep-alive> -->
  </div>
</template>

<router>
{
    path: '/upload'
}
</router>

<script>
import Uploader from "@/components/uploader/uploader";
// import StreamPlayer from "@/components/stream/streamPlayer";
export default {
  components: {
    Uploader
  },
  data () {
    return {
      radioComponent: ""
    }
  }
};
</script>
