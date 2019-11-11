<template>
  <q-layout style="background-color:#f0f0f0;" view="lHr lpR lFr">
    <q-header elevated>
      <q-toolbar class="bg-red-10 text-white">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          {{ $route.meta.title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer dark
      color="black"
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-grey-2"
    >
      <q-img class="absolute-top" src="https://purepng.com/public/uploads/large/purepng.com-formula-1-logoformula-1logonew2018-21529676510t61kq.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
        </div>
      </q-img>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple tag="a" to="/recentrace" @click.prevent="startProgress">
            <q-item-section avatar>
              <img src="https://img.icons8.com/ios/96/000000/stopwatch.png" width="24" height="24">
            </q-item-section>
            <q-item-section>
              <q-item-label>Latest Race Results</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple tag="a" to="/drivers" @click.prevent="startProgress">
            <q-item-section avatar>
              <img src="https://img.icons8.com/ios/96/000000/motorbike-helmet.png" width="24" height="24">
            </q-item-section>
            <q-item-section>
              <q-item-label>Driver Standings</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple tag="a" to="/constructors" @click.prevent="startProgress">
            <q-item-section avatar>
              <img src="https://img.icons8.com/ios/96/000000/f1-race-car-side-view.png" width="24" height="24">
            </q-item-section>
            <q-item-section>
              <q-item-label>Constructor Standings</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple tag="a" to="/schedule" @click.prevent="startProgress">
            <q-item-section avatar>
              <img src="https://img.icons8.com/ios/96/000000/calendar.png" width="24" height="24">
            </q-item-section>
            <q-item-section>
              <q-item-label>Race Schedule</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        appear
        :duration="2000"
      >
        <router-view/>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    startProgress(){
      $q.loadingBar.start();
    }
  }
}
</script>
