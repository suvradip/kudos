<template>
   <div class="header ">
      <nuxt-link class="navbar-brand" to="/">Logo</nuxt-link>

      <ul v-if="isAuthenticated" class="nav float-right">
         <li class="nav-item ">
            <a class="nav-link active" href="#" v-text="getName" />
         </li>

         <li class="nav-item">
            <a class="nav-link active" href="#" @click="logoutAction">Logout</a>
         </li>
      </ul>
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
   name: 'Header',

   computed: {
      ...mapState(['user']),
      ...mapGetters(['isAuthenticated']),

      getName() {
         if (this.user && this.user.name) return `Howdy, ${this.user.name}!`;
         return 'Howdy!';
      },
   },

   methods: {
      logoutAction() {
         this.$store.dispatch('LOGOUT').then(() => {
            this.$router.push('/login');
         });
      },
   },
};
</script>

<style lang="scss" scoped>
@import '../assets/css/colors.scss';
.header {
   background-color: $primaryColor;
   padding: 10px 20px;

   a {
      color: #fff;
      text-decoration: none;
      &.active {
         font-weight: 600;
         // border-bottom: 1px solid $accentColor;
      }
      &:hover {
         border-bottom: 1px solid $accentColor;
         .child-menu {
            display: block;
         }
      }
   }
}
</style>
