<template>
  <div id="user">
    <div class="container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('user.searchForm.username.label')">
          <el-input
            v-model="searchForm.username"
            :placeholder="$t('user.searchForm.username.placeholder')">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="onSearch">{{ $t("user.searchForm.searchdata.name") }}</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("user.button.addone") }}</el-button>
          <span>{{ $t('user.total') }} {{ userList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="user-content">
        <el-table :data="userList" border @cell-mouse-enter="mouseEnter">
            <el-table-column
            :label="$t('user.table.id.name')"
            type="index"
            width="55"
          />
      <!-- <template scope="scope"> -->
            <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
          <!-- </template> -->
            <el-table-column
              :label="$t('user.table.username.name')"
              prop="username"
            />
            <el-table-column
              :label="$t('user.table.password.name')"
              prop="password"
            />
            <el-table-column
              :label="$t('user.table.operate')"
              prop="operation"
              align="center"
              width="200"
            >
              <template>
                <el-button
                  type="primary"
                  size="mini"
                  class="el-icon-edit"
                  @click.stop="$refs.updateDialog.open(focusedRecord)"
                >修改</el-button>
              </template>
              <template>
                <el-button
                  type="danger"
                  size="mini"
                  class="el-icon-delete"
                  @click.stop="deleteUser()"
                >删除</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="paginationDad">
        <page-component :total="userList.length" @pageChange="(item)=>handlePageChange(item)" />
      </div>
      <add-dialog ref="addDialog" title="添加用户" @OnConfirm="(item)=>addOne(item,'post')" />
      <add-dialog ref="updateDialog" title="修改用户" @OnConfirm="(item)=>addOne(item,'post')" />

    </div>
  </div>
</template>
<script>
// import { getuserList, getclientlist } from "@/api/deliver";
import AddDialog from './edit-dialog'
import PageComponent from '@/components/pagination/index'
export default {
  components: {
    AddDialog,
    PageComponent
  },
  data () {
    return {
      searchForm: {
        username: ''
      },
      userList: [],
      addForm: {
      },
      focusedRecord: {}
    }
  },
  mounted () {
    this.getuserList()
  },
  methods: {
    addOne (data, method) {
      console.log(data, method)
      this.userList.push(data)
      // 发送添加请求
    },
    mouseEnter (data) {
      // console.log(data);//这里可以打印每一行的内容
      // 点击编辑
      this.dialogFormVisible = true // 显示弹框
      // let _row = row
      // 将每一行的数据赋值给dialog弹框
      this.focusedRecord = Object.assign({}, data)// focusedRecord是弹框的data
    },
    // 获取记录日志
    getuserList () {
      const item = {
        password: '密码',
        username: '用户名'
      }

      for (let i = 0; i < 5; i++) {
        this.userList.push(item)
      }
    },
    onSearch () {
      console.log(this.searchForm)
    // 发送搜索请求
    },
    handlePageChange (item) {
      console.log(item.pageSize, item.currentPage)
      // 发送分页查询请求
    },
    // 删除表格一条数据
    deleteUser () {
      // 发送删除请求
      this.$confirm('确认删除吗？', '询问', {
        cancelButtonText: '取消',
        confirmButtonText: '确认',
        lockScroll: false,
        closeOnClickModal: false,
        type: 'warning'
      }).catch(() => { return false })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.demo-form-inline{
  margin:0 0 0 0;
  display:flex;
  justify-content: center;
}
.el-date-editor .el-range-input{
  margin:3px!important;
}
.user-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
