<template>
  <div class="tabs-container">
    <el-card class="tabs-card">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="今日待办" name="daylist"> <span slot="label">今日待办({{ dayCompNum }}/{{ dayList.length }})</span>
          <TabsList :current-todo="0" :table-data="dayList" @successHandle="initEventList" />
        </el-tab-pane>
        <el-tab-pane label="本周待办" name="weeklist"> <span slot="label">本周待办({{ weekCompNum }}/{{ weekList.length }})</span>
          <TabsList :current-todo="1" :table-data="weekList" @successHandle="initEventList" />
        </el-tab-pane>
        <el-tab-pane label="本月待办" name="monthlist"> <span slot="label">本月待办({{ monthCompNum }}/{{ monthList.length }})</span>
          <TabsList :current-todo="2" :table-data="monthList" @successHandle="initEventList" />
        </el-tab-pane>
        <el-tab-pane label="今年待办" name="yearlist"> <span slot="label">今年待办({{ yearCompNum }}/{{ yearList.length }})</span>
          <TabsList :current-todo="3" :table-data="yearList" @successHandle="initEventList" />
        </el-tab-pane>
        <el-tab-pane label="过时未提交待办" name="uncommits"> <span slot="label">过时未提交待办({{ uncommits.length }})</span>
          <UncommitList :un-commit-data="uncommits" @successHandle="initEventList" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { queryEvent } from '@/api/todo'
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
      dayList: [],
      weekList: [],
      monthList: [],
      yearList: [],
      uncommits: []
    }
  },
  computed: {
    ...mapGetters(['userId']),
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
  created() {
    this.initEventData()
  },
  methods: {
    handleClick(tab) {
    },
    initEventList() {
      // 监听到子组件操作的事件，父组件重新渲染数据
      this.initEventData()
    },
    async initEventData() {
      const result = await queryEvent({ uid: this.userId })
      this.dayList = result.data.dayList
      this.weekList = result.data.weekList
      this.monthList = result.data.monthList
      this.yearList = result.data.yearList
      this.uncommits = result.data.unCmtList
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
