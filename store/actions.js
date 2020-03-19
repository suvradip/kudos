import cookie from 'cookie';
import jsCookies from 'js-cookie';

export default {
   async nuxtServerInit({ commit }, context) {
      try {
         const cookies = cookie.parse(context.req.headers.cookie || '');
         if (Object.hasOwnProperty.call(cookies, 'x-access-token')) {
            let token = cookies['x-access-token'];
            token = JSON.parse(token);
            const { data } = await this.$axios.get(`/user/${token.userId}`);

            commit('SET_USER_DATA', data);
            commit('SET_USER_KUDOS_BALANCE', data);
            commit('SET_AUTHENTICATION_STATUS', true);
         } else {
            commit('SET_AUTHENTICATION_STATUS', false);
         }
      } catch (error) {
         console.error(error);
         commit('SET_AUTHENTICATION_STATUS', false);
      }
   },

   async FETCH_KUDOS({ commit, state }) {
      const response = await this.$axios.get(`/kudos/`, {
         params: {
            userId: state.user.userId,
         },
      });
      commit('HOME_PAGE_DATA', response.data);
   },

   LOGOUT({ commit }) {
      // commit('reset_user')
      //  resetAuthToken()
      commit('SET_USER_DATA', {});
      commit('SET_AUTHENTICATION_STATUS', false);
      jsCookies.remove('x-access-token');
      return Promise.resolve();
   },

   async FETCH_PROFILE({ commit }, userId) {
      const response = await this.$axios.get(`/user/${userId}`);
      commit('SET_PROFILE_DATA', response.data);
   },

   async FETCH_COMMENTS({ commit }, userId) {
      const response = await this.$axios.get(`/user/${userId}/comments`);
      commit('SET_REVIEWS', response.data);
   },

   async FETCH_USER_KUDOS_BALANCE({ commit, state }) {
      const { data } = await this.$axios.get(`/user/${state.user.userId}`);
      commit('SET_USER_KUDOS_BALANCE', data);
   },
};
