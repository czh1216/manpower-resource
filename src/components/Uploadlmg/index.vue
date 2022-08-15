<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      action="#"
      :limit="1"
      :before-upload="beforeUpload"
      list-type="picture-card"
      :http-request="onRequst"
      class="custom-upload"
      :class="fileList.length ? 'hide' : ''"
    >
      <i class="el-icon-plus"></i>
    </el-upload>

    <el-dialog :visible.sync="previewImgDialog">
      <img :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// id : AKIDPcZGgqlW4MN8pFG4cta4HDzZFengIdhW
// key : dz4sQhhRu86nEPJwJSM0NTJsABwShfMn

import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDPcZGgqlW4MN8pFG4cta4HDzZFengIdhW',
  SecretKey: 'dz4sQhhRu86nEPJwJSM0NTJsABwShfMn',
})
// console.log(cos)

export default {
  name: 'Uploadlmg',
  data() {
    return {
      fileList: [],
      // { name: 'test', url: 'https://destiny001.gitee.io/image/cxk.gif' },
      previewImgDialog: false,
      imgUrl: '',
      loading: false,
    }
  },

  created() {},

  methods: {
    onRequst({ file }) {
      // console.log('图片上传')
      this.loading = true
      cos.putObject(
        {
          Bucket: 'hmhr-31-1313341604' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          this.loading = false
          // console.log(err || data)
          if (err || data.statusCode !== 200) {
            return this.$message.error('上传失败,请重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location,
          })
        },
      )
    },

    onChange(file, fileList) {
      this.fileList = fileList
    },

    onRemove(file, fileList) {
      this.fileList = fileList
    },

    onPreview(file) {
      console.log(file)
      this.previewImgDialog = true
      this.imgUrl = file.url
    },

    // 限制图片
    beforeUpload(file) {
      // 限制图片类型
      const types = ['image/gif', 'image/jpeg']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join(',') + '图片')
        return false
      }
      // 限制图片大小
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('选择的图片不能大于2mb')
        return false
      }
      // console.log('上传前的检查', file);
    },
  },
}
</script>

<style scoped lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
