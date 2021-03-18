<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="opened">
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" @change="changeCate">
            <el-option label="--请选择--" disabled value=""></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid">
            <el-option label="--请选择--" disabled value=""></el-option>
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            v-model="form.img"
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
            style=" border: 1px dashed #d9d9d9;"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid" @change="changeSpec">
            <el-option label="--请选择--" disabled value=""></el-option>
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="--请选择--" disabled value=""></el-option>
            <el-option
              v-for="(item, index) in secondSpec"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.isnew" :label="1">是</el-radio>
            <el-radio v-model="form.isnew" :label="2">否</el-radio>
          </template>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.ishot" :label="1">是</el-radio>
            <el-radio v-model="form.ishot" :label="2">否</el-radio>
          </template>
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

        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="div1"></div>
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
import E from 'wangeditor'
import {mapActions,mapGetters} from 'vuex';
export default {
  props: ["info"],
  data() {
    return {
      imageUrl: "",
      formLabelWidth: "120px",
      secondCate:[],
      secondSpec:[],
      editor:'',
      form: {
        first_cateid : "",
        second_cateid : "",
        goodsname :"",
        price : "",
        market_price : "",
        img : "",
        description : "",
        specsid : "",
        specsattr : [],
        isnew : 1,
        ishot : 1,
        status : 1
      }
    };
  },
  computed:{
      ...mapGetters({
          "cateList":"cate/cateList",
          "specList":"spec/specList"
      })
  },
  methods:{
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
    },

    ...mapActions({
        "cateRequestList":"cate/cateListActions",
        "specRequestList":"spec/specListAtions"
    }),
    changeCate(){
        this.form.second_cateid = '';
        var index = this.cateList.findIndex(item=>item.id==this.form.first_cateid)
        this.secondCate = this.cateList[index].children
    },
    changeSpec(){
        this.form.specsattr = [];
        var index = this.specList.findIndex(item=>item.id==this.form.specsid)
        this.secondSpec = this.specList[index].attrs
    },
    opened(){
        this.editor = new E('#div1')
        this.editor.create()
        this.editor.txt.html(this.form.description)
    },
    cancel(){

    },
    confirm(){

    }
  },

  mounted(){
      //发起一级分类请求
      this.cateRequestList()
      //发起规格属性请求
      this.specRequestList()
  }

};
</script>

<style scoped>
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
