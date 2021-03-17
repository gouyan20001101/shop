
import {getManager,managerCount} from '../../utils/request';
const state = {
    managerList:[],//初始化数据
    size:2,
    page:1,
    count:0

}
const mutations = {
    changeManagerList(state,arr){
        state.managerList = arr
    },
    changeCount(state,num){
        state.count = num
    },
    changePage(state,page){
        state.page = page
    }
}

const actions = {
    managerListActions(context){
        //发起列表请求
        var params = {
            size:context.state.size,
            page:context.state.page
        }
        getManager(params).then(res=>{
            if((res.data.list == null || res.data.list.length == 0)&& context.state.page){
                var p = context.state.page -1;
                context.commit('changePage',p);
                context.dispatch('managerListActions');
                return;
            }
           context.commit('changeManagerList',res.data.list)

        })
    },
    countActions(context){
        managerCount().then(res=>{
            context.commit('changeCount',res.data.list[0].total)

        })
    },
    pageActions(context,page){
        context.commit('changePage',page)
    }
}

const getters = {
    managerList(state){
        return state.managerList
    },
    count(state){
        return state.count
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}