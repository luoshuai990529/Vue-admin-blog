<template>
  <div>
    <el-card v-loading="isLoadingTable" class="card-content">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="username"
          align="center"
          label="昵称"
          width="200"
        />
        <el-table-column
          prop="account"
          align="center"
          label="账号"
          width="230"
        />
        <el-table-column
          align="center"
          label="角色"
          min-width="160"
        >
          <template slot-scope="scope">
            <el-tag class="role-tag">{{ scope.row.role_name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="头像"
          width="180"
        >
          <template slot-scope="scope">
            <img v-if="scope.row.icon" class="head_icon" :src="scope.row.icon" alt="">
            <div v-if="!scope.row.icon" class="avatar-text">{{ scope.row.username[0] }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="stateDesc"
          align="center"
          label="状态"
          width="100"
        />
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="130"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editHandle(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.state==1" type="text" size="small" @click="freezeHandle(scope.row)">冻结</el-button>
            <el-button v-if="scope.row.state==0" type="text" size="small" @click="activeHandle(scope.row)">激活</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination_wrap">
        <el-pagination
          class=""
          layout="total, sizes, prev, pager, next"
          :page-size="pageInfo.size"
          :page-sizes="[5, 10, 15]"
          :total="totalCount"
          :current-page="pageInfo.current"
          @size-change="handleSizeChange"
          @current-change="updatePages"
        />
      </div>
    </el-card>
    <!-- 编辑弹框 -->
    <el-dialog title="用户当前角色" :visible.sync="dialogFormVisible">
      <el-radio-group v-model="currentRole">
        <el-radio v-for="item in userRoles" :key="item.id" :label="item.id">{{ item.role_name }}</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAuthList, editUserAuth, freezeUser, activeUser } from '@/api/auth'
// import img1 from '@/assets/1.jpeg'
// import img2 from '@/assets/2.jpeg'
// import img3 from '@/assets/3.jpeg'
// import img4 from '@/assets/4.jpeg'
export default {
  props: {
    rolesList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      pageInfo: {
        current: 1,
        size: 5
      },
      totalCount: 0,
      tableData: [],
      userRoles: [],
      currentRole: 0,
      editUser: 0,
      dialogFormVisible: false,
      isLoadingTable: false
    }
  },
  watch: {
    rolesList: {
      handler(val) {
        this.userRoles = val
      },
      deep: true
    }
  },
  mounted() {
    this.initUserData()
  },
  methods: {
    async initUserData() {
      this.isLoadingTable = true
      const res = await getAuthList(this.pageInfo)
      this.totalCount = res.data.totalCount
      this.tableData = res.data.list
      this.isLoadingTable = false
    },
    async editHandle({ rid, uid }) {
      this.dialogFormVisible = true
      this.currentRole = rid
      this.editUser = uid
    },
    async freezeHandle({ uid }) {
      this.isLoadingTable = true
      const result = await freezeUser(uid)
      if (result.success === 'ok') {
        this.$message({
          type: 'warning',
          message: result.message
        })
        this.initUserData()
      } else {
        this.$message({
          type: 'success',
          message: result.message
        })
        this.isLoadingTable = false
      }
    },
    async activeHandle({ uid }) {
      this.isLoadingTable = true
      const result = await activeUser(uid)
      if (result.success === 'ok') {
        this.$message({
          type: 'success',
          message: result.message
        })
        this.initUserData()
      } else {
        this.$message({
          type: 'success',
          message: result.message
        })
        this.isLoadingTable = false
      }
    },
    async confirmEdit() {
    // 发送请求编辑用户当前角色
      const data = { uid: this.editUser, rid: this.currentRole }
      const result = await editUserAuth(data)
      if (result.success === 'ok') {
        this.$message({
          type: 'success',
          message: '编辑成功!'
        })
        this.initUserData()
      } else {
        this.$message({
          type: 'warning',
          message: '编辑失败!'
        })
      }
      this.dialogFormVisible = false
    },
    handleSizeChange(val) {
      this.pageInfo.size = val
      this.initUserData()
      //   页码改变,重新请求数据
    },
    updatePages(n) {
      if (!n) {
        return
      }
      this.pageInfo.current = n
      //   翻页 重新请求数据
      this.initUserData()
    }
  }
}
</script>

<style lang="scss" scoped>
    .card-content{
        margin-top: 15px;
        .head_icon{
            width: 40px;
            height: 40px;
        }
        .role-tag{
            margin-left: 5px;
        }
        .avatar-text{
            margin: auto;
            width: 40px;
            line-height: 40px;
            text-align: center;
            border-radius: 50%;
            color: #fff;
            background: greenyellow;
          }
        .pagination_wrap{
            margin-top: 15px;
        }
    }
</style>
