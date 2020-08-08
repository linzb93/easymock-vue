<template>
  <div>
    <el-tag v-for="(col, index) in cols" :key="col" @click="removeCollaborator(index)">{{col}}</el-tag>
    <el-row>
      <el-col :span="19">
        <el-input v-model="inputVal" />
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="CollaboratorManage">添加</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import clone from 'lodash/clone';
import {checkExists} from '@/services/user';


export default {
  name: 'CollaboratorManage',
  props: ['value'],
  data() {
    return {
      inputVal: ''
    }
  },
  computed: {
    cols() {
      return this.value !== '' ? this.value.split(',') : [];
    }
  },
  methods: {
    checkCollaborator() {
      checkExists({
        name: this.inputVal,
        excludeCurUser: true
      })
      .then(res => {
        if (res.data) {
          this.$emit('input', this.cols.concat(this.inputVal).join(','));
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    // 移除协作者
    removeCollaborator(index) {
      const arr = clone(this.cols);
      arr.splice(index, 1);
      this.$emit('input', arr.join(','));
    }
  }
}
</script>

<style>

</style>