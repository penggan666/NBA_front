import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Signin from '@/views/Signin'
import Login from '@/views/Login'
import Compare from '@/views/Compare'
import Team_data from '@/views/Team_data'
import Teamlist from '@/views/Teamlist'
import team_detail from '@/views/team_detail'
import Game_condition from '@/views/Game_condition'
import PlayerData from '@/views/PlayerData'
import News from '@/views/News'
import Schedule from '@/views/Schedule'
import demo from '@/views/demo'
import News_detail from '@/views/News_detail'
import userInfo from '@/views/userInfor'
import feedback from '@/views/feedback'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login,
      hidden:true
    },{
      path: '/signin',
      name: '注册',
      component: Signin,
      hidden:true
    },
    {
      path: '/userinfo',
      name: '个人主页',
      component: userInfo,
      hidden: true
    },
    {
      path: '/',
      name: 'NBA对战系统',
      component: Home,
      iconCls: 'el-icon-setting',
      redirect:'/compare',
      children:[
        {
          path: '/compare',
          name: '对战',
          component: Compare,
        },
        {
          path: '/demo',
          name: '测试',
          component: demo,
          hidden: true
        },
      ]
    },
    {
      path: '/',
      name: 'NBA实时战况',
      component: Home,
      iconCls: 'el-icon-setting',
      children:[
        {
          path: '/teamdata',
          name: '球队数据排名',
          component: Team_data,
        },
        {
          path: '/Game_conditon',
          name: 'NBA实时战绩',
          component: Game_condition,

        },
        {
          path: '/PlayerData',
          name: 'NBA球员最新数据排名',
          component: PlayerData,

        },
        {
          path: '/News',
          name: '虎扑24小时最热新闻',
          component: News,

        },
        {
          path: '/News_detail',
          name: '新闻详情',
          component: News_detail,
          hidden:true

        },
        {
          path: '/Schedule',
          name: '未来7天比赛日程',
          component: Schedule,

        },
      ]
    },
    {
      path: '/',
      name: 'NBA球队基本资料',
      component: Home,
      iconCls: 'el-icon-setting',
      redirect:'/login',
      children:[
        
        {
          path: '/teamlist',
          name: '球队情况',
          component: Teamlist,
        },
        {
          path: '/team_detail',
          name: '球队详细信息',
          component: team_detail,
          hidden:true
        }, 
        {
          path: '/feedback',
          name: '反馈界面',
          component: feedback,
          hidden:true
        }
        
      ]
    }
    
  ]
})
