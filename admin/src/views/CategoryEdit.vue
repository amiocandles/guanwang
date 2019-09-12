<template>
  <div>
    <h3>{{ id ? '编辑' : '新建' }}分类</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id"
          :label="item.name" :value="item._id" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
        model: {},
        parents:[]
      }
    },
    methods: {
      async save() {//请求接口提交数据
        let res
        if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model)
        }else {
          //post发起请求提交到categories接口，参数是this.model
          res = await this.$http.post('rest/categories', this.model)
        }
        //创建完之后跳转到分类列表
        this.$router.push('/categories/list')
        this.$message({
          type:'success',
          message:'保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/categories/${this.id}`)
        this.model = res.data
      },
      //刚进入时获取数组
      async fetchParents(){
        const res = await this.$http.get(`rest/categories`)
        this.parents = res.data
      }
    },
    created(){//在刚进入的时候如果是编辑要获取分类的详情
      //执行方法获取数据(有this.id才执行后面的方法)
      this.id && this.fetch()
      this.fetchParents()
    }
  }
</script>
<style scoped>

</style>
