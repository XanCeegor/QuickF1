<template>
<q-page v-show="!isLoading">

  <div class="row">
    <div class="col-12 text-center">
      <div class="col-6">
        <!-- <q-img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png"> -->
        <q-img src="https://flagpedia.net/data/flags/w580/ae.png">
          <div class="absolute-full text-subtitle2 flex flex-center">
            <h4 style="margin:0">{{this.raceName}}
              <h5 style="margin:0">{{this.raceDate}}</h5>
            </h4>
          </div>
        </q-img>
      </div>
    </div>
  </div>
  <br>
  <div class="header-container">
    <div class="header-position text-black">
      Pos
    </div>
    <div class="header">
      <div class="gt-sm">Nationality</div>
    </div>
    <div class="header">
      Driver
    </div>
    <div class="header">
      Grid
    </div>
    <div class="header">
      Race Pts
    </div>
    <div class="header">
      Time
    </div>
  </div>
  <hr>
  <div v-for="driver in drivers" :key="driver.position" class="flex-container">
    <div class="position" :style="positionStyle(driver.position)">
        <q-item-label>{{driver.position}}</q-item-label>
    </div>
    <div class="item">
      <q-avatar>
        <img :src="getFlag(driver.nationality)" width="48" height="48">
      </q-avatar>
    </div>
    <div class="item">
      <q-item-section>
        <q-item-label class="lt-sm text-center">{{driver.code}}</q-item-label>
        <q-item-label class="gt-xs text-center">{{driver.name}}</q-item-label>
        <q-item-label caption class="gt-xs text-white text-weight-light text-center">{{driver.team}}</q-item-label>
      </q-item-section>
    </div>
    <div class="item">
      {{driver.grid}}
    </div>
    <div class="item">
      <q-item-label >{{driver.points}}</q-item-label>
    </div>
    <div class="item">
      <q-item-label v-if="driver.time !== null">{{driver.time}}</q-item-label>
      <q-item-label v-else>{{driver.status}}</q-item-label>
    </div>
  </div>
</q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'recentrace',
  data () {
    return {
      isLoading: true,
      flags: {
        Finnish: "fi",
        German: "de",
        British: "gb",
        Thai: "th",
        Spanish: "es",
        Australian: "au",
        Monegasque: "mc",
        French: "fr",
        Mexican: "mx",
        Canadian: "ca",
        Russian: "ru",
        Italian: "it",
        Danish: "dk",
        Polish: "pl",
        Dutch: "nl"
      },
      drivers: [],
      raceName: "",
      raceDate: ""
    }
  },
  created() {
    this.getData();
  },
  methods: {
    positionStyle(position){
      if(position == "R"){
        return "background-color: red"
      }
    },
    getFlag(nationality){
      let flag = this.flags[nationality];
      let url = "https://www.countryflags.io/"+flag+"/flat/64.png";
      return url;
    },
    getData(){
      this.drivers = [];
      axios.get('https://ergast.com/api/f1/current/last/results.json')
      .then(response => {
        let res = response.data.MRData.RaceTable.Races[0].Results;
        this.raceName = response.data.MRData.RaceTable.Races[0].raceName;
        this.raceDate = response.data.MRData.RaceTable.Races[0].date;
        res.forEach((driver) => {
          if(driver.Time == null){
            var time = driver.status;
          }
          else{
            var time = driver.Time.time;
          }
          let driverStat = {
            position: driver.positionText,
            name: driver.Driver.givenName+" "+driver.Driver.familyName,
            code: driver.Driver.code,
            team: driver.Constructor.name,
            time: time,
            status: driver.status,
            points: driver.points,
            grid: driver.grid,
            nationality: driver.Driver.nationality
          }
          this.drivers.push(driverStat);
          this.isLoading = false;
        });

      })
      .catch(e => {
        console.log(e);
      })
    }
  },
}
</script>

<style >
.flex-container{
  display: flex;
  flex-direction: row;
  background-color: rgb(44, 44, 44);
}
.item{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color:white;
  font-weight: 500;
}

.header-container{
  display: flex;
  flex-direction: row;
}
.header{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.header-position{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
}

.position{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  color:white;
  background-color: #ffa200;
}
/* .centered {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
} */
[v-cloak] {
  display: none;
}
</style>
