import {getRole} from '../../utils/request';
const state = {
    roleList:[],//声明角色列表
}

const mutations = {
    changeRoleList(state,arr){
        state.roleList = arr;
    }
}

const actions = {
    roleListActions(context){
        getRole().then(res=>{
            context.commit('changeRoleList',res.data.list)
        })

    }
}

const getters = {
    roleList(state){
        return state.roleList
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}
