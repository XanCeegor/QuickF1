<template>
  <q-layout view="lHr lpR lFr">
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

    <q-drawer v-model="leftDrawerOpen" show-if-above content-class="bg-grey-2">
      <img src="~assets/logos/app-splashscreen.png" width="100%" height="25%" />
      <div class="absolute-bottom bg-transparent"></div>
      <q-scroll-area
        style="height: calc(100% - 150px); border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item
            clickable
            v-ripple
            tag="a"
            to="/recentrace"
            @click.native="startProgress"
          >
            <q-item-section avatar>
              <img src="~assets/logos/recent-race.png" width="24" height="24" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Latest Race Results</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            tag="a"
            to="/drivers"
            @click.native="startProgress"
          >
            <q-item-section avatar>
              <img
                src="~assets/logos/driver-standings.png"
                width="24"
                height="24"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>Driver Standings</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            tag="a"
            to="/constructors"
            @click.native="startProgress"
          >
            <q-item-section avatar>
              <img
                src="~assets/logos/constructor-standings.png"
                width="24"
                height="24"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>Constructor Standings</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            tag="a"
            to="/schedule"
            @click.native="startProgress"
          >
            <q-item-section avatar>
              <img
                src="~assets/logos/race-schedule.png"
                width="24"
                height="24"
              />
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
        :duration="1000"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",

  data() {
    return {
      leftDrawerOpen: false
    };
  },
  methods: {
    startProgress() {
      $q.loadingBar.start();
    }
  }
};
</script>
