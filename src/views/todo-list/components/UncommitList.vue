<template>
  <div>
    <el-collapse v-model="activeNames" accordion @change="handleChange">
      <el-collapse-item v-for="(item) of uncommitData" :key="item.id" :name="item.id">
        <template slot="title">
          {{ item.start_time }} <el-tag style="margin-left:10px">{{ formatTitle(item.data_type) }}</el-tag>
        </template>
        <TabsList />
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
    console.log(this.tableData)
    this.uncommitData = this.tableData
  },
  methods: {
    handleChange(val) {
      this.currentCommit = val
      console.log(this.currentCommit)
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
    }
  }
}
</script>

<style>

</style>
