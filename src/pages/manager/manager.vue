<template>
  <div>
      <el-button type="primary" @click="add">添加</el-button>

      <v-add :info="info" ref="add"></v-add>
      <v-list @edit="edit"></v-list>
  </div>
  
</template>

<script>
import vAdd from './components/add';
import vList from './components/list';
export default {
    data(){
        return{
            info:{
                show:false,
                title:"",
                isAdd:true
            }
        }
    },
    components:{
        vAdd,
        vList
    },
    methods:{
        add(){
            this.info.show = true;
            this.info.title = '管理员添加';
            this.info.isAdd = true
            

        },
         edit(uid){
            this.info.show = true;
            this.info.title = '编辑菜单';
            this.$refs.add.getDetail(uid)
            this.info.isAdd = false
        }
    }

}
</script>

<style scoped>
.el-button{
    margin-top: 20px;
}

</style>