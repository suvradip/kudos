<template>
   <div class="container-fluid">
      <div class="row wrapper ">
         <div class="col-12"><Header hello="sas" /></div>
         <div class="col-12"><nuxt /></div>
      </div>
   </div>
</template>

<script>
import Header from '../components/Header';

export default {
   components: {
      Header,
   },
};
</script>

<style lang="scss" scoped>
.container-fluid {
   padding: 0;
   margin: 0;
   overflow: hidden;
}
</style>
