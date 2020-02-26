<template>
  <div id="suc">
    <div class="container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('suc.searchForm.suc_title.label')">
          <el-input
            v-model="searchForm.suc_title"
            :placeholder="$t('suc.searchForm.suc_title.placeholder')">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="onSearch">{{ $t("suc.searchForm.searchdata.name") }}</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("suc.button.addone") }}</el-button>
          <el-button type="warning" icon="el-icon-plus" @click="handleDownload">{{ $t("suc.button.bulkImport") }}</el-button>
          <span>{{ $t('suc.total') }} {{ sucList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="suc-content">
        <el-table :data="sucList" border @cell-mouse-enter="mouseEnter">
            <el-table-column 
            :label="$t('suc.table.id.name')" 
            type="index" 
            width="55"
          />
      <!-- <template scope="scope"> -->
            <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
          <!-- </template> -->
            <el-table-column
              :label="$t('suc.table.suc_video.name')" 
              prop="suc_video"
            />
            <el-table-column
              :label="$t('suc.table.suc_title.name')" 
              prop="suc_title"
            />
            <el-table-column
              :label="$t('suc.table.operate')"
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
                  @click.stop="deleteSuc()"
                >删除</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="paginationDad">
        <page-component :total="sucList.length" @pageChange="(item)=>handlePageChange(item)" />
      </div>
      <add-dialog ref="addDialog" title="添加竞赛历程" @OnConfirm="(item)=>addOne(item,'post')" />
      <add-dialog ref="updateDialog" title="修改竞赛历程" @OnConfirm="(item)=>addOne(item,'post')" />
    </div>
  </div>
</template>
<script>
// import { getsucList, getclientlist } from "@/api/deliver";
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
        suc_title: ''
      },
      sucList: [],
      focusedRecord: {},
      addForm: {
      },
    }
  },
  mounted() {
    this.getsucList();
  },
  methods: {
    addOne(data, method) {
      console.log(data, method);
      this.sucList.push(data)
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
    getsucList() {
      const item = {
        suc_video: '成果展示内容。。。',	//首页成果展示大赛视频
        suc_title: '成果展示内容。。。',	//首页成果展示标题
      };

      for (let i = 0; i < 5; i++) {
        this.sucList.push(item)
      }
    },
    onSearch() {
      console.log(this.searchForm);
    // 发送搜索请求
    },
    handleDownload() {
      
    },
    handlePageChange(item) {
      console.log(item.pageSize, item.currentPage)
      // 发送分页查询请求
    },
    //删除表格一条数据
    deleteSuc() {
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
.suc-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
