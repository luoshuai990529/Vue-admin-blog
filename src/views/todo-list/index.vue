<template>
  <div class="todolist-container">
    <el-card class="head-card">
      <div class="head-warp clearfix">
        <h3>{{ currentTime }}</h3>
        <el-button type="primary" size="small" @click="addNewTodo">新增待办</el-button>
      </div>
    </el-card>
    <!-- 待办tab栏 -->
    <TodoTabs />
    <!-- 新增待办弹出框 -->
    <el-dialog title="新增待办事项" :visible.sync="addNewDialog">
      <el-form :label-position="'left'" label-width="100px" :model="addTodoData">
        <el-form-item label="时段">
          <el-radio-group v-model="addTodoData.todoType">
            <el-radio :label="0">日待办</el-radio>
            <el-radio :label="1">周待办</el-radio>
            <el-radio :label="2">月待办</el-radio>
            <el-radio :label="3">年待办</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="待办描述">
          <el-input
            v-model="addTodoData.description"
            placeholder="请输入待办事项描述"
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="是否公开">
          <el-radio-group v-model="addTodoData.open">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优先级">
          <el-radio-group v-model="addTodoData.priority">
            <el-radio :label="1">高</el-radio>
            <el-radio :label="2">中</el-radio>
            <el-radio :label="3">低</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签">
          <el-input
            v-model="addTodoData.tags"
            placeholder="事项标签选填(生活、学习...)"
            maxlength="10"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNewDialog = false">取 消</el-button>
        <el-button type="primary" @click="sureAddEvent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createEvent } from '@/api/todo'
import { parseTime } from '@/utils/index'
import TodoTabs from './components/TodoTabs.vue'
export default {
  components: {
    TodoTabs
  },
  data() {
    return {
      currentTime: parseTime(new Date().toLocaleDateString(), '{y}-{m}-{d} 周{a}'),
      addNewDialog: false,
      addTodoData: {
        todoType: 0,
        description: '',
        open: 1,
        priority: 1,
        tags: ''
      }
    }
  },
  methods: {
    addNewTodo() {
      this.addNewDialog = true
    },
    async sureAddEvent() {
      this.addNewDialog = false
      const result = await createEvent(this.addTodoData)
      if (result.code === 200) {
        this.$message({
          message: result.message,
          type: 'success'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.todolist-container{
   padding: 25px 15px ;
   .head-warp{
      h3{
        margin: 0 0;
        float: left;
        line-height: 32px;
      }
      button{
        float: right;
      }
   }
}
</style>
