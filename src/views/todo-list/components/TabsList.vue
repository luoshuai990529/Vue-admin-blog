<template>
  <div class="list-container">
    <div class="clearfix">
      <el-button type="primary" size="small" style="float:right" @click="commitHandle">提交待办</el-button>
    </div>
    <div class="pending">
      <h5 class="pending-text">进行中：</h5>
      <el-table
        :data="pendingTableData"
        border
        empty-text="暂无进行待办事项"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="priority"
          label="优先级"
          align="center"
          width="80"
        />
        <el-table-column
          align="center"
          prop="description"
          label="待办描述"
        />
        <el-table-column
          align="center"
          prop="openDesc"
          width="80"
          label="是否公开"
        />
        <el-table-column
          align="center"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="completeHandle(scope.row)">完成</el-button>
            <el-button type="danger" size="mini" @click="deleteHandle(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="complete">
      <h5 class="complete-text">已完成：</h5>
      <el-table
        :data="completeTableData"
        border
        empty-text="暂无完成待办事项"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="priority"
          label="优先级"
          align="center"
          width="80"
        />
        <el-table-column
          align="center"
          prop="description"
          label="待办描述"
        />
        <el-table-column
          align="center"
          prop="openDesc"
          width="80"
          label="是否公开"
        />
        <el-table-column
          align="center"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="revocatHandle(scope.row)">撤销</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 提交待办弹出框 -->
    <el-dialog title="提交本次待办" :visible.sync="commitDialog">
      <el-form :label-position="'left'" label-width="100px" :model="addTodoData">
        <el-form-item label="备注">
          <el-input
            v-model="addTodoData.remarks"
            placeholder="备注"
            type="textarea"
            :rows="2"
            maxlength="50"
            show-word-limit
            resize="none"
          />
        </el-form-item>
        <el-form-item label="选择心情">
          <el-radio-group v-model="addTodoData.mood">
            <el-radio :label="0">😀开心</el-radio>
            <el-radio :label="1">😌累</el-radio>
            <el-radio :label="2">😠生气</el-radio>
            <el-radio :label="3">🙃无语</el-radio>
            <el-radio :label="4">😵晕</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="commitDialog = false">取 消</el-button>
        <el-button type="primary" @click="sureAddEvent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TabsList',
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    currentTodo: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      completeTableData: [],
      pendingTableData: [],
      commitDialog: false,
      addTodoData: {
        remarks: '',
        mood: 0
      }
    }
  },
  watch: {
    tableData: {
      handler(val) {
        console.log(val)
      },
      deep: true
    }
  },
  mounted() {
    this.tableData.forEach(item => {
      item.complete === '1' ? this.completeTableData.push(item) : this.pendingTableData.push(item)
    })
  },
  methods: {
    completeHandle() {},
    deleteHandle() {},
    revocatHandle() {},
    commitHandle() {
      this.commitDialog = true
      console.log(this.currentTodo)
    },
    sureAddEvent() {}
  }
}
</script>

<style lang="scss" scoped>
    .list-container{
        .pending,.complete{
            h5{
                line-height: 32px;
                font-size: 16px;
                padding: 0 10px;
                margin: 0;
            }
            .pending-text{
                margin-top: 15px;
                border:1px solid #ebeef5;
                border-bottom: none;
                border-radius: 15px 15px 0 0 ;
                color:rgb(255, 187, 0);
            }
            .complete-text{
                margin-top: 15px;
                border:1px solid  #ebeef5;
                border-bottom: none;
                border-radius: 15px 15px 0 0 ;
                color:rgb(125, 238, 80);
            }
        }
    }
</style>
