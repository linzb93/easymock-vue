<template>
  <div class="wrapper full-height">
    <div class="login-wrapper">
      <div class="login-box">
        <el-card header="登录" style="width: 100%;">
          <el-form
            :model="loginForm"
            ref="loginForm"
            :rules="rules"
            label-width="80px"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="loginForm.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password" show-password />
            </el-form-item>
            <div style="text-align: center;">
              <el-button type="primary" style="width: 100%;" @click="onSubmit">登录</el-button>
            </div>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import router from '@/router';
import * as user from '@/services/user';

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入姓名'
        }],
        password: [{
          required: true,
          message: '请输入密码'
        }]
      }
    };
  },
  methods: {
    // 提交
    onSubmit() {
      this.$refs['loginForm'].validate(valid => {
        if (!valid) {
          return;
        }
        user.login(this.loginForm)
        .then(res => {
          const {data} = res;
          // 如果账号不存在
          if (data.code === 2) {
            this.$confirm('账号不存在，是否注册一个新账号？','提示', {
              type: 'error'
            })
            .then(() => {
              this.makeRegister(this.loginForm);
            });
          } else if (data.code === 1) {
            this.$message({
              type: 'error',
              message: '密码错误'
            });
          } else {
            Cookies.set('token', data.data.token);
            router.push('/');
            this.$message({
              message: '登录成功',
              type: 'success'
            });
          }
        });
      })
    },
    // 注册
    makeRegister(loginForm) {
      user.register(loginForm)
      .then(res => {
        const {data} = res;
        Cookies.set('token', data.data.token);
            router.push('/');
            this.$message({
              message: '注册成功',
              type: 'success'
            });
      });
    }
  }
}
</script>

<style>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.login-box {
  display: flex;
  width: 600px;
}
</style>