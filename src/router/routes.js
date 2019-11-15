import MainLayout from 'layouts/MainLayout.vue';
import RecentRace from 'pages/RecentRace'
import DriverStandings from 'pages/DriverStandings'
import ConstructorsStandings from 'pages/ConstructorStandings'
import Schedule from 'pages/Schedule'

const routes = [
  {
    path: '/drivers',
    name: 'drivers',
    component: DriverStandings,
    meta: { title: 'Driver Standings' }
  },
  {
    path: '/constructors',
    name: 'constructors',
    component: ConstructorsStandings,
    meta: { title: 'Constructor Standings' }
  },
  {
    path: '/recentrace',
    name: 'recentrace',
    component: RecentRace,
    meta: { title: 'Latest Race Result' }
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: Schedule,
    meta: { title: 'Race Schedule' }
  },
  // {
  //   path: '/drivers',
  //   name: 'mainlayout',
  //   component: MainLayout
  // },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
