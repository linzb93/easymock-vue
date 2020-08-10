<template>
  <div class="wrapper full-height">
    <div class="left-config">
      <div class="config-form-wrapper">
        <el-form
          :rules="rules"
          :model="data"
          ref="apiForm"
          label-width="60px"
        >
          <el-form-item label="名称" prop="name">
            <el-input placeholder="请输入标题" v-model="data.name" />
          </el-form-item>
          <el-form-item label="方式" prop="type">
            <el-select v-model="data.type" style="width: 100%;">
              <el-option v-for="item in typeList" :key="item" :value="item">{{item}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" prop="url">
            <el-input placeholder="请输入地址" v-model="data.url" />
          </el-form-item>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form>
      </div>
    </div>
    <div class="code-con">
      <monaco-editor
        width="800"
        height="100%"
        :changeThrottle="100"
        language="javascript"
        :code="data.code"
        :editorOptions="options"
        @mounted="onMounted"
        @codeChange="onCodeChange"
    />
    </div>
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco-editor';
import router from '@/router';
import {getApiDetail, createApi, updateApi} from '@/services/api';

export default {
  name: 'Create',
  components: {
    MonacoEditor
  },
  data() {
    return {
      data: {
        name: '',
        type: 'get',
        url: '',
        code: ''
      },
      options: {
        selectOnLineNumbers: false
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
      .then(({data}) => {
        this.data = data.data;
        console.log(this.data.code)
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
    },
    onCodeChange(editor) {
      this.data.code = editor.getValue();
    },
    onMounted(editor) {
      this.editor = editor;
    }
  }
}
</script>

<style>
.code-con {
  padding-left: 320px;
  height: 100%;
  position: relative;
}
.left-config {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  height: 100%;
  width: 320px;
  background: #f5f5f5;
}
.config-form-wrapper {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 10px;
  width: 300px;
}
</style>