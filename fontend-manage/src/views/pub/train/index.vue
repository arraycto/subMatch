<template>
  <div id="train">
    <div class="container">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("train.button.addone") }}</el-button>
          <el-button type="warning" icon="el-icon-plus" @click="handleDownload">{{ $t("train.button.bulkImport") }}</el-button>
          <span>{{ $t('train.total') }} {{ trainList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="train-content">
        <el-table :data="trainList" border @cell-mouse-enter="mouseEnter">
            <el-table-column 
            :label="$t('train.table.id.name')"
            type="index" 
            width="55"
          />
      <!-- <template scope="scope"> -->
            <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
          <!-- </template> -->
            <el-table-column
              :label="$t('train.table.train_content.name')"
              prop="train_content"
            />
            <el-table-column
              :label="$t('train.table.train_time.name')"
              prop="train_time"
            />
            <el-table-column
              :label="$t('train.table.operate')"
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
                  @click.stop="deleteTrain()"
                >删除</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="paginationDad">
        <page-component :total="trainList.length" @pageChange="(item)=>handlePageChange(item)" />
      </div>
      <add-dialog ref="addDialog" title="添加团队建设信息" @OnConfirm="(item)=>addOne(item,'post')" />
      <add-dialog ref="updateDialog" title="修改团队建设信息" @OnConfirm="(item)=>addOne(item,'post')" />
    </div>
  </div>
</template>
<script>
// import { gettrainList, getclientlist } from "@/api/deliver";
import AddDialog from "./edit-dialog";
import PageComponent from '@/components/pagination/index'
export default {
  components: {
    AddDialog,
    PageComponent
  },
  data() {
    return {
      trainList: [],
      focusedRecord: {},
      addForm: {
      },
      excelData: []
    }
  },
  mounted() {
    this.gettrainList();
  },
  methods: {
    addOne(data, method) {
      console.log(data, method);
      this.trainList.push(data)
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
    gettrainList() {
      const item = {
        id: '1',
        train_content: '竞赛培训内容。。。。',
        train_time: '竞赛培训内容。。。。',
        lunbo_img: '首页轮播。。。。。',
        down_content: '二级资料内容下载。。。。。'
      };

      for (let i = 0; i < 5; i++) {
        this.trainList.push(item)
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
    deleteTrain() {
      //发送删除请求
      this.$confirm('确认删除吗？', '询问', {
        cancelButtonText: '取消',
        confirmButtonText: '确认',
        lockScroll: false,
        closeOnClickModal: false,
        type: 'warning'
      }).catch(() => {return false})
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.train-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
