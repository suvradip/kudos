<template>
   <div class="container">
      <form class="mt-5" @submit.prevent="loginAction">
         <h1>Login</h1>
         <div class="form-group">
            <label for="email">Email / Username</label>
            <input
               id="email"
               v-model.trim="userId"
               autocomplete="off"
               type="text"
               class="form-control"
               aria-describedby="emailHelp"
            />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
         </div>
         <div class="form-group">
            <label for="password">Password</label>
            <input id="password" v-model.trim="password" autocomplete="off" type="password" class="form-control" />
         </div>

         <button type="submit" class="btn btn-primary">LOGIN</button>

         <div v-if="errorMessage" class="alert alert-danger mt-5" v-text="errorMessage" />

         <div class="alert alert-info mt-5" role="alert">
            Username as <strong>Lia35</strong> and password as <strong>password</strong>
         </div>
      </form>
   </div>
</template>

<script>
import cookies from 'js-cookie';

export default {
   data: () => ({
      userId: '',
      password: '',
      errorMessage: '',
   }),
   methods: {
      loginAction() {
         this.$axios
            .post('/user/login', {
               userId: this.userId,
               password: this.password,
            })
            .then(({ data, status }) => {
               if (status === 200) {
                  localStorage.setItem('username', data.userId);
                  this.$store.commit('SET_USER_DATA', {
                     name: data.name,
                     userId: data.userId,
                  });

                  this.$store.commit('SET_AUTHENTICATION_STATUS', true);

                  cookies.set('x-access-token', JSON.stringify({ name: data.name, userId: data.userId }), {
                     expires: 7,
                  });

                  this.$router.push('/');
               }
            })
            .catch(err => {
               localStorage.removeItem('username');
               this.errorMessage = 'Please check login credentials';
               console.log(err);
            });
      },
   },
};
</script>

<style lang="scss" scoped>
.container {
   max-width: 500px;
   margin: 0 auto;
}
</style>
