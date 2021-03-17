<template>
  <div class="box">
    <div class="con">
      <h3>欢迎登陆</h3>
      <el-form ref="form" :model="form" label-width="80px">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
        <el-input
          v-model="user.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form>
      <div class="btn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
import { requestLogin } from "../../utils/request";
import { successAlert, warningAlert } from "../../utils/alert";
export default {
  data() {
    return {
      form: {},
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions({
      "requestUser":"userActions"

    }),
    login() {
      //方法二：
      if (this.user.username !== "" || this.user.password !== "") {
        requestLogin(this.user).then(res => {
          successAlert(res.data.msg);

          this.requestUser(res.data.list)

          this.$router.push("/");
        });
      } else {
        warningAlert("亲输入用户名或密码");
      }
      // console.log(this.user);
      // this.$router.push('/')

      //方法一：本地存储
      //   if (this.user.username !== "" || this.user.password !== "") {
      //     requestLogin(this.user).then(res => {
      //       successAlert(res.data.msg);
      //       if (localStorage.getItem("user") !== null) {
      //         localStorage.removeItem("user");
      //       }
      //       localStorage.setItem("user", JSON.stringify(res.data.list));
      //       this.$router.push("/");
      //     });
      //   } else {
      //     warningAlert("亲输入用户名或密码");
      //   }
    }
  }
};
</script>

<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(skyblue, black);
  position: fixed;
  left: 0;
  top: 0;
}
.con {
  width: 500px;
  height: 300px;
  background: #fff;
  color: black;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
h3 {
  margin: 10px;
  text-align: center;
}
.el-input,
.el-button {
  width: 90%;
  margin: 20px;
}
</style>
