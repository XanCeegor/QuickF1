import MainLayout from 'layouts/MainLayout.vue';
import RecentRace from 'pages/RecentRace'
import DriverStandings from 'pages/DriverStandings'

const routes = [
  {
    path: '/drivers',
    name: 'drivers',
    component: DriverStandings
  },
  {
    path: '/recentrace',
    name: 'recentrace',
    component: RecentRace
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
