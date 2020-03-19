<template>
   <div class="container-fluid">
      <div class="banner">
         <div class="cover-image">
            <img src="/images/london.jpg" alt="" />
         </div>
         <div class="display-photo">
            <img :src="profile.image" />
            <h3 class="text-center mt-3" v-text="profile.name" />
            <h6 class="text-center" v-text="profile.designation" />
         </div>
      </div>

      <div v-if="comments" class="container mt-1 mb-5">
         <Review v-for="(item, index) in comments.contents" :key="index" :data="item" />
      </div>
   </div>
</template>

<script>
import { mapState } from 'vuex';
import Review from '../../components/Review';
export default {
   name: 'KudosProfile',

   components: {
      Review,
   },

   fetch({ store, params, error }) {
      const { userId } = params;
      try {
         return Promise.all([store.dispatch('FETCH_PROFILE', userId), store.dispatch('FETCH_COMMENTS', userId)]);
      } catch (e) {
         error({ statusCode: 404 });
      }
   },

   computed: {
      ...mapState(['profile', 'comments']),
   },
};
</script>

<style lang="scss" scoped>
.container-fluid {
   margin: 0;
   padding: 0;

   .cover-image img {
      width: 100%;
      height: 220px;
   }

   .display-photo {
      display: inline-block;
      position: relative;
      top: -70px;
      left: 42%;

      img {
         width: 220px;
         height: 220px;
         border-radius: 110px;
         border: 7px solid #fff;
      }
   }
}
</style>
