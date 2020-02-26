<template>
  <div id="newstwo">
    <div class="container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('newstwo.searchForm.newstwodate.label')">
            <el-date-picker
            v-model="searchForm.newstwodate"
            type="date"
            :placeholder="$t('newstwo.searchForm.newstwodate.placeholder')">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="onSearch">{{ $t("newstwo.searchForm.searchdata.name") }}</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("newstwo.button.addone") }}</el-button>
          <span>{{ $t('newstwo.total') }} {{ newstwoList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="newstwo-content">
        <el-table :data="newstwoList" border>
            <el-table-column 
            :label="$t('newstwo.table.id.name')"
            type="index" 
            width="55"
          />
      <!-- <template scope="scope"> -->
            <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
          <!-- </template> -->
            <el-table-column
              :label="$t('newstwo.table.newstwo_content.name')"
              prop="newstwo_content"
            />
            <el-table-column
              :label="$t('newstwo.table.newstwo_time.name')"
              prop="newstwo_time"
            />
            <el-table-column
              :label="$t('newstwo.table.operate')"
              prop="operation"
              align="center"
              width="200"
            >
              <template>
                <el-button
                  type="danger"
                  size="mini"
                  class="el-icon-delete"
                  @click.stop="deletenewstwo()"
                >删除</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="paginationDad">
        <page-component :total="newstwoList.length" @pageChange="(item)=>handlePageChange(item)" />
      </div>
      <add-dialog ref="addDialog" title="添加新闻" @OnConfirm="(item)=>addOne(item,'post')" />
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
        newstwodate: ''
      },
      newstwoList: []
    }
  },
  mounted() {
    this.getnewstwoList();
  },
  methods: {
    addOne(data, method) {
      console.log(data, method);
      this.infoList.push(data)
      // 发送添加请求
    },
    // 获取记录日志
    getnewstwoList() {
      const item = {
        newstwo_content: '新闻部分内容',	//二级新闻公告竞赛新闻内容
        newstwo_time: '新闻部分时间',	//二级新闻公告竞赛新闻时间
      };

      for (let i = 0; i < 5; i++) {
        this.newstwoList.push(item)
      }
    },
    onSearch() {
      console.log(this.searchForm);
    // 发送搜索请求
    },
    handlePageChange(item) {
      console.log(item.pageSize, item.currentPage)
      // 发送分页查询请求
    },
    //删除表格一条数据
    deletenewstwo() {
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
.newstwo-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
