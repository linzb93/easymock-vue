<template>
  <el-dialog
    title="导入项目"
    :visible="true"
    @close="closeModal"
  >
    <el-upload
      drag
      accept="application/json"
      name="file"
      :show-file-list="false"
      :action="uploadProjectUrl"
      :headers="{token}"
      :on-success="uploadFinished"
      style="text-align: center"
    >
      <i class="el-icon-upload"></i>
      <p>点击或将文件拖拽至此上传</p>
      <p>仅支持上传单个.json文件，不大于2M</p>
    </el-upload>
    <el-link @click="toggleTutorialVisible(true)" v-show="!tutorialVisible">显示导入教程？</el-link>
    <el-card v-show="tutorialVisible" title="导入教程" style="marginTop: 20px;">
      <p>新建一个json格式的文件，字段包括项目名称 name，接口前缀 prefix，描述 description，接口列表 items，是这数组。items数组里面每一项包括：接口名称 name，地址 url，请求方式 type，返回内容 code。</p>
      <div style="text-align: right;">
        <el-link @click="toggleTutorialVisible(false)">关闭</el-link>
      </div>
    </el-card>
    <el-card title="错误信息" style="marginTop: 20px;" v-if="error_list.length > 0">
      <span v-for="item in error_list" :key="item">{{item}}</span>
    </el-card>
  </el-dialog>
</template>

<script>
import Cookies from 'js-cookie';
import {uploadProjectUrl} from '@/services/project';

export default {
  name: 'Import',
  data() {
    return {
      token: Cookies.get('token'),
      uploadProjectUrl,
      error_list: [],         // 错误信息列表
      tutorialVisible: false  // 是否显示教程
    }
  },
  methods: {
    // 文件已上传
    uploadFinished(data) {
      if (data.code === 'SUCCESS') {
        this.setErrorList([]);
        this.$message.success('文件上传成功');
        this.closeModal(true);
      } else {
        this.$message.error('文件导入失败，请重新上传');
        this.setErrorList(data.data.errors);
      }
    },
    // 显示错误信息
    setErrorList(list) {
      this.error_list = list;
    },
    closeModal(uploaded) {
      this.$emit('close', uploaded);
    },
    toggleTutorialVisible(b) {
      this.tutorialVisible = b;
    }
  }
}
</script>

<style>

</style>