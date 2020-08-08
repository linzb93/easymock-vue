<template>
  <div class="wrapper full-height">
    <div class="left-config">
      <div class="config-form-wrapper">
        <el-form
          :rules="rules"
          :model="data"
          ref="apiForm"
        >
          <el-form-item label="名称" prop="name">
            <el-input placeholder="请输入标题" v-model="data.name" />
          </el-form-item>
          <el-form-item label="方式" prop="type">
            <el-select v-model="data.type">
              <el-option v-for="item in typeList" :key="item">{{item}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" prop="url">
            <el-input placeholder="请输入地址" v-model="data.url" />
          </el-form-item>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form>
      </div>
    </div>
    <div class="code-con">
      <MonacoEditor
        width="800"
        height="100%"
        language="javascript"
        :code="data.code"
        :editorOptions="{fontSize: 16}"
        @codeChange="onCodeChange"
    />
    </div>
  </div>
</template>

<script>
import router from '@/router';
import {getApiDetail, createApi, updateApi} from '@/services/api';

export default {
  name: 'Create',
  data() {
    return {
      data: {
        name: '',
        type: 'get',
        url: '',
        code: ''
      },
      id: this.$route.params.api_id,
      project_id: this.$route.params.project_id,
      typeList: ['get', 'post', 'delete', 'put', 'patch'],
      rules: {
        name: [{
          required: true,
          message: '请输入名称'
        }],
        type: [{
          required: true,
          message: '请选择方式'
        }],
        url: [{
          required: true,
          message: '请输入地址'
        }],
        code: [{
          required: true,
          message: '请输入返回值'
        }]
      }
    }
  },

  mounted() {
    if (this.id) {
      getApiDetail({
        id: this.id
      })
      .then(res => {
        const {data} = res;
        this.data = data;
      });
    }
  },

  methods: {
    // 提交
    submit() {
      const form = this.$refs['apiForm'];
      form.validate(valid => {
        if (!valid) {
          return;
        }
        if (this.id) {
          updateApi({
            id: this.id,
            ...this.data
          })
          .then(() => {
            this.$message.success('更新成功');
            this.goBack();
          });
        } else {
          createApi({
            project_id: this.project_id,
            ...this.data
          })
          .then(() => {
            this.$message.success('添加成功');
            this.goBack();
          });
        }
      });
    },
    // 返回
    goBack() {
      router.back();
    }
  }
}
</script>

<style>

</style>