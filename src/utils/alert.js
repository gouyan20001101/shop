import Vue from 'vue';
const vm = new Vue()


//成功时的消息提示
export const successAlert = (msg) =>{
    vm.$message({
        message: msg,
        type: 'success'
      });
}

//警告时的消息提示
export const warningAlert = (msg) =>{
    vm.$message({
        message: msg,
        type: 'warning'
      });
}

export const errorAlert = (msg) =>{
    vm.$message.error(msg);
}



