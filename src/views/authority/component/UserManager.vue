<template>
  <div>
    <el-card class="card-content">
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
          width="160"
        >
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.roles" :key="item" class="role-tag">{{ item }}</el-tag>
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
          prop="state"
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
            <el-button type="text" size="small" @click="freezeHandle(scope.row)">冻结</el-button>
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
      <el-radio-group v-model="radio">
        <el-radio v-for="item in userRoles" :key="item.code" :label="item.code">{{ item.desc }}</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import img1 from '@/assets/1.jpeg'
// import img2 from '@/assets/2.jpeg'
import img3 from '@/assets/3.jpeg'
import img4 from '@/assets/4.jpeg'
export default {
  data() {
    return {
      pageInfo: {
        current: 1,
        size: 5
      },
      totalCount: 0,
      tableData: [{
        username: '黎明',
        account: '10086',
        icon: img1,
        state: '正常',
        roles: ['超级管理员']
      }, {
        username: '花火',
        account: '10086',
        icon: '',
        state: '正常',
        roles: ['普通管理员']
      }, {
        username: '子然',
        account: '10086',
        icon: img3,
        state: '正常',
        roles: ['游客']
      }, {
        username: '秋秋',
        account: '10086',
        icon: img4,
        state: '正常',
        roles: ['游客']
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
    freezeHandle(val) {
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
