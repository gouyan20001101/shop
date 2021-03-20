<template>
  <div>
    <el-table
      :data="goodsData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <el-table-column prop="img" label="图片">
        <template v-slot="prop">
          <img :src="$preImg + prop.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.isnew == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.ishot == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="状态">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status == 1">启用</el-button>
          <el-button type="danger" v-else>禁止</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    v-if="value"
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="size"
      @current-change="cPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import {successAlert} from '../../../utils/alert';
import {delGoods} from '../../../utils/request';
import { mapActions, mapGetters } from "vuex";
export default {
  data(){
    return {
      value:null
    }
    
  },
  computed: {
    ...mapGetters({
      goodsData: "goods/goodsList",
      count: "goods/count",
      size: "goods/size"
    })
  },
  methods: {
    ...mapActions({
      requestGoodsList: "goods/goodsListActions",
      requestCount: "goods/countActions",
      requestPage: "goods/pageActions"
    }),
    cPage(page) {
      this.requestPage(page);
      this.requestGoodsList(this.value);
    },
    edit(id){
      this.$emit('edit',id)
    },
     del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delGoods({ id }).then(res => {
            //已经删除成功
            successAlert(res.data.msg);
            this.requestCount();
            this.requestSpecList(this.value);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },

  mounted() {
    this.requestGoodsList(this.value);
    this.requestCount();
  }
};
</script>

<style>
img {
  width: 100px;
}
</style>
