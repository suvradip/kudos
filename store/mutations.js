import Vue from 'vue';

export default {
   HOME_PAGE_DATA: (state, data) => {
      Vue.set(state, 'home', data);
   },

   SET_USER_DATA: (state, data) => {
      Vue.set(state, 'user', data);
   },

   SET_AUTHENTICATION_STATUS: (state, data) => {
      Vue.set(state, 'authenticated', data);
   },

   SET_PROFILE_DATA: (state, data) => {
      Vue.set(state, 'profile', data);
   },

   SET_REVIEWS: (state, data) => {
      Vue.set(state, 'comments', data.kudos);
   },

   SET_USER_KUDOS_BALANCE: (state, data) => {
      Vue.set(state, 'balance', {
         have: data.kudosBalance,
         given: data.kudosGiven,
      });
   },
};
