<template>
  <div id="suctwo">
    <div class="container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item :label="$t('suctwo.searchForm.suctwo_title.label')">
          <el-input
            v-model="searchForm.suctwo_title"
            :placeholder="$t('suctwo.searchForm.suctwo_title.placeholder')">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="onSearch">{{ $t("suctwo.searchForm.searchdata.name") }}</el-button>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="$refs.addDialog.open(null)">{{ $t("suctwo.button.addone") }}</el-button>
          <el-button type="warning" icon="el-icon-plus" @click="handleDownload">{{ $t("suctwo.button.bulkImport") }}</el-button>
          <span>{{ $t('suctwo.total') }} {{ suctwoList.length }} 条</span>
        </el-form-item>
      </el-form>
      <div class="suctwo-content">
        <el-table :data="suctwoList" border @cell-mouse-enter="mouseEnter">
            <el-table-column 
            :label="$t('suctwo.table.id.name')"
            type="index" 
            width="55"
          />
      <!-- <template scope="scope"> -->
            <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- <span>{{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}</span> -->
          <!-- </template> -->
            <el-table-column
              :label="$t('suctwo.table.suctwo_title.name')" 
              prop="suctwo_title"
            />
            <el-table-column
              :label="$t('suctwo.table.suctwo_img.name')" 
              prop="suctwo_img"
            />
            <el-table-column
              :label="$t('suctwo.table.suctwo_person.name')" 
              prop="suctwo_person"
            />
            <el-table-column
              :label="$t('suctwo.table.suctwo_prize.name')" 
              prop="suctwo_prize"
            />
            <el-table-column
              :label="$t('suctwo.table.operate')" 
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
                  @click.stop="deletesuctwo()"
                >删除</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="paginationDad">
        <page-component :total="suctwoList.length" @pageChange="(item)=>handlePageChange(item)" />
      </div>
      <add-dialog ref="addDialog" title="新增成果" @OnConfirm="(item)=>addOne(item,'post')" />
      <add-dialog ref="updateDialog" title="修改成果" @OnConfirm="(item)=>addOne(item,'post')" />
    </div>
  </div>
</template>
<script>
// import { getsuctwoList, getclientlist } from "@/api/deliver";
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
        suctwo_title: ''
      },
      suctwoList: [],
      focusedRecord: {},
      addForm: {
      },
    }
  },
  mounted() {
    this.getsuctwoList();
  },
  methods: {
    addOne(data, method) {
      console.log(data, method);
      this.suctwoList.push(data)
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
    getsuctwoList() {
      const item = {
        suctwo_title: '二级成果展示标题。。。',
        suctwo_img: '二级成果展示图片地址。。。',
        suctwo_person: '二级成果展示参赛人。。。',
        suctwo_prize: '二级成果展示奖项。。。'
      };

      for (let i = 0; i < 5; i++) {
        this.suctwoList.push(item)
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
    formatJson (filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "enddate" || j === "stadate") {
            return this.timestampToTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    //删除表格一条数据
    deletesuctwo() {
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
.suctwo-content{
  width:100%;
  height:81%;
  overflow-y: scroll;
  overflow-x:hidden;
  @include scrollBar(8px);
}
</style>
