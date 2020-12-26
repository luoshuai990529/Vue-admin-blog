<template>
  <div>
    <el-collapse v-model="activeNames" accordion @change="handleChange">
      <el-collapse-item v-for="(item) of uncommitData" :key="item.id" :name="item.id">
        <template slot="title">
          {{ item.start_time }} 至 {{ item.end_time }} <el-tag effect="dark" size="mini" :type="getTagsType(item.data_type)" style="margin-left:20px">{{ formatTitle(item.data_type) }}</el-tag>
        </template>
        <TabsList :current-todo="item.id" :table-data="item.eventList" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import TabsList from './TabsList.vue'
export default {
  components: {
    TabsList
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      currentCommit: 0,
      activeNames: ['1'],
      uncommitData: []
    }
  },
  computed: {

  },
  watch: {
    tableData: {
      handler(val) {
      },
      deep: true
    }
  },
  mounted() {
    this.uncommitData = this.tableData
    console.log(...this.uncommitData)
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
