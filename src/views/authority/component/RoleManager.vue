<template>
  <el-card class="card-content">
    <div slot="header" class="clearfix">
      <span>角色列表</span>
      <el-button style="float: right" type="primary" size="small">新增角色</el-button>
    </div>
    <!-- 角色列表table -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="rolename"
        align="center"
        label="角色昵称"
        width="200"
      />
      <el-table-column
        prop="description"
        align="center"
        label="角色描述"
      />
      <el-table-column
        align="center"
        prop="create_time"
        label="创建时间"
        width="160"
      />
      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        width="130"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editHandle(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      pageInfo: {
        current: 1,
        size: 5
      },
      totalCount: 0,
      tableData: [{
        rolename: '超级管理员',
        description: '所有权限',
        create_time: '2020-12-18'
      }, {
        rolename: '普通管理员',
        description: '部分权限',
        create_time: '2020-12-18'
      }, {
        rolename: '游客',
        description: '没有权限',
        create_time: '2020-12-18'
      }],
      userRoles: [
        { code: 0, desc: '超级管理员' },
        { code: 1, desc: '普通管理员' },
        { code: 2, desc: '游客' }
      ],
      radio: 0,
      dialogFormVisible: false
    }
  },

  methods: {
    editHandle(val) {
      this.dialogFormVisible = true
    },
    deleteHandle(val) {
      console.log(val)
    },
    handleSizeChange(val) {
      this.pageInfo.size = val
      //   页码改变,重新请求数据
    },
    updatePages(n) {
      if (!n) {
        return
      }
      this.pageInfo.current = n
      //   翻页 重新请求数据
    }
  }
}
</script>

<style lang="scss" scoped>
// .card-content{

// }
</style>
