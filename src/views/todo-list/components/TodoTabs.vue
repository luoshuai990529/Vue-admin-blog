<template>
  <div class="tabs-container">
    <el-card class="tabs-card">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="今日待办" name="daylist"> <span slot="label">今日待办({{ dayCompNum }}/{{ dayList.length }})</span>
          <TabsList :current-todo="0" :table-data="dayList" />
        </el-tab-pane>
        <el-tab-pane label="本周待办" name="weeklist"> <span slot="label">本周待办({{ weekCompNum }}/{{ weekList.length }})</span>
          <TabsList :current-todo="1" :table-data="weekList" />
        </el-tab-pane>
        <el-tab-pane label="本月待办" name="monthlist"> <span slot="label">本月待办({{ monthCompNum }}/{{ monthList.length }})</span>
          <TabsList :current-todo="2" :table-data="monthList" />
        </el-tab-pane>
        <el-tab-pane label="今年待办" name="yearlist"> <span slot="label">今年待办({{ yearCompNum }}/{{ yearList.length }})</span>
          <TabsList :current-todo="3" :table-data="yearList" />
        </el-tab-pane>
        <el-tab-pane label="未提交待办" name="uncommits"> <span slot="label">未提交待办({{ uncommits.length }})</span>
          <UncommitList :table-data="uncommits" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import TabsList from './TabsList.vue'
import UncommitList from './UncommitList.vue'
export default {
  name: 'TodoTabs',
  components: {
    TabsList,
    UncommitList
  },
  data() {
    return {
      activeName: 'daylist',
      dayList: [
        { id: 1, priority: '1', description: '跑步5km', open: '1', openDesc: '是', tags: '运动', complete: '0' },
        { id: 2, priority: '2', description: '看一本书的第一章节', open: '1', openDesc: '是', tags: '学习', complete: '0' },
        { id: 3, priority: '3', description: '练吉他一小时', open: '1', openDesc: '是', tags: '生活', complete: '1' }
      ],
      weekList: [
        { id: 1, priority: '3', description: '学会一首歌', open: '1', openDesc: '是', tags: '生活', complete: '1' }
      ],
      monthList: [
        { id: 1, priority: '2', description: '学完typescript', open: '1', openDesc: '是', tags: '学习', complete: '0' },
        { id: 2, priority: '2', description: '学完flutter', open: '1', openDesc: '是', tags: '学习', complete: '1' },
        { id: 3, priority: '2', description: '学完react-native', open: '1', openDesc: '是', tags: '学习', complete: '1' }
      ],
      yearList: [
        { id: 1, priority: '3', description: '练会无题', open: '1', openDesc: '是', tags: '生活', complete: '0' }
      ],
      uncommits: [
        { id: 1, start_time: '2020-12-01', end_time: '2020-12-30', data_type: '2', commit: '0' },
        { id: 8, start_time: '2020-11-01', end_time: '2020-11-31', data_type: '2', commit: '0' },
        { id: 12, start_time: '2020-12-25', end_time: '2020-12-25', data_type: '0', commit: '0' },
        { id: 5, start_time: '2020-12-21', end_time: '2020-12-27', data_type: '1', commit: '0' }
      ]
    }
  },
  computed: {
    dayCompNum() {
      let count = 0
      this.dayList.forEach(item => {
        if (item.complete === '1') {
          count++
        }
      })
      return count
    },
    weekCompNum() {
      let count = 0
      this.weekList.forEach(item => {
        if (item.complete === '1') {
          count++
        }
      })
      return count
    },
    monthCompNum() {
      let count = 0
      this.monthList.forEach(item => {
        if (item.complete === '1') {
          count++
        }
      })
      return count
    },
    yearCompNum() {
      let count = 0
      this.yearList.forEach(item => {
        if (item.complete === '1') {
          count++
        }
      })
      return count
    }
  },
  methods: {
    handleClick(tab) {
    }
  }
}
</script>

<style lang='scss' scoped>
    .tabs-container{
        margin-top: 20px;
        .tabs-card{
            min-height: 400px;
        }
    }
</style>
