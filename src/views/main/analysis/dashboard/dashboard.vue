<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 2.中间部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card>
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card>
          <map-echart :map-data="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card>
          <rose-echart :rose-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
    </el-row>

    <!-- 3.底部部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card>
          <line-echart v-bind="showGoodsCategorySale" />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card>
          <bar-echart v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useAnalysisStore from '@/store/main/analysis/analysis'
import countCard from './c-cpns/count-card/count-card.vue'
import chartCard from './c-cpns/chart-card/chart-card.vue'

// import BaseEchart from '@/components/page-echarts'
import {
  PieEchart,
  LineEchart,
  RoseEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'
import { computed } from 'vue'

// 1.发起数据的请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 2.从store获取数据
const {
  amountList,
  goodsCategoryCount,
  goodsCategorySale,
  goodsCategoryFavor,
  goodsAddressSale
} = storeToRefs(analysisStore)

// 3.获取数据
const showGoodsCategoryCount = computed(() => {
  // 过滤掉 null 或 undefined 的数据
  const validData = goodsCategoryCount.value.filter(
    (item) => item.name && item.goodsCount != null && item.goodsCount > 0 // 过滤掉 null 和 undefined
  )

  return validData.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const showGoodsCategorySale = computed(() => {
  // 过滤掉 null 或 undefined 的数据
  const validData = goodsCategorySale.value.filter(
    (item) => item.name && item.goodsCount != null // 过滤掉 null 和 undefined
  )
  const labels = validData.map((item) => item.name)
  const values = validData.map((item) => item.goodsCount)
  return { labels, values }
})

const showGoodsCategoryFavor = computed(() => {
  // 过滤掉 null 或 undefined 的数据
  const validData = goodsCategoryFavor.value.filter(
    (item) => item.name && item.goodsFavor != null // 过滤掉 null 和 undefined
  )
  const labels = validData.map((item) => item.name)
  const values = validData.map((item) => item.goodsFavor)
  return { labels, values }
})

const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>

<style lang="less" scoped>
.dashboard {
  color: red;
}

.el-row {
  margin-bottom: 10px;
}
</style>
