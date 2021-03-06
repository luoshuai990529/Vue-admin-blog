<template>
  <div class="list-container">
    <div class="clearfix">
      <el-button v-if="!hidecommit" :disabled="tableData.length===0" type="primary" size="small" style="float:right" @click="commitHandle">提交待办</el-button>
    </div>
    <!-- 进行中的事件 -->
    <div class="pending">
      <h5 class="pending-text">进行中：</h5>
      <el-table
        :data="getPendingData"
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
            <el-button v-if="hidebtn" type="danger" size="mini" @click="deleteHandle(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 已完成的事件 -->
    <div class="complete">
      <h5 class="complete-text">已完成：</h5>
      <el-table
        :data="getCompleteData"
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
import { mapGetters } from 'vuex'
import { parseTime, getWeekStartDateAndEndDateRange, getMonthStartDateAndDateRange, getYearStartDateAndDateRange } from '@/utils/index'
import { completeEvent, cancleEvent, deleteEvent, commitEvent } from '@/api/todo'
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
    },
    hidebtn: {
      type: Boolean,
      default: true
    },
    hidecommit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      allTableData: [],
      commitDialog: false,
      start_time: '',
      addTodoData: {
        remarks: '',
        mood: 0
      }
    }
  },
  computed: {
    ...mapGetters(['userId']),
    getCompleteData() {
      const completeArr = []
      this.tableData.forEach(item => {
        item.complete === '1' ? completeArr.push(item) : ''
      })
      return completeArr
    },
    getPendingData() {
      const pendingArr = []
      this.tableData.forEach(item => {
        item.complete === '1' ? '' : pendingArr.push(item)
      })
      return pendingArr
    }
  },
  methods: {
    async completeHandle({ id }) {
      const result = await completeEvent(id)
      this.successHandle(result.message)
    },
    async deleteHandle({ id }) {
      this.$confirm('你确定要删除此条待办吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const result = await deleteEvent(id)
        this.successHandle(result.message)
      })
    },
    async revocatHandle({ id }) {
      const result = await cancleEvent(id)
      this.successHandle(result.message)
    },
    commitHandle() {
      this.addTodoData.remarks = ''
      if (this.tableData.length === 0) {
        this.$message({
          type: 'info',
          message: '当前没有可提交的待办事项~'
        })
      } else {
        this.commitDialog = true
        const dayTime = parseTime(new Date(new Date().toLocaleDateString()).getTime(), '{y}-{m}-{d} {h}:{i}:{s}')
        const weekTime = parseTime(getWeekStartDateAndEndDateRange()[0], '{y}-{m}-{d} {h}:{i}:{s}')
        const monthTime = parseTime(getMonthStartDateAndDateRange()[0], '{y}-{m}-{d} {h}:{i}:{s}')
        const yearTime = parseTime(getYearStartDateAndDateRange()[0], '{y}-{m}-{d} {h}:{i}:{s}')
        switch (this.currentTodo) {
          case 0:
            this.start_time = dayTime
            break
          case 1:
            this.start_time = weekTime
            break
          case 2:
            this.start_time = monthTime
            break
          case 3:
            this.start_time = yearTime
            break
          default:
            this.start_time = ''
            break
        }
      }
    },
    async sureAddEvent() {
      const data = { ...this.addTodoData, id: this.currentTodo, start_time: this.start_time, uid: this.userId }
      const result = await commitEvent(data)
      this.commitDialog = false
      this.successHandle(result.message)
    },
    successHandle(message) {
      this.$message({
        type: 'success',
        message: message
      })
      this.$emit('successHandle')
    }

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
