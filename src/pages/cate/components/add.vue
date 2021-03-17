<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select v-model.number="form.pid">
            <el-option label="--请选择--" disabled value=""></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 遍历 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload v-model="form.img" class="avatar-uploader" action="#" :show-file-list="false" :on-change="changeImg">
            <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="blue"
            inactive-color="grey"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert, warningAlert } from "../../../utils/alert";
import { addCate,oneCate, updateCate} from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      imageUrl: "",
      formLabelWidth:"120px",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1 //1正常，2禁用
      }
      
    };
    
  },
  computed: {
    ...mapGetters({
      "cateList": "cate/cateList"
    })
  },
  methods: {
       ...mapActions({
      "requestCateList": "cate/cateListActions"
    }),
    cancel() {
      this.info.show = false;
        this.form = {
          pid: 0,
          catename: "",
          img: "",
          status: 1 //1正常，2禁用
        };
    },
   
    confirm(){
        // console.log(this.form);
        addCate(this.form).then(res=>{
            successAlert(res.data.msg)
            this.cancel()
        })
    },
    getDetail(id) {
      oneCate({ id }).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$preImg + this.form.img;
      });
    },
    update(){
      updateCate(this.form).then(res=>{
        successAlert(res.data.msg)
        this.cancel()
        this.requestCateList()
      })

    },
    
    //改变图片时获取图片信息
    changeImg(e){
      //处理文件大小
      if(e.size > 2*1024*1024){
        warningAlert('文件大小不能超过2M')
        return
      }

      //处理文件后缀
      var ext = ['.jpg','png','jpeg','gif'];
      var extName = e.name.slice(e.name.lastIndexOf('.'));
      if(!ext.some(item=>item==extName)){
        warningAlert('上传文件不正确')
        return
      }

      //上传正确的文件
      this.imageUrl = URL.createObjectURL(e.raw)
      this.form.img = e.raw
    }
  },
   
 
 
    mounted() {
    //组件挂载完成，获取菜单列表数据
    this.requestCateList();
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
