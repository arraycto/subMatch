<template>
  <el-dialog id="edit-dialog" title="添加信息" :visible.sync="visable" :lock-scroll="false" center width="60%" top="5.5rem" :close-on-click-modal="false">
    <el-form ref="dataForm" :model="item" :rules="rules" label-width="140px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛图片:" prop="sign_img">
            <el-input v-model="item.sign_img" placeholder="请上传比赛图片" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛标题:" prop="sign_title">
            <el-input v-model="item.sign_title" placeholder="请输入比赛标题" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="报名开始时间:" prop="sign_stime">
            <el-input v-model="item.sign_stime" placeholder="请输入比赛报名开始时间" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="报名结束时间:" prop="sign_etime">
            <el-input v-model="item.sign_etime" placeholder="请输入比赛报名结束时间" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛开始时间:" prop="sign_sm_time">
            <el-input v-model="item.sign_sm_time" placeholder="请输入比赛开始时间" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛结束时间:" prop="sign_em_time">
            <el-input v-model="item.sign_em_time" placeholder="请输入比赛结束时间" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛主办方:" prop="sign_sponsor">
            <el-input v-model="item.sign_sponsor" placeholder="请输入比赛主办方" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="比赛总时长:" prop="totle_time">
            <el-input v-model="item.totle_time" placeholder="请输入比赛总时长" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <span slot="footer">
      <el-button type="success" plain @click="submitForm('dataForm')">提交</el-button>
      <el-button type="warning" plain @click="resetForm('dataForm')">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "title"
    }
  },
  data() {
    return {
      visable: false,
      item: {
        sign_img: '比赛报名内容。。。',	//二级竞赛报名大赛图片
        sign_title: '比赛报名内容。。。',	//二级竞赛报名大赛标题
        sign_stime: '比赛报名内容。。。',	//二级竞赛报名开始时间
        sign_etime: '比赛报名内容。。。',	//二级竞赛报名结束时间
        sign_sm_time: '比赛报名内容。。。',	//二级竞赛比赛开始时间
        sign_em_time: '比赛报名内容。。。',	//二级竞赛比赛结束时间
        sign_sponsor: '比赛报名内容。。。',	//二级竞赛大赛主办方
        totle_time: '比赛报名内容。。。',	//二级竞赛大赛比赛总时长
      },
      rules: {
        sign_img: [
          { required: true, message: '请上传比赛图片 ', trigger: 'blur' }
        ],
        sign_title: [
          { required: true, message: '请输入比赛标题', trigger: 'blur' }
        ],
        sign_stime: [
          { required: true, message: '请输入比赛报名开始时间', trigger: 'blur' }
        ],
        sign_etime: [
          { required: true, message: '请输入比赛报名结束时间', trigger: 'blur' }
        ],
        sign_sm_time: [
          { required: true, message: '请输入比赛开始时间', trigger: 'blur' }
        ],
        sign_em_time: [
          { required: true, message: '请输入比赛结束时间', trigger: 'blur' }
        ],
        sign_sponsor: [
          { required: true, message: '请输入比赛主办方', trigger: 'blur' }
        ],
        totle_time: [
          { required: true, message: '请输入比赛总时长', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open (item) {
      this.visable = true;
      if (item === undefined || item === null) {
        this.item = {};
      } else {
        this.item = item;
        this.type = this.item.type;
      }
    },
    submitForm(dataForm) {
      console.log('用户提交了信息了');
      console.log(this.$refs);
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm("确认保存吗？", "询问", {
            cancelButtonText: "取消",
            cancelButtonClass: "cancelButton",
            confirmButtonText: "确认",
            lockScroll: false,
            type: "warning"
          }).then(() => {
            console.log('enter then');
            console.log(this);
            this.$emit("OnConfirm", this.item);
            this.visable = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(dataForm) {
      this.$nextTick(() => {
        this.$refs[dataForm].clearValidate();
      })
      this.visable = false;
      this.totaltime = '';// 这个不是表单元素，而是通过js脚本计算出的，就单独重置
    }

  }
}
</script>
<style lang="scss" scoped>
</style>
