<template>
  <div id="info">
    <div class="container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('info.searchForm.info_state.label')">
          <el-input
            v-model="searchForm.info_state"
            :placeholder="$t('info.searchForm.info_state.placeholder')">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="onSearch">{{ $t("info.searchForm.searchdata.name") }}</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("info.button.addone") }}</el-button>
          <el-button type="warning" icon="el-icon-download" @click="handleDownload">{{ $t("info.button.bulkImport") }}</el-button>
          <span>{{ $t('info.total') }} {{ infoList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="info-content">
        <el-table :data="infoList" border @cell-mouse-enter="mouseEnter">
          <el-table-column 
            :label="$t('info.table.id.name')"
            type="index" 
            width="55"
          />
      <!-- <template scope="scope"> -->
            <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
          <!-- </template> -->
            <el-table-column
              :label="$t('info.table.info_icon.name')"
              prop="info_icon"
            />
            <el-table-column
              :label="$t('info.table.info_title.name')"
              prop="info_title"
            />
            <el-table-column
              :label="$t('info.table.info_intro.name')"
              prop="info_intro"
            />
            <el-table-column
              :label="$t('info.table.info_state.name')"
              prop="info_state"
            />
            <el-table-column
              :label="$t('info.table.operate')"
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
                  @click.stop="deleteInfo()"
                >删除</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="paginationDad">
        <page-component :total="infoList.length" @pageChange="(item)=>handlePageChange(item)" />
      </div>
      <add-dialog ref="addDialog" title="添加信息" @OnConfirm="(item)=>addOne(item,'post')" />
      <add-dialog ref="updateDialog" title="修改信息" @OnConfirm="(item)=>addOne(item,'post')" />
    </div>
  </div>
</template>
<script>
// import { getinfolist, getclientlist } from "@/api/deliver";
import AddDialog from "./edit-dialog";
import PageComponent from '@/components/pagination/index'
export default {
  components: {
    AddDialog,
    PageComponent
  },
  data() {
    return {
      searchForm: {
        info_state: ''
      },
      infoList: [],
      focusedRecord: {},
      addForm: {
      }
    }
  },
  mounted() {
    this.getinfolist();
  },
  methods: {
    addOne(data, method) {
      console.log(data, method);
      this.infoList.push(data)
      // 发送添加请求
    },
    mouseEnter(data) {
      // console.log(data);//这里可以打印每一行的内容
      // 点击编辑
      this.dialogFormVisible = true // 显示弹框
      // let _row = row
      // 将每一行的数据赋值给dialog弹框
      this.focusedRecord = Object.assign({}, data);// focusedRecord是弹框的data
    },
    // 获取记录日志
    getinfolist() {
      const item = {
        id: '1',
        info_icon: '路径。。。',
        info_title: '标题。。。',
        info_intro: '简介。。。',
        info_state: '火热报名中'
      };

      for (let i = 0; i < 5; i++) {
        this.infoList.push(item)
      }
    },
    onSearch() {
      console.log(this.searchForm);
    // 发送搜索请求
    },
    handleDownload() {
    // 导出EXCEL 
    },
    handlePageChange(item) {
      console.log(item.pageSize, item.currentPage)
      // 发送分页查询请求
    },
    //删除表格一条数据
    deleteInfo() {
      //发送删除请求
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
.info-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
