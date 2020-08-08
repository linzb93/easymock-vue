<template>
  <el-dialog
    :title="`${preTitle}项目`"
    :visible="true"
    @close="closeModal"
  >
    <el-form
      :model="createForm"
      :rules="rules"
      ref="createForm"
      label-width="80px"
    >
      <el-form-item label="标题" prop="name">
        <el-input v-model="createForm.name" />
      </el-form-item>
      <el-form-item label="前缀" prop="prefix">
        <el-input v-model="createForm.prefix" />
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="createForm.description" />
      </el-form-item>
      <el-form-item label="协作者" prop="collaborators" v-if="id">
        <CollaboratorManage v-model="createForm.collaborators" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="closeModal">取消</el-button>
      <el-button type="primary" @click="submit">{{preTitle}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  getProjectDetail,
  createProject,
  updateProject
} from '@/services/project';
import CollaboratorManage from './CollaboratorManage.vue';

export default {
  name: 'Create',
  components: {
    CollaboratorManage
  },
  props: ['id'],
  data() {
    return {
      createForm: {
        name: '',
        prefix: '',
        description: '',
        collaborators: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入名称'
        }],
        prefix: [{
          required: true,
          message: '请输入接口前缀'
        }]
      }
    }
  },
  computed: {
    preTitle() {
      return this.id ? '编辑' : '添加';
    }
  },
  mounted() {
    if (this.id) {
      getProjectDetail({
        id: this.id
      })
      .then(res => {
        this.createForm = res.data.data;
      });
    }
  },
  methods: {
    // 提交
    submit() {
      this.$refs['createForm'].validate(valid => {
        if (!valid) {
          return;
        }
        if (this.id) {
          updateProject({
            id: this.id,
            ...this.createForm
          })
          .then(() => {
            this.$message.success('修改成功');
            this.$emit('close');
          });
        } else {
          createProject(this.createForm)
          .then(() => {
            this.$message.success('添加成功');
            this.$emit('close');
          });
        }
      })
    },
    // 关闭弹窗
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>