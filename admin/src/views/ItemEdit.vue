<template>
  <div>
    <h3>{{ id ? '编辑' : '新建' }}物品</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!--
          action 上传接口地址 defaults默认参数
        -->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <!--src放图片地址 v-if基于model.icon展示，有这个图片地址就展示图片，没有就展示+号图标-->
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        model: {}
      }
    },
    methods: {
      afterUpload(res){
        //显示赋值this.$set
         this.$set(this.model,'icon',res.url)
      },
      async save() {//请求接口提交数据
        let res
        if (this.id) {
          res = await this.$http.put(`rest/items/${this.id}`, this.model)
        }else {
          //post发起请求提交到categories接口，参数是this.model
          res = await this.$http.post('rest/items', this.model)
        }
        //创建完之后跳转到分类列表
        this.$router.push('/items/list')
        this.$message({
          type:'success',
          message:'保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/items/${this.id}`)
        this.model = res.data
      },
    },
    created(){//在刚进入的时候如果是编辑要获取分类的详情
      //执行方法获取数据(有this.id才执行后面的方法)
      this.id && this.fetch()
    }
  }
</script>
<style scoped>

</style>
