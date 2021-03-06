<template>
  <div class="history-container">
    <!-- 筛选栏目结构 -->
    <el-card class="select-card">
      <el-form ref="form" :inline="true" :model="queryForm" label-width="140px">
        <el-form-item label="选择查询的时间段">
          <el-select v-model="queryForm.dateType" placeholder="请选择" @change="secHandle">
            <el-option
              v-for="item in dateTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="queryForm.time"
            :picker-options="{'firstDayOfWeek': 1}"
            :type="getPickerType"
            :format="getShowFormat"
            :value-format="getPickerFormat"
            placeholder="选择日期时间"
            @change="selectTimeHandle"
          />
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" size="small" :disabled="queryForm.time?false:true" @click="searchHandle">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果列表 -->
    <el-card v-loading="todoLoading" class="select-list">
      <div v-if="!currentSecTime" class="empty-text">
        请输入对应筛选条件进行筛选
      </div>
      <div v-if="searchData.todoHistoryData.length===0&&currentSecTime" class="empty-text">
        没有搜索到该时间段数据或者该时间段数据还未提交
      </div>
      <div v-if="searchData.todoHistoryData.length>0" class="todo-detail">
        <el-table
          :data="searchData.todoHistoryData"
          border
          empty-text="没有数据"
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
            prop="completeDesc"
            width="80"
            label="状态"
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
              <el-button v-if="scope.row.open==='1'" type="text" @click="hideHandle(scope.row)">隐藏</el-button>
              <el-button v-if="scope.row.open==='0'" type="text" @click="showHandle(scope.row)">显示</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="todo-wrap">
          <div class="item remarks"><span class="title">备注:</span><span class="content">{{ searchData.remarks }}</span></div>
          <div class="item mood"><span class="title">心情:</span><span class="content">{{ searchData.moodImg }}</span></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import { queryEventByDate, changeOpen } from '@/api/todo'
export default {
  data() {
    return {
      dateTypeOptions: [{
        value: '0',
        label: '日待办记录'
      }, {
        value: '1',
        label: '周待办记录'
      }, {
        value: '2',
        label: '月待办记录'
      }, {
        value: '3',
        label: '年待办记录'
      }],
      queryForm: {
        dateType: '0',
        time: ''
      },
      searchData: {
        remarks: '',
        mood: '',
        todoHistoryData: []
      },
      currentSecTime: '',
      todoLoading: false
    }
  },
  computed: {
    getPickerType() {
      switch (this.queryForm.dateType) {
        case '0':
          return 'date'
        case '1':
          return 'week'
        case '2':
          return 'month'
        case '3':
          return 'year'
        default:
          return 'date'
      }
    },
    getPickerFormat() {
      switch (this.queryForm.dateType) {
        case '0':
          return 'yyyy-MM-dd HH:mm:ss'
        case '1':
          return ''
        case '2':
          return 'yyyy-MM-dd HH:mm:ss'
        case '3':
          return 'yyyy-MM-dd HH:mm:ss'
        default:
          return 'date'
      }
    },
    getShowFormat() {
      switch (this.queryForm.dateType) {
        case '0':
          return 'yyyy-MM-dd'
        case '1':
          return 'yyyy-第WW周'
        case '2':
          return 'yyyy-MM'
        case '3':
          return 'yyyy'
        default:
          return 'date'
      }
    },
    formatTitle() {
      switch (this.queryForm.dateType) {
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
    getTagsType() {
      switch (this.queryForm.dateType) {
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
  },
  methods: {
    secHandle() {
      this.queryForm.time = ''
    },
    selectTimeHandle(val) {
      if (this.queryForm.dateType === '1') {
        const time = parseTime(new Date(val).getTime() - 1000 * 60 * 60 * 24, '{y}-{m}-{d}')
        this.queryForm.time = time
      }
    },
    async searchHandle() {
      this.currentSecTime = this.queryForm.time
      this.queryForm.time = this.queryForm.dateType === '1' && this.queryForm.time.indexOf('00:00:00') === -1 ? this.queryForm.time + ' 00:00:00' : this.queryForm.time

      this.todoLoading = true
      console.log({ ...this.queryForm })
      const result = await queryEventByDate(this.queryForm)
      this.todoLoading = false
      if (result.data.length > 0) {
        this.searchData.remarks = result.data[0].remarks
        switch (result.data[0].mood) {
          case '0':
            this.searchData.moodImg = '😀'
            break
          case '1':
            this.searchData.moodImg = '😌'
            break
          case '2':
            this.searchData.moodImg = '😠'
            break
          case '3':
            this.searchData.moodImg = '🙃'
            break
          case '4':
            this.searchData.moodImg = '😵'
            break
          default:
            break
        }
        this.searchData.todoHistoryData = result.data
      } else {
        this.searchData.moodImg = ''
        this.searchData.remarks = ''
        this.searchData.todoHistoryData = []
      }
    },
    async hideHandle({ id, open }) {
      const result = await changeOpen({ id, open })
      if (result.code === 200) {
        this.$message({
          type: 'success',
          message: result.message
        })
        this.searchHandle()
      }
    },
    async showHandle({ id, open }) {
      const result = await changeOpen({ id, open })
      if (result.code === 200) {
        this.$message({
          type: 'success',
          message: result.message
        })
        this.searchHandle()
      }
    }

  }
}
</script>
<style lang='scss' scoped>
.history-container{
   padding: 25px 15px ;
   .select-card{
       .el-form-item{
         margin-bottom: 0;
       }
    }
   .select-list{
     min-height: 200px;
     margin-top: 20px;
     .empty-text{
       text-align: center;
       padding: 60px ;
       color: rgb(145, 145, 145);
     }
     .todo-detail{
      .todo-wrap{
        .item{
          margin-top: 10px;
          line-height: 40px;
          border:1px solid #eee;
          .title{
            display: inline-block;
            height: 100%;
            padding: 0 15px;
            background: #eee;
          }
          .content{
            padding: 0 15px;
          }
        }
      }
     }

   }
}
</style>
