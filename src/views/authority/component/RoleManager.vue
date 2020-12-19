<template>
  <div>
    <el-card class="card-content">
      <div slot="header" class="clearfix">
        <span>角色列表</span>
        <el-button style="float: right" type="primary" size="small" @click="addRoles">新增角色</el-button>
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
    <!-- 添加角色弹框 -->
    <el-dialog class="dialog-addroles" title="添加角色" :visible.sync="addRolesDialog">
      <el-form :label-position="'left'" label-width="100px" :model="addRolesData">
        <el-form-item label="角色名称">
          <el-input v-model="addRolesData.name" placeholder="请输入角色名称" show-word-limit maxlength="10" width="150px" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="addRolesData.desc"
            placeholder="请输入该角色描述"
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="路由权限">
          <el-checkbox-group v-model="checkedRouterMenu" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in routerMenu" :key="city" :label="city">{{ city }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="接口权限">
          <el-checkbox-group v-model="checkedApiMenu" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in apiMenu" :key="city" :label="city">{{ city }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="角色当前权限" :visible.sync="dialogFormVisible">
      <div class="router-menus">
        <p>路由菜单：</p>
        <el-checkbox-group v-model="checkedRouterMenu" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in routerMenu" :key="city" :label="city">{{ city }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="api-menus" />
      <p>api权限：</p>
      <el-checkbox-group v-model="checkedApiMenu" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in apiMenu" :key="city" :label="city">{{ city }}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
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
      routerMenu: [
        '文章管理', '审批管理', '权限管理', '作品管理', '评论管理', '待办管理'
      ],
      apiMenu: [
        'approval-pass', 'approval-no'
      ],
      checkedApiMenu: [],
      checkedRouterMenu: [],
      addRolesData: {
        name: '',
        desc: ''
      },
      dialogFormVisible: false,
      addRolesDialog: false
    }
  },

  methods: {
    addRoles() {
      this.addRolesDialog = true
    },
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
    },
    handleCheckedCitiesChange(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-content{

    .dialog-addroles{

    }
}
</style>
