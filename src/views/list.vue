<template>
  <div>
    <Bar />
    <div id="main"></div>
    <p class="back">
      <button class="btn_BACK" @click="pushBACK">Refresh</button>
    </p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'
import Bar from '@/components/Bar.vue'
import { getVoteResults } from '@/api/user'
import { Toast } from 'vant'
// import users from '@/utils/user'

// 冒泡排序
function BubblingSort (arr) {
  let item
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i].num < arr[j].num) {
        item = arr[i]
        arr[i] = arr[j]
        arr[j] = item
      }
    }
  }
  return arr
}


async function loadgetVoteResults () {
  const { data } = await getVoteResults()

  const usersList = BubblingSort(data)

  const EchartsNum = []
  const EchartsUser = []
  for (const item of usersList) {
    EchartsNum.push(item.num)
    EchartsUser.push(item.name)
  }

  loadCharts(EchartsNum, EchartsUser)
}

// 渲染图表
function loadCharts (numList, userList) {
  const myChart = echarts.init(document.getElementById('main'))

  // 指定图表的配置项和数据
  const option = {
    title: {
      text: 'Number of votes',
      textAlign: 'auto',
      textStyle: {
        color: 'rgb(3, 142, 209)'
      }
    },
    grid: {
      left: '0px',
      containLabel: true
    },
    legend: {},
    xAxis: {},
    yAxis: {
      type: 'category',
      data: userList,
      axisLabel: {
        interval: 0, // 强制文字产生间隔
        // rotate: 45, //文字逆时针旋转45°
        textStyle: { //文字样式
          color: 'rgb(3, 142, 209)',
          fontSize: 12,
        }
      }
    },
    series: [
      {
        type: 'bar',
        data: numList,
        itemStyle: { //上方显示数值
          normal: {
            label: {
              show: true, //开启显示
              position: 'right', //在上方显示
              textStyle: { //数值样式
                color: 'rgb(3, 142, 209)',
                fontSize: 14
              }
            }
          }
        }
      }
    ]
  }
  myChart.setOption(option)
}

onMounted(() => {
  loadgetVoteResults()
})

// 刷新
function pushBACK () {
  Toast.loading({
    message: 'Loading...',
    forbidClick: true,
    loadingType: 'spinner',
  })
  loadgetVoteResults()
}
</script>

<style scoped>
.back {
  text-align: center;
  margin-bottom: 40px;
}
.back .btn_BACK {
  background: rgb(3, 142, 209);
  border: none;
  outline: none;
  color: #fff;
  border-radius: 5px;
  margin-top: 25px;
  height: 30px;
  width: 70px;
  font-size: 13px;
}
#main {
  width: 90vw;
  margin: auto;
  height: 1800px;
  margin-top: 20px;
}
</style>
