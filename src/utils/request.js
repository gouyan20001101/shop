import axios from "axios"
import qs from "qs"
// import { Store } from "vuex";
import {errorAlert} from './alert';
import store from '../store/index';

//设置基础路径
var baseUrl = '/api'

//在请求拦截中设置请求头
axios.interceptors.request.use(config=>{
    console.group('本次请求路径为：'+config.url)
    if(config.url !== baseUrl+'/api/userlogin'){
        config.headers.authorization = store.state.user.token
    }
    console.log(config);
    return config

})

//设置一个拦截响应
axios.interceptors.response.use(res=>{
    console.group('本次响应路径为'+res.config.url)
    if(res.data.code !== 200){
        errorAlert(res.data.msg)
        return;
    }
    console.log(res);
    return res;
})

//添加菜单
export const addMenu = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/menuadd',
        data:qs.stringify(data)
    })
}

//请求菜单列表
export const getMenu = (params)=>{
    return axios ({
        method:"get",
        url:baseUrl+'/api/menulist',
        params,
    })
}

//请求获取一条菜单详情
export const oneMenu = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+'/api/menuinfo',
        params
    })

}

//修改菜单请求
export const updateMenu = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+'/api/menuedit',
        data:qs.stringify(data)
    })

}
//删除一条菜单请求
export const delMenu = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+'/api/menudelete',
        data:qs.stringify(data)
    })

}

//添加角色请求
export const addRole = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+'/api/roleadd',
        data:qs.stringify(data)
    })
}


//获取角色请求
export const getRole = ()=>{
    return axios({
        method:"get",
        url:baseUrl+'/api/rolelist',
        
    })
}

//获取角色详情
export const oneRole = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+'/api/roleinfo',
        params
    })
}

// 发起修改角色请求
export const updateRole = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+'/api/roleedit',
        data:qs.stringify(data)
    })
}

//删除角色
export const delRole = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+'/api/roledelete',
        data:qs.stringify(data)
    })

}

//添加管理员请求
export const addManager = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+'/api/useradd',
        data:qs.stringify(data)
    })
}
//获取管理员列表
export const getManager = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+'/api/userlist',
        params
    })
}

//获取管理员总数
export const managerCount = ()=>{
    return axios({
        method:"get",
        url:baseUrl+'/api/usercount',
        
    })
}

//获取管理员详情
export const oneManager = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+'/api/userinfo',
        params
    })
}

// 发起修改管理员请求
export const updateManager = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+'/api/useredit',
        data:qs.stringify(data)
    })
}
//删除管理员
export const delManager = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+'/api/userdelete',
        data:qs.stringify(data)
    })

}

//登录请求
export const requestLogin = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+'/api/userlogin',
        data:qs.stringify(data)
    })

}

//添加商品分类请求
export const addCate = (data)=>{
    //使用FormDate来处理带有文件的数据
    var form = new FormData()
    for(let i in data){
        form.append(i,data[i])
    }
    return axios({
        method:"post",
        url:baseUrl+'/api/cateadd',
        data:form
    })

}

//商品分类列表请求
export const getCate = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+'/api/catelist',
        params
    })

}

//获取一条商品分类请求
export const oneCate = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+'/api/cateinfo',
        params
    })
}

//修改商品分类请求
export const updateCate = (data)=>{
    var form  = new FormData()
    for(let i in data){
        form.append(i,data[i])
    }
    return axios({
        method:"post",
        url:baseUrl+'/api/cateedit',
        data:form
    })
}
//删除商品分类请求
export const delCate = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+'/api/catedelete',
        data:qs.stringify(data)
    })
}

