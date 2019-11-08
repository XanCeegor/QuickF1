<template>
<q-page v-show="!isLoading">
  <div class="constructor">
    <div class="teamcontainer">
      <div class="team">
        <div class="second">
          <q-card class="fill" flat square>
            <q-img :src="getTeamImage(1)">
            </q-img>
            <q-card-section>
              <div class="row">
                <div class="col text-center">
                  <q-chip class="second-badge">
                    <q-avatar>
                      <img src="https://img.icons8.com/color/96/000000/silver-medal--v2.png" width="24" height="24">
                    </q-avatar>
                    <div class="text-bold">{{ teams[1].position }}nd</div>
                  </q-chip>
                </div>
              </div>
              <div class="text-subtitle2 text-center">{{ teams[1].name }}</div>
              <hr>
              <div class="text-center">
                <div>{{ teams[1].wins }} Wins</div>
                <div>{{ teams[1].points }} Points</div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="first">
          <q-card class="fill " flat square>
            <q-img :src="getTeamImage(0)">
            </q-img>
            <q-card-section>
              <div class="row">
                <div class="col text-center">
                  <q-chip class="first-badge">
                    <q-avatar>
                      <img src="https://img.icons8.com/color/96/000000/gold-medal--v2.png" width="24" height="24">
                    </q-avatar>
                    <div class="text-bold">{{ teams[0].position }}st</div>
                  </q-chip>
                </div>
              </div>
              <div class="text-subtitle2 text-center">{{ teams[0].name }}</div>
              <hr>
              <div class="text-center">
                <div>{{ teams[0].wins }} Wins</div>
                <div>{{ teams[0].points }} Points</div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="third">
          <q-card class="fill" flat square>
            <q-img :src="getTeamImage(2)">
            </q-img>
            <q-card-section>
              <div class="row">
                <div class="col text-center">
                  <q-chip class="third-badge">
                    <q-avatar>
                      <img src="https://img.icons8.com/color/96/000000/bronze-medal--v2.png" width="24" height="24">
                    </q-avatar>
                    <div class="text-bold">{{ teams[2].position }}rd</div>
                  </q-chip>
                </div>
              </div>
              <div class="text-subtitle2 text-center">{{ teams[2].name }}</div>
              <hr>
              <div class="text-center">
                <div>{{ teams[2].wins }} Wins</div>
                <div>{{ teams[2].points }} Points</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div class="header-container">
      <div class="header-position dark">
        Pos
      </div>
      <div class="header">
        Team Name
      </div>
      <div class="header">
        Wins
      </div>
      <div class="header">
        Points
      </div>
    </div>
    
    <hr>

    <div v-for="(team, index) in teams.slice(3)" :key="index" class="flex-container">
      <div class="position">
          <q-item-label>{{team.position}}</q-item-label>
      </div>
      <div class="item">
        <q-item-section>
          <q-item-label class="text-center">{{team.name}}</q-item-label>
        </q-item-section>
      </div>
      <div class="item">
        {{team.wins}}
      </div>
      <div class="item">
        <q-item-label>{{team.points}}</q-item-label>
      </div>
    </div>

  </div>
</q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'constructors',
  data () {
    return {
      isLoading: true,
      teams: [],
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getTeamImage(index) {
      return `https://www.formula1.com/content/fom-website/en/teams/${this.teams[index].name}/_jcr_content/logo.img.jpg/1515152671364.jpg`
    },
    getData(){
      this.teams = [];
      axios.get('http://ergast.com/api/f1/current/constructorStandings.json')
      .then(response => {
        let res = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        res.forEach((team) => {
            let teamName = team.Constructor.name.replace(" ", "-")
            let teamStats = {
            name: teamName,
            position: team.positionText,
            wins: team.wins,
            points: team.points
            }
            this.teams.push(teamStats);
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

<style scoped>
.constructor{
    height: 100vh;
    background-color: black;
}
hr{
    border:0;
    margin:0;
    width:100%;
    height:2px;
    background:red;
}
.teamcontainer{
  display: flex;
  flex-direction: row;
  background-color: black;
}
.team{
    display: flex;
    justify-content: center;
    width: 100%;
}
.first{
    height: 100%;
    width: 100%;
}
.second{
    padding-top: 5%;
    height: 100%;
    width: 100%;
}
.third{
    padding-top: 5%;
    height: 100%;
    width: 100%;
}

.fill{
  height:100%;
  background-color: rgb(44, 44, 44);
  color: white;
  white-space: nowrap;
}
.first-badge{
  background: gold;
}
.second-badge{
  background: silver;
}
.third-badge{
  background: #cd7f32;
}

.flex-container{
  display: flex;
  flex-direction: row;
  background-color: rgb(44, 44, 44);
  
}
.item{
  display: flex;
  justify-content: center;
  width: 100%;
  color:white;
  font-weight: 500;
  height: 50px;
}

.header-container{
  display: flex;
  flex-direction: row;
  background-color: black;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
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
.centered {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
}
[v-cloak] {
  display: none;
}
</style>
