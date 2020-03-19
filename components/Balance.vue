<template>
   <div class="wrapper">
      <!-- <h3>Kudos balance</h3>
      <h4>{{ balance.have }} | {{ balance.given }}</h4> -->
      <div id="chart-container"></div>
   </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
   name: 'Balance',

   data: () => ({
      chartData: {
         type: 'pie2d',
         renderAt: 'chart-container',
         width: '100%',
         height: '100%',
         dataFormat: 'json',
         dataSource: {
            chart: {
               caption: 'Your kudos balances',
               subCaption: 'Weekly balance',
               use3DLighting: '0',
               showPercentValues: 0,
               useDataPlotColorForLabels: '1',
               showLegend: 1,
               theme: 'fusion',
            },
            data: [],
         },
      },
   }),

   computed: {
      ...mapState(['balance']),

      prepareData() {
         const data = [
            {
               label: 'Have',
               value: this.balance.have,
            },
            {
               label: 'Given',
               value: this.balance.given,
            },
         ];

         return {
            ...this.chartData,
            dataSource: {
               ...this.chartData.dataSource,
               data,
            },
         };
      },
   },

   watch: {
      balance() {
         this.updateChart();
      },
   },

   mounted() {
      this.renderChart();
   },

   methods: {
      renderChart() {
         window.FusionCharts.ready(() => {
            this.charts = new window.FusionCharts(this.prepareData);
            this.charts.render();
         });
      },

      updateChart() {
         this.charts.setChartData(this.prepareData.dataSource);
      },
   },
};
</script>

<style lang="scss">
#chart-container {
   width: 450px;
   height: 400px;
}
</style>
