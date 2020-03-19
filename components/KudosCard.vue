<template>
   <div class="wrapper">
      <div class="card">
         <div class="card-body">
            <div class="dp mb-3" @click="viewReviews">
               <img :src="image" class="card-img" alt="..." />
               <div class="ml-1 d-inline-block">
                  <h4 class="card-title " v-text="name" />
                  <h6 v-text="designation" />
               </div>
               <!-- <span class="badge badge-primary position"># {{ rank }}</span> -->
            </div>
            <div class="content">
               <p class="card-text" v-text="description" />
               <span
                  class="kudos"
                  :class="[
                     {
                        'not-permit': canGiveKudos,
                     },
                  ]"
                  @click="kudosAction"
               >
                  <i v-if="hasKudos" class="fa fa-heart" aria-hidden="true"></i>
                  <i v-else class="fa fa-heart-o" aria-hidden="true"></i>
                  {{ kudosCount }}
                  <i class="fa fa-comments" aria-hidden="true" @click="viewReviews"></i>
               </span>
            </div>
         </div>
      </div>

      <b-modal v-model="modalShow" :centered="true" :hide-footer="true" title="Kudos!" content-class="kudos-modal">
         <div class="d-block text-center review-window">
            <h3 v-if="postKudos" class="mb-3">Thank you for your kudos!</h3>
            <div v-else class="container">
               <div class="form-group">
                  <textarea
                     v-model="userReview"
                     class="form-control"
                     cols="50"
                     rows="12"
                     :class="[{ 'is-invalid': attemptSubmit && !isValiadReview }, { 'is-valid': isValiadReview }]"
                  ></textarea>
                  <div class="invalid-feedback">Please write few words more.</div>
                  <div class="valid-feedback">Sounds good.</div>
               </div>
               <button class="btn btn-primary" @click="reviewBtnAction">SUBMIT</button>
            </div>
         </div>
      </b-modal>
   </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
   name: 'KudosCard',

   props: {
      data: {
         type: Object,
         required: true,
      },

      rank: {
         type: Number,
         required: true,
      },
   },

   data() {
      return {
         name: this.data.name,
         designation: this.data.designation,
         image: this.data.image,
         kudosCount: this.data.kudosCount,
         modalShow: false,
         hasKudos: this.data.hasKudos,
         receiverUserId: this.data.userId,
         description: this.data.jobDescription,
         userReview: '',
         postKudos: false,
         attemptSubmit: false,
      };
   },

   computed: {
      ...mapState(['user', 'balance']),

      isValiadReview() {
         return this.userReview !== '' && this.userReview.length >= 12;
      },

      canGiveKudos() {
         return this.user.userId === this.receiverUserId;
      },
   },

   methods: {
      giveKudos() {
         this.$axios
            .post('/kudos', {
               receiverUserId: this.receiverUserId,
               userId: this.user.userId,
               message: this.userReview,
               name: this.user.name,
            })
            .then(({ data }) => {
               console.log(data);
               this.kudosCount = Number(data.count);
               this.postKudos = true;
               this.$store.commit('SET_USER_KUDOS_BALANCE', data);
            });
      },

      takeBackKudos() {
         this.$axios
            .delete('/kudos', {
               data: {
                  receiverUserId: this.receiverUserId,
                  userId: this.user.userId,
               },
            })
            .then(({ data }) => {
               console.log(data);
               this.kudosCount = Number(data.count);
               this.postKudos = false;
               this.$store.commit('SET_USER_KUDOS_BALANCE', data);
            });
      },

      kudosAction() {
         if (this.canGiveKudos) {
            this.$bvToast.toast("Sorry!, you can't give self kudos.", {
               title: `Kudos system`,
               variant: 'info',
               solid: true,
            });
            return;
         }

         if (!this.hasKudos && this.balance.have === 0) {
            this.$bvToast.toast("Sorry!, you don't have any kudos.", {
               title: `Kudos system`,
               variant: 'warning',
               solid: true,
            });
            return;
         }

         if (this.hasKudos) {
            this.kudosCount -= 1;
            this.takeBackKudos();
            this.hasKudos = !this.hasKudos;
         } else {
            this.modalShow = !this.modalShow;
         }
      },

      viewReviews() {
         this.$router.push(`/details/${this.receiverUserId}`);
      },

      reviewBtnAction() {
         this.attemptSubmit = true;
         console.log(this.isValiadReview);
         if (this.isValiadReview) {
            this.giveKudos();
            this.hasKudos = !this.hasKudos;
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.card {
   width: 35rem;
   margin: 20px 0;

   .dp {
      cursor: pointer;
   }

   .card-img {
      width: 45px;
      height: 45px;
      border: 1px solid #aba0a0;
      border-radius: 22px;
      position: relative;
      top: -17px;
   }

   .card-title {
      margin-bottom: 5px;
      + h6 {
         font-size: 12px;
      }
   }

   .position {
      text-align: left;
      float: right;
      width: 40px;
   }

   .kudos {
      i {
         cursor: pointer;

         &.fa-heart {
            color: #bd2130;
         }

         &.fa-heart-o:hover {
            color: #bd2130;
         }

         &.fa-comments:hover {
            color: #3f51b5;
         }
      }
   }
}
</style>

<style lang="scss">
.kudos-modal {
   .modal-header {
      background-color: #3f51b5;
      color: #fff;
   }

   textarea {
      border: 1px solid #ccc;
      margin-top: 0px;
      margin-bottom: 10px;
      height: 300px;
      resize: none;
   }
}
</style>
