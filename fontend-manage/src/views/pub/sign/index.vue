<template>
  <div id="sign">
    <div class="container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('sign.searchForm.sign_stime.label')">
          <el-input
            v-model="searchForm.sign_stime"
            :placeholder="$t('sign.searchForm.sign_stime.placeholder')">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('sign.searchForm.sign_etime.label')">
          <el-input
            v-model="searchForm.sign_etime"
            :placeholder="$t('sign.searchForm.sign_etime.placeholder')">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="onSearch">{{ $t("sign.searchForm.searchdata.name") }}</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("sign.button.addone") }}</el-button>
          <el-button type="warning" icon="el-icon-plus" @click="handleDownload">{{ $t("sign.button.bulkImport") }}</el-button>
          <span>{{ $t('sign.total') }} {{ signList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="sign-content">
        <el-table :data="signList" border @cell-mouse-enter="mouseEnter">
            <el-table-column 
            :label="$t('sign.table.id.name')" 
            type="index" 
            width="55"
          />
      <!-- <template scope="scope"> -->
            <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
          <!-- </template> -->
            <el-table-column
              :label="$t('sign.table.sign_img.name')"
              prop="sign_img"
            />
            <el-table-column
              :label="$t('sign.table.sign_title.name')" 
              prop="sign_title"
            />
            <el-table-column
              :label="$t('sign.table.sign_stime.name')" 
              prop="sign_stime"
            />
            <el-table-column
              :label="$t('sign.table.sign_etime.name')" 
              prop="sign_etime"
            />
            <el-table-column
              :label="$t('sign.table.sign_sm_time.name')" 
              prop="sign_sm_time"
            />
            <el-table-column
              :label="$t('sign.table.sign_em_time.name')" 
              prop="sign_em_time"
            />
            <el-table-column
              :label="$t('sign.table.totle_time.name')" 
              prop="totle_time"
            />
            <el-table-column
              :label="$t('sign.table.sign_sponsor.name')" 
              prop="sign_sponsor"
            />
            <el-table-column
              :label="$t('sign.table.operate')" 
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
                  @click.stop="deleteSign()"
                >删除</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="paginationDad">
        <page-component :total="signList.length" @pageChange="(item)=>handlePageChange(item)" />
      </div>
      <add-dialog ref="addDialog" title="添加竞赛历程" @OnConfirm="(item)=>addOne(item,'post')" />
      <add-dialog ref="updateDialog" title="修改竞赛历程" @OnConfirm="(item)=>addOne(item,'post')" />
    </div>
  </div>
</template>
<script>
// import { getsignList, getclientlist } from "@/api/deliver";
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
        sign_stime: '',
        sign_etime: '',
      },
      signList: [],
      focusedRecord: {},
      addForm: {
      }
    }
  },
  mounted() {
    this.getsignList();
  },
  methods: {
    addOne(data, method) {
      console.log(data, method);
      // this.signList.push(data)
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
    getsignList() {
      const item = {
        sign_img: '竞赛报名内容。。。',	//二级竞赛报名大赛图片
        sign_title: '竞赛报名内容。。。',	//二级竞赛报名大赛标题
        sign_stime: '竞赛报名内容。。。',	//二级竞赛报名开始时间
        sign_etime: '竞赛报名内容。。。',	//二级竞赛报名结束时间
        sign_sm_time: '竞赛报名内容。。。',	//二级竞赛比赛开始时间
        sign_em_time: '竞赛报名内容。。。',	//二级竞赛比赛结束时间
        sign_sponsor: '竞赛报名内容。。。',	//二级竞赛大赛主办方
        totle_time: '竞赛报名内容。。。',	//二级竞赛大赛比赛总时长
      };

      for (let i = 0; i < 5; i++) {
        this.signList.push(item)
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
    deleteSign() {
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
.sign-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
