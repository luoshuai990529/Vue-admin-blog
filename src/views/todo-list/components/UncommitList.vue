<template>
  <div>
    <el-collapse v-model="activeNames" accordion @change="handleChange">
      <el-collapse-item v-for="(item) of uncommitData" :key="item.id" :name="item.id">
        <template slot="title">
          {{ item.start_time }} 至 {{ item.end_time }} <el-tag effect="dark" size="mini" :type="getTagsType(item.date_type)" style="margin-left:20px">{{ formatTitle(item.date_type) }}</el-tag>
        </template>
        <div v-if="item.list.length>0">
          <TabsList :current-todo="item.id" :table-data="item.list" />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import TabsList from './TabsList.vue'
import { parseTime } from '@/utils/index'
export default {
  name: 'UncommitList',
  components: {
    TabsList
  },
  props: {
    unCommitData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      count: 0,
      currentCommit: 0,
      activeNames: ['1'],
      uncommitData: []
    }
  },
  computed: {

  },
  watch: {
    unCommitData: {
      handler(val) {
        this.uncommitData = val.map(item => {
          item.start_time = parseTime(new Date(item.start_time).getTime(), '{y}-{m}-{d}')
          item.end_time = parseTime(new Date(item.end_time).getTime(), '{y}-{m}-{d}')
          return item
        })
      },
      deep: true
    }
  },
  methods: {
    handleChange(val) {
      this.currentCommit = val
      // console.log(this.currentCommit)
    },
    formatTitle(key) {
      switch (key) {
        case '0':
          return '日待办'
        case '1':
          return '周待办'
        case '2':
          return '月待办'
        case '3':
          return '年待办'
        default:
          return '日待办'
      }
    },
    getTagsType(type) {
      switch (type) {
        case '0':
          return 'success'
        case '1':
          return ''
        case '2':
          return 'warning'
        case '3':
          return 'danger'
        default:
          return 'info'
      }
    }
  }
}
</script>

<style>

</style>
