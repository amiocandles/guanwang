<template>
  <div class="about">
    <h3>文章列表</h3>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small"
              @click="$router.push(`/articles/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        items: []
      }
    },
    methods: {
      async fetch() {
        const res = await this.$http.get('rest/articles');
        this.items = res.data
      },
      async remove(row){
        this.$confirm(`是否确定要删除文章 "${row.title}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          //确认要删除，请求接口
          const res = await this.$http.delete(`rest/articles/${row._id}`);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    created() {
      this.fetch()
    }
  }
</script>
<style scoped>

</style>
