<template>
  <div class="pie-echart">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import BaseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import type { IEchartValueType } from '../types'

interface IProps {
  pieData: IEchartValueType[]
}

const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
  return {
    // 手指放上去的时候显示文本
    tooltip: {
      trigger: 'item'
    },
    // 图例
    legend: {
      orient: 'horizontal',
      top: 'top'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        bottom: '-10%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    color: [
      '#ffcaab',
      '#b2c9ff',
      '#b7fbff',
      '#7dffcb',
      '#f7fea5',
      '#e2a9fc',
      '#ffb2d3'
    ]
  }
})
</script>

<style lang="less" scoped>
.pie-echart {
  color: #ffcaab;
}
</style>
