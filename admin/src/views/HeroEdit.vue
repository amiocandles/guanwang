<template>
  <div>
    <h3>{{ id ? '编辑' : '新建' }}英雄</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="basic" type="border-card" >
        <el-tab-pane label="基本信息" name="basic" >
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
                    <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <!--
              action 上传接口地址 defaults默认参数
            -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model,'avatar',res.url)"
            >
              <!--src放图片地址 v-if基于model.icon展示，有这个图片地址就展示图片，没有就展示+号图标-->
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="Banner">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model,'banner',res.url)"
            >
              <!--src放图片地址 v-if基于model.icon展示，有这个图片地址就展示图片，没有就展示+号图标-->
              <img v-if="model.banner" :src="model.banner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple >
              <el-option v-for="item of categories"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="margin-top: 0.6rem" :max="10" show-score v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top: 0.6rem" :max="10" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top: 0.6rem" :max="10" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top: 0.6rem" :max="10" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple >
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple >
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips" ></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips" ></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips" ></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <!--在skills中添加元素 @click-->
          <el-button size="small" @click="model.skills.push({})" ><i class="el-icon-plus"></i>添加技能</el-button>
          <!--style换行-->
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i" >
              <el-form-item label="名称">
                <el-input v-model="item.name" ></el-input>
              </el-form-item>
              <el-form-item label="图标">
                  <el-upload class="avatar-uploader"
                             :action="uploadUrl"
                             :headers="getAuthHeaders()"
                             :show-file-list="false"
                             :on-success="res => $set(item,'icon',res.url)"
                  >
                    <!--src放图片地址 v-if基于model.icon展示，有这个图片地址就展示图片，没有就展示+号图标-->
                    <img v-if="item.icon" :src="item.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay" ></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost" ></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(i,1)" >删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="最佳搭档" name="partners">
          <!--在skills中添加元素 @click-->
          <el-button size="small" @click="model.partners.push({})" ><i class="el-icon-plus"></i>添加英雄</el-button>
          <!--style换行-->
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item,i) in model.partners" :key="i" >
              <el-form-item label="英雄">
                <el-select filterable v-model="item.hero" >
                <el-option
                  v-for="hero in heroes"
                  :key="hero._id"
                  :value="hero._id"
                  :label="hero.name"
                ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.partners.splice(i,1)" >删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

      </el-tabs>
      <el-form-item style="margin-top: 1rem" >
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
        categories:[],
        items:[],
        model: {
          name:'',
          avatar:'',
          skills:[],
          heroes:[],
          partners:[],
          scores:{
            difficult: 0
          }
        }
      }
    },
    methods: {
      async save() {//请求接口提交数据
        let res
        if (this.id) {
          res = await this.$http.put(`rest/heroes/${this.id}`, this.model)
        }else {
          //post发起请求提交到categories接口，参数是this.model
          res = await this.$http.post('rest/heroes', this.model)
        }
        //创建完之后跳转到分类列表
        this.$router.push('/heroes/list')
        this.$message({
          type:'success',
          message:'保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`rest/heroes/${this.id}`)
        this.model = Object.assign({},this.model,res.data)
      },
      async fetchCategories(){
        const res = await this.$http.get(`rest/categories`)
        this.categories = res.data
      },
      async fetchItems(){
        const res = await this.$http.get(`rest/items`)
        this.items = res.data
      },
      async fetchHeroes(){
        const res = await this.$http.get(`rest/heroes`)
        this.heroes = res.data
      },
    },
    created(){//在刚进入的时候如果是编辑要获取分类的详情
      this.fetchCategories();
      this.fetchItems();
      this.fetchHeroes();
      //执行方法获取数据(有this.id才执行后面的方法)
      this.id && this.fetch();

    }
  }
</script>
<style scoped>

</style>
