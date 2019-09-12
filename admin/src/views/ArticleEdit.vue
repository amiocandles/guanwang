<template>
  <div>
    <h3>{{ id ? '编辑' : '新建' }}文章</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple >
          <el-option v-for="item in categories" :key="item._id"
          :label="item.name" :value="item._id" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { VueEditor } from "vue2-editor";
  export default {
    props: {
      id: {}
    },
    components: {
      VueEditor
    },
    data() {
      return {
        model: {},
        categories:[]
      }
    },
    methods: {
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        //定义一个表单数据
        const formData = new FormData();
        formData.append("file", file);
        //发起请求
        const res = await this.$http.post('upload',formData)
        //(光标位置，插入图片，图片地址)
        Editor.insertEmbed(cursorLocation,"image",res.data.url);
        resetUploader();
      },
      async save() {//请求接口提交数据
        let res
        if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model)
        }else {
          //post发起请求提交到categories接口，参数是this.model
          res = await this.$http.post('rest/articles', this.model)
        }
        //创建完之后跳转到分类列表
        this.$router.push('/articles/list')
        this.$message({
          type:'success',
          message:'保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/articles/${this.id}`)
        this.model = res.data
      },
      //刚进入时获取数组
      async fetchCategories(){
        const res = await this.$http.get(`rest/categories`)
        this.categories = res.data
      }
    },
    created(){//在刚进入的时候如果是编辑要获取分类的详情
      this.fetchCategories()
      //执行方法获取数据(有this.id才执行后面的方法)
      this.id && this.fetch()
    }
  }
</script>
<style scoped>

</style>
