<template>
  <div>
     <el-button type="primary" @click="add">添加</el-button>
     <v-add :info="info" ref="add"></v-add>
     <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vList from './components/list';
import vAdd from './components/add';
export default {
  data(){
    return {
      info:{
        show:false,
        title:"",
        isAdd:true,
      }
    }

  },
  methods:{
    add(){
      this.info.show = true;
      this.info.title = "添加商品规格";
      this.info.isAdd = true
    },
    edit(id){
            this.info.show = true;
            this.info.title = '编辑属性';
            this.$refs.add.getDetail(id)
            this.info.isAdd = false
        }

  },
  components:{
    vAdd,
    vList
  }

}
</script>

<style>
.el-button{
  margin-top: 20px;
}

</style>