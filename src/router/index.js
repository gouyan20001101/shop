import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)

const login = () =>
    import ('../pages/login/login')
const index = () =>
    import ('../pages/index/index')
const menu = () =>
    import ('../pages/menu/menu')
const home = () =>
    import ('../pages/home/home')
const role = () =>
    import ('../pages/role/role')
const manager = () =>
    import ('../pages/manager/manager')
const cate = () =>
    import ('../pages/cate/cate')
const spec = () =>
    import ('../pages/spec/spec')
const goods = () =>
    import ('../pages/goods/goods')
const member = () =>
    import ('../pages/member/member')
const banner = () =>
    import ('../pages/banner/banner')
const seckill = () =>
    import ('../pages/seckill/seckill')





export default new Router({
    routes: [{
            path: '/login',
            alias: 'l',
            component: login,
        },
        {
            path: "/",
            component: index,
            children: [{
                    path: "home",
                    name: "首页",
                    component: home
                },
                {
                    path: "menu",
                    name: "菜单",
                    component: menu
                },
                {
                    path: "role",
                    name: "角色",
                    component: role
                },
                {
                    path: "manager",
                    name: "管理员",
                    component: manager
                },
                {
                    path: "cate",
                    name: "商品分类",
                    component: cate
                },
                {
                    path: "cate",
                    name: "商品分类",
                    component: cate
                },
                {
                    path: "spec",
                    name: "商品规格",
                    component: spec
                },
                {
                    path: "goods",
                    name: "商品管理",
                    component: goods
                },
                {
                    path: "member",
                    name: "会员管理",
                    component: member
                },
                {
                    path: "banner",
                    name: "轮播图管理",
                    component: banner
                },
                {
                    path: "seckill",
                    name: "秒杀管理",
                    component: seckill
                },
                {
                    path: "",
                    redirect: "home"

                }
            ]
        },
        {
            path: '*',
            redirect: '/login'
        }

    ]
})