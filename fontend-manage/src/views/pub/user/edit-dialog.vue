<template>
  <el-dialog id="edit-dialog" :title="title" :visible.sync="visable" :lock-scroll="false" center width="60%" top="5.5rem" :close-on-click-modal="false">
    <el-form ref="dataForm" :model="item" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="item.username" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="密码:" prop="password">
            <el-input v-model="item.password" placeholder="请输入密码" />
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
        username: '用户名',
        password: '密码'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
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
    }

  }
}
</script>
<style lang="scss" scoped>
</style>
