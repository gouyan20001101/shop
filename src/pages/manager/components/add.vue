<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model.number="form.roleid">
            <el-option label="--请选择--" disabled value=""></el-option>
            <!-- 遍历菜单列表 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item label="菜单状态" :label-width="formLabelWidth">
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
import { successAlert } from "../../../utils/alert";
import { addManager,oneManager,updateManager} from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1 //1正常，2禁用
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/roleList"
    })
  },
  methods: {
    ...mapActions({
      "requestRoleList": "role/roleListActions",
      "requestCount": "manager/countActions",
      "requestManagerList": "manager/managerListActions",
    }),
    cancel() {
      this.info.show = false;
      this.form = {
         roleid: "",
        username: "",
        password: "",
        status: 1 //1正常，2禁用
      };
    },
    confirm() {
      // console.log(this.form);
      addManager(this.form).then(res => {
        successAlert(res.data.msg);
        this.cancel();
        this.requestCount()
        this.requestManagerList()
      });
    },
     getDetail(uid) {
      oneManager({ uid }).then(res => {
        this.form = res.data.list;
        this.form.password = '';
      });
    },
    update(){
        updateManager(this.form).then(res=>{
            successAlert(res.data.msg)
            this.cancel();
            this.requestManagerList()
        })

    }
  },
  mounted() {
    this.requestRoleList();
  }
};
</script>

<style></style>
