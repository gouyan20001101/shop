import {getSpec,specCount} from '../../utils/request';
const state = {
    specList : [],
    size:8,
    page:1,
    count:0
}

const mutations = {
    changeSpecList(state,arr){
        state.specList = arr
    },
    changeCount(state,num){
        state.count = num
    },
    changePage(state,page){
        state.page = page
    }
}

const actions = {
    specListAtions(context){
        var params = {
            size:context.state.size,
            page:context.state.page,
        }
        getSpec(params).then(res=>{
            if((res.data.list == null || res.data.list.length == 0)&& context.state.page){
                var p = context.state.page -1;
                context.commit('changeSpec',p);
                context.dispatch('specListActions');
                return;
            }
            context.commit("changeSpecList",res.data.list)
        })
    },
    countActions(context){
        specCount().then(res=>{
            context.commit('changeCount',res.data.list[0].total)
        })
    },
    pageActions(context,page){
        context.commit('changePage',page)
    }
}

const getters = {
    specList(state){
        return state.specList
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