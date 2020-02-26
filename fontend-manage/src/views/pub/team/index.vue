<template>
  <div id="team">
    <div class="container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('team.searchForm.team_teacher.label')">
          <el-input
            v-model="searchForm.team_teacher"
            :placeholder="$t('team.searchForm.team_teacher.placeholder')">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="onSearch">{{ $t("team.searchForm.searchdata.name") }}</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("team.button.addone") }}</el-button>
          <el-button type="warning" icon="el-icon-plus" @click="handleDownload">{{ $t("team.button.bulkImport") }}</el-button>
          <span>{{ $t('team.total') }} {{ teamList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="team-content">
        <el-table :data="teamList" border @cell-mouse-enter="mouseEnter">
            <el-table-column 
            :label="$t('team.table.id.name')" 
            type="index" 
            width="55"
          />
      <!-- <template scope="scope"> -->
            <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
          <!-- </template> -->
            <el-table-column
              :label="$t('team.table.team_img.name')" 
              prop="team_img"
            />
            <el-table-column
              :label="$t('team.table.team_teacher.name')" 
              prop="team_teacher"
            />
            <el-table-column
              :label="$t('team.table.team_person.name')" 
              prop="team_person"
            />
            <el-table-column
              :label="$t('team.table.team_comment.name')" 
              prop="team_comment"
            />
            <el-table-column
              :label="$t('team.table.operate')" 
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
                  @click.stop="deleteTeam()"
                >删除</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="paginationDad">
        <page-component :total="teamList.length" @pageChange="(item)=>handlePageChange(item)" />
      </div>
      <add-dialog ref="addDialog" title="添加团队建设信息" @OnConfirm="(item)=>addOne(item,'post')" />
      <add-dialog ref="updateDialog" title="修改团队建设信息" @OnConfirm="(item)=>addOne(item,'post')" />
    </div>
  </div>
</template>
<script>
// import { getteamList, getclientlist } from "@/api/deliver";
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
        team_teacher: ''
      },
      teamList: [],
      focusedRecord: {},
      addForm: {
      },
    }
  },
  mounted() {
    this.getteamList();
  },
  methods: {
    addOne(data, method) {
      console.log(data, method);
      this.teamList.push(data)
      // 发送添加请求
    },
    handleDownload() {
      
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
    getteamList() {
      const item = {
        team_img: '二级团队建设内容。。。',
        team_teacher: '二级团队建设内容。。。',
        team_person: '二级团队建设内容。。。',
        team_comment: '二级团队建设内容。。。'
      };

      for (let i = 0; i < 5; i++) {
        this.teamList.push(item)
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
    deleteTeam() {
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
.team-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
