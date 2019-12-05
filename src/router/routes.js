// import MainLayout from 'layouts/MainLayout.vue';
import RecentRace from 'pages/RecentRace'
import DriverStandings from 'pages/DriverStandings'
import ConstructorsStandings from 'pages/ConstructorStandings'
import Schedule from 'pages/Schedule'
import Index from 'pages/Index'

const routes = [
  
  {
    path: '/',
    name: 'mainlayout',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: Index,
        meta: { title: 'QuickF1' }
      },
      {
        path: 'drivers',
        name: 'drivers',
        component: DriverStandings,
        meta: { title: 'Driver Standings' }
      },
      {
        path: 'constructors',
        name: 'constructors',
        component: ConstructorsStandings,
        meta: { title: 'Constructor Standings' }
      },
      {
        path: 'recentrace',
        name: 'recentrace',
        component: RecentRace,
        meta: { title: 'Latest Race Result' }
      },
      {
        path: 'schedule',
        name: 'schedule',
        component: Schedule,
        meta: { title: 'Race Schedule' }
      },
    ]
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
