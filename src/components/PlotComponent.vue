<template>
    <v-sheet variant="tonal" class="d-flex flex-row ma-1 sc2-sheet">
        <v-btn icon="✖" variant="tonal" class="align-self-center ma-3" @click="onDeleteStatement(plotC.id)">
            ✖
        </v-btn>
        <div class="align-self-center my-auto mx-3">
            plot for {{ plotC.parent.getDescription() }}
        </div>
        <div ref="chart" style="height: 300%; width: 90%;" class="ma-4"></div>
    </v-sheet>
</template>

<script setup>
</script>

<script>
import * as echarts from 'echarts';
/*
        <v-sheet v-if="chosenMethod !== undefined" class="ma-sheet ma-2">
            <v-btn icon="◁" variant="tonal" class="align-self-center ma-3" @click="chosenMethod=undefined">
                ◁
            </v-btn>
        </v-sheet>

*/

//style="border: 1px solid black;"
export default {
    data() {
        return {
        }
    },
    components: {
    },
    props: {
        plotC: {
            required: true,
        },
    },
    methods: {
        onDeleteStatement(id) {
            console.log(id)
            this.$emit('deleteStatement', id)
        },
    },
    computed: {
    },
    mounted() {
        const chart = echarts.init(this.$refs.chart);

        const option = {
            legend: {},
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                },
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 100,
                    filterMode: 'filter'
                },
                {
                    type: 'slider',
                    start: 0,
                    end: 100,
                    filterMode: 'filter'
                },
                {
                    type: 'slider',
                    yAxisIndex: [0],
                    filterMode: 'filter'
                }
            ],
            series: []
        };

        const matrix = this.$props.plotC.parent.asList2D()
        console.log(matrix)

        for (let i = 0; i < matrix.length; i++) {
            const data = [];

            const func = (x) => {
                let v = 0;
                for (let j = 0; j < matrix[i].length; j++) {
                    const c = matrix[i][j];
                    v += c * Math.pow(x, matrix[i].length - j - 1); // todo use more precise pow function
                }
                return v
            }

            let descr = "";
            for (let j = 0; j < matrix[i].length; j++) {
                const c = matrix[i][j]
                if (j < matrix[i].length - 1) {
                    descr += c + "x^" + (matrix[i].length - j - 1).toString() + " + ";
                } else {
                    descr += c
                }

            }


            for (let x = -30; x <= 30; x += 0.1) {
                data.push([x, func(x)]);
            }

            option.series.push({
                name: descr,
                type: 'line',
                data: data,
                showSymbol: false,
                lineStyle: {
                    width: 2
                }
            });
        }

        chart.setOption(option);
    },
    emits: ['deleteStatement']
}
</script>

<style scoped lang="scss">
.sc2-sheet {
    background-color: #f0f0f0;
    border-radius: 5px;
}

.ma-sheet {
    border-radius: 5px;
    background-color: #ddd;
}
</style>