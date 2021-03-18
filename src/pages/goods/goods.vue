<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info"></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add";
export default {
     data() {
    return {
      info: {
        show : false,
        title : "",
        isAdd : true,
      }
    };
  },
  methods: {
    add() {
      this.info.show = true;
      this.info.title = "商品管理添加";
      this.info.isAdd = true;
    }
  },
  components: {
    vAdd
  },

};
</script>

<style scoped>
.el-button {
  margin-top: 20px;
}
</style>
