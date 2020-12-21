<template>
  <div>
    <el-card v-loading="isLoadingTable" class="card-content">
      <div slot="header" class="clearfix">
        <span>角色列表</span>
        <el-button style="float: right" type="primary" size="small" @click="addRolesHandle">新增角色</el-button>
      </div>
      <!-- 角色列表table -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="role_name"
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
          <el-checkbox-group v-model="checkedRouterMenu" @change="routerCheckHandle">
            <el-checkbox v-for="item in routerMenus" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="接口权限">
          <el-checkbox-group v-model="checkedApiMenu" @change="actionCheckHandle">
            <el-checkbox v-for="item in apiMenus" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRolesDialog = false">取 消</el-button>
        <el-button type="primary" @click="sureAddRole">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="角色当前权限" :visible.sync="editRolesDialog">
      <div class="router-menus">
        <p>路由菜单：</p>
        <el-checkbox-group v-model="checkedRouterMenu" @change="routerCheckHandle">
          <el-checkbox v-for="item in routerMenus" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="api-menus" />
      <p>api权限：</p>
      <el-checkbox-group v-model="checkedApiMenu" @change="actionCheckHandle">
        <el-checkbox v-for="item in apiMenus" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRolesDialog = false">取 消</el-button>
        <el-button type="primary" @click="editRolesDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getRights, addRole } from '@/api/auth'
export default {
  data() {
    return {
      pageInfo: {
        current: 1,
        size: 5
      },
      totalCount: 0,
      tableData: [],
      routerMenus: [
      ],
      apiMenus: [
      ],
      checkedApiMenu: [],
      checkedRouterMenu: [],
      addRolesData: {
        name: '',
        desc: ''
      },
      editRolesDialog: false,
      addRolesDialog: false,
      isLoadingTable: false
    }
  },
  mounted() {
    this.initRolesData()
    this.initRightData()
  },
  methods: {
    async initRolesData() {
      this.isLoadingTable = true
      const result = await getRoleList()
      this.tableData = result.data
      this.isLoadingTable = false
    },
    async initRightData() {
      const result = await getRights()
      this.routerMenus = result.data.menus
      this.apiMenus = result.data.actions
    },
    addRolesHandle() {
      this.addRolesDialog = true
      //   初始化数据
      this.addRolesData.name = ''
      this.addRolesData.desc = ''
      this.checkedApiMenu = []
      this.checkedRouterMenu = []
    },
    async sureAddRole() {
      try {
        const data = { ...this.addRolesData, rights: [...this.checkedRouterMenu, ...this.checkedApiMenu] }
        const result = await addRole(data)
        this.$message({
          type: 'success',
          message: result.message
        })
        this.addRolesDialog = false
        this.initRolesData()
      } catch (error) {
        this.isLoadingTable = false
      }
    },
    editHandle(val) {
      this.editRolesDialog = true
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

    routerCheckHandle(val) {
      console.log('路由菜单选择', val)
    },
    actionCheckHandle(val) {
      console.log('接口权限选择', val)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
