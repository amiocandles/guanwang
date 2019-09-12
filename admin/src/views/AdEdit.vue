<template>
  <div>
    <h3>{{ id ? '编辑' : '新建' }}广告位</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
        <!--style换行-->
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="12" v-for="(item,i) in model.items" :key="i">
            <el-form-item label="跳转链接(URL)">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top: 0.5rem" >
              <el-upload class="avatar-uploader"
                         :action="$http.defaults.baseURL+'/upload'"
                         :show-file-list="false"
                         :on-success="res => $set(item,'image',res.url)"
              >
                <!--src放图片地址 v-if基于model.icon展示，有这个图片地址就展示图片，没有就展示+号图标-->
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="danger" @click="model.items.splice(i,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
        model: {
          items: []
        }
      }
    },
    methods: {
      async save() {//请求接口提交数据
        let res
        if (this.id) {
          res = await this.$http.put(`rest/ads/${this.id}`, this.model)
        } else {
          //post发起请求提交到categories接口，参数是this.model
          res = await this.$http.post('rest/ads', this.model)
        }
        //创建完之后跳转到分类列表
        this.$router.push('/ads/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`rest/ads/${this.id}`)
        this.model = Object.assign({}, this.model, res.data)
      },
    },
    created() {//在刚进入的时候如果是编辑要获取分类的详情
      //执行方法获取数据(有this.id才执行后面的方法)
      this.id && this.fetch()
    }
  }
</script>
<style scoped>

</style>
