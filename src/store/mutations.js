export const state = {
    user:sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,//用来存储登录之后的用户信息
}
export const mutations = {
    changeUser(state,user){
        state.user = user;
        if(user){
            sessionStorage.setItem('user',JSON.stringify(user))
        }else{
            sessionStorage.removeItem('user')
        }
        
    }
}
export const getters = {
    user(state){
        return state.user
    }
}