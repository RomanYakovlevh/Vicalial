<template>
  <div>
    <div class="pa-20 d-flex flex-row">
      <div  style="border: 1px solid gray" class="ma-2">
        <h2>Journal papers that included following topics</h2>
        <v-chart class="chart" :option="option1" autoresize />
        <span>Ref: https://ieeexplore.ieee.org/search/searchresult.jsp?sortType=newest&newsearch=true</span>
      </div>
      <div  style="border: 1px solid gray" class="ma-2">
        <h2>Most popular tags on Mathoverflow</h2>
        <span><span style="color: red">Red</span> rows are related to linear algebra or linear programming</span>
        <v-chart class="chart ml-10" :option="mathoverflow" autoresize />
        <span>Ref: https://mathoverflow.net/tags</span>
      </div>
    </div>
    <div class="pa-20 d-flex flex-row">
      <div  style="border: 1px solid gray" class="ma-2">
        <h2>Growth of amount of software made for purposes of mathematical computation and linear algebra</h2>
        <v-chart class="chart" :option="softwareReleases" autoresize />
        <span>Ref:
          https://en.wikipedia.org/wiki/List_of_optimization_software#:~:text=LINDO%20-%20(Linear%2C%20Interactive%2C,and%20nonlinear%20optimization%20using%20LINDO.</span>

      </div>
      <div  style="border: 1px solid gray" class="ma-2">
        <h2>Popularity of various software meant for mathematical computation according to tags on Stackoverflow</h2>
        <v-chart class="chart" :option="ctackoverflow" autoresize />
        <span>Ref: https://stackoverflow.com/tags</span>
      </div>

    </div>

  </div>
</template>
  
<script setup>
import { use } from 'echarts/core';
//import { graphic } from 'echarts';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';
import * as j from '@/views/ouofplacejsondata.json'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, 'white');

//let data = []

/*
fetch('./src/views/ouofplacejsondata.json')
  .then(response => response.json())
  .then(dataL => {
    // Process the JSON data here
    //data = dataL
    console.log(dataL);
  })
  .catch(error => {
    // Handle any errors that occur during the fetch
    console.error('Error:', error);
  });
*/
console.log(j)

const dateRange = j['topic: linear algebra'].years.slice(12, 84)



const ctackoverflow = ref(
  {
    xAxis: {
      type: 'category',
      data: j['stackoverflow top linalgebra related tags'].keys,
      axisLabel: {
        interval: 0, // Display all labels
      },
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: j['stackoverflow top linalgebra related tags'].values,
        type: 'bar'
      }
    ]
  }
)

const mathoverflow = ref(
  {
    yAxis: {
      type: 'category',
      data: j['mathoverflow top question tags'].keys,
      axisLabel: {
        interval: 0// Display all labels,
      },
    },
    xAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        data: j['mathoverflow top question tags'].values,
        type: 'bar'
      }
    ]
  }
)

const softwareReleases = ref({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: dateRange
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: "topic: linear programming",
      type: 'line',
      //stack: 'Total',
      data: j.softwareReleasesAnonymousFrom1938Till2023.slice(12, 84).map((x, i) => {
        if (i > 13) {
          return x + j.softwareReleasesAnonymousFrom1938Till2023.slice(12, i).reduce((acc, x) => acc + x)
        } else {
          return x
        }

      })
    }
  ]
});

const option1 = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ["topic: linear programming", "topic: linear algebra", "topic: numerical methods", "topic: numerical analysis"],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: dateRange
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: "topic: linear programming",
      type: 'line',
      //stack: 'Total',
      color: 'blue',
      data: j['topic: linear programming'].stats.slice(12, 84)
    },
    {
      name: "topic: linear algebra",
      type: 'line',
      //stack: 'Total',
      color: 'yellow',
      data: j['topic: linear algebra'].stats.slice(12, 84)
    },
    {
      name: "topic: numerical methods",
      type: 'line',
      //stack: 'Total',
      color: 'red',
      data: j['topic: numerical methods'].stats.slice(12, 84)
    },
    {
      name: "topic: numerical analysis",
      type: 'line',
      //stack: 'Total',
      color: 'green',
      data: j['topic: numerical analysis'].stats.slice(12, 84)
    }
  ]
})
</script>
  
<style scoped>
.chart {
  height: 30rem;
  width: 55rem;
}
</style>
  