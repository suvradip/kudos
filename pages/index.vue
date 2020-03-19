<template>
   <div class="container">
      <!-- <div class="row">
         <div class="col-8 searchbar ">
            <div class="input-group ">
               <input type="text" class="form-control" placeholder="search" />
               <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button">SEARCH</button>
               </div>
            </div>
         </div>
      </div> -->

      <div class="row ">
         <div class="col-7">
            <div class="row">
               <div v-for="(item, index) in home" :key="index" class="col-12">
                  <KudosCard :data="item" :rank="index + 1" />
               </div>
            </div>
         </div>

         <div class="col-5">
            <Balance />
         </div>
      </div>
   </div>
</template>

<script>
import { mapState } from 'vuex';
import KudosCard from '../components/KudosCard';
import Balance from '../components/Balance';

export default {
   name: 'HomeView',

   middleware: 'auth',

   components: {
      KudosCard,
      Balance,
   },

   async fetch({ store, params, error }) {
      try {
         await store.dispatch('FETCH_KUDOS');
      } catch (e) {
         error({ statusCode: 404 });
      }
   },

   computed: {
      ...mapState(['home']),
   },

   mounted() {
      this.setAuthentication();
   },

   methods: {
      setAuthentication() {
         if (!localStorage.getItem('username') || typeof localStorage.getItem('username') === 'undefined') {
            this.$router.push('/login');
         }
      },

      // sortByKudosCount() {
      //    const data = Object.create(this.home);
      //    return data.sort((a, b) => {
      //       if (a.kudos.count > b.kudos.count) return -1;
      //       if (a.kudos.count < b.kudos.count) return 1;
      //       return 1;
      //    });
      // },
   },
};
</script>

<style lang="scss" scoped>
.container {
   .searchbar {
      margin-top: 25px;
   }
}
</style>
