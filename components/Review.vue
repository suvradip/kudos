<template>
   <div class="card mb-3">
      <div class="row no-gutters">
         <div class="col-md-2 d-flex align-items-center p-3">
            <img :src="data.image" class="card-img" alt="..." />
         </div>
         <div class="col-md-10">
            <div class="card-body">
               <h5 class="card-title" v-text="data.name" />
               <p class="card-text" v-text="data.review" />
               <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'Review',

   props: {
      data: {
         type: Object,
         required: true,
      },
   },
};
</script>
<style lang="scss" scoped>
.card {
   max-width: 850px;
   margin: 0 auto;

   img {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      border: 2px solid #5c6bc0;
   }
}
</style>
