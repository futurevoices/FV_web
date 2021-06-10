<template>
  <div>
    <fileuploader />
  </div>
</template>
<script>
import fileuploader from '@/components/fileuploader/fileyamluploader';
export default {
  components: {
    fileuploader
  },
  transition: 'standard'
};
</script>
