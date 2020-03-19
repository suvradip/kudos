<template>
   <div class="container mt-5">
      <div class="card">
         <div class="card-body">
            <div class="wrapper">
               <h5 class="card-title">Kudos</h5>
               <p class="card-text">
                  Here you can check kudos balence
               </p>
               <!-- <div class="year">
                  <label for="year">YEAR</label>
                  <select id="year">
                     <option value="2020">2020</option>
                     <option value="2019">2019</option>
                  </select>
               </div> -->
            </div>
            <div class="line mt-4 mb-4"></div>
            <div class="row">
               <div class="col-12">
                  <div id="chart-container"></div>
               </div>
               <div class="col-3"></div>
            </div>
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.container {
   .year {
      float: right;
   }
   .line {
      height: 0;
      border-top: 1px solid #ccc;
      width: 100%;
   }
   #chart-container {
      width: 350px;
      height: 190px;
   }
}
</style>
