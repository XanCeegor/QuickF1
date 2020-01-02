<template>
  <q-page v-show="!isLoading">
    <div class="drivercontainer">
      <div class="driver">
        <div class="second-standing">
          <q-card class="fill" flat square>
            <q-img :src="getDriverImage(1)"> </q-img>
            <q-card-section>
              <div class="row">
                <div class="col text-center">
                  <q-chip class="second-standing-badge">
                    <q-avatar>
                      <img
                        src="~assets/medals/silver.png"
                        width="24"
                        height="24"
                      />
                    </q-avatar>
                    <div class="text-bold">{{ drivers[1].position }}nd</div>
                  </q-chip>
                </div>
              </div>
              <div class="text-subtitle2 text-center">
                {{ drivers[1].fullname }}
              </div>
              <hr class="line" />
              <div class="text-center">
                <div>{{ drivers[1].team }}</div>
                <div>{{ drivers[1].wins }} Wins</div>
                <div>{{ drivers[1].points }} Points</div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="first-standing">
          <q-card class="fill" flat square>
            <q-img :src="getDriverImage(0)"> </q-img>
            <q-card-section>
              <div class="row">
                <div class="col text-center">
                  <q-chip class="first-standing-badge">
                    <q-avatar>
                      <img
                        src="~assets/medals/gold.png"
                        width="24"
                        height="24"
                      />
                    </q-avatar>
                    <div class="text-bold">{{ drivers[0].position }}st</div>
                  </q-chip>
                </div>
              </div>
              <div class="text-subtitle2 text-center">
                {{ drivers[0].fullname }}
              </div>
              <hr class="line" />
              <div class="text-center">
                <div>{{ drivers[0].team }}</div>
                <div>{{ drivers[0].wins }} Wins</div>
                <div>{{ drivers[0].points }} Points</div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="third-standing">
          <q-card class="fill" flat square>
            <q-img :src="getDriverImage(2)"> </q-img>
            <q-card-section>
              <div class="row">
                <div class="col text-center">
                  <q-chip class="third-standing-badge">
                    <q-avatar>
                      <img
                        src="~assets/medals/bronze.png"
                        width="24"
                        height="24"
                      />
                    </q-avatar>
                    <div class="text-bold">{{ drivers[2].position }}rd</div>
                  </q-chip>
                </div>
              </div>
              <div class="text-subtitle2 text-center">
                {{ drivers[2].fullname }}
              </div>
              <hr class="line" />
              <div class="text-center">
                <div>{{ drivers[2].team }}</div>
                <div>{{ drivers[2].wins }} Wins</div>
                <div>{{ drivers[2].points }} Points</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div class="driver-header-container" id="driver-header-container">
      <div class="header-position dark">
        Pos
      </div>
      <div class="header">
        Driver
      </div>
      <div class="header">
        Team
      </div>
      <div class="header">
        Wins
      </div>
      <div class="header">
        Points
      </div>
    </div>

    <div
      v-for="driver in drivers.slice(3)"
      :key="driver"
      class="flex-container"
    >
      <div class="position">
        <q-item-label>{{ driver.position }}</q-item-label>
      </div>
      <div class="item">
        <q-item-section>
          <q-item-label class="lt-sm text-center">{{
            driver.code
          }}</q-item-label>
          <q-item-label class="gt-xs text-center">{{
            driver.fullname
          }}</q-item-label>
        </q-item-section>
      </div>
      <div class="item text-center">
        {{ driver.team }}
      </div>
      <div class="item">
        <q-item-label>{{ driver.wins }}</q-item-label>
      </div>
      <div class="item">
        <q-item-label>{{ driver.points }}</q-item-label>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import JQuery from "jquery";
let $ = JQuery;

export default {
  name: "drivers",
  data() {
    return {
      isLoading: true,
      drivers: []
    };
  },
  created() {
    this.getData();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeMount() {
    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 1500);
  },
  methods: {
    handleScroll() {
      var sticky1 = $("#driver-header-container");
      var topOffset1 = sticky1.offset().top;
      var scrollHeight = $(window).scrollTop();
      if (topOffset1 - 50 <= scrollHeight) {
        sticky1.css({
          position: "sticky",
          top: 50
        });
      }
    },
    getDriverImage(index) {
      return `https://www.formula1.com/content/fom-website/en/drivers/${this.drivers[index].firstname}-${this.drivers[index].familyname}/_jcr_content/image16x9.img.1536.high.jpg`;
    },
    getData() {
      this.drivers = [];
      axios
        .get("https://ergast.com/api/f1/current/driverStandings.json")
        .then(response => {
          let res =
            response.data.MRData.StandingsTable.StandingsLists[0]
              .DriverStandings;
          res.forEach(driver => {
            let driverStat = {
              firstname: driver.Driver.givenName.toLowerCase(),
              familyname: driver.Driver.familyName.toLowerCase(),
              fullname:
                driver.Driver.givenName + " " + driver.Driver.familyName,
              position: driver.positionText,
              code: driver.Driver.code,
              team: driver.Constructors[0].name,
              points: driver.points,
              wins: driver.wins
            };
            this.drivers.push(driverStat);
            this.isLoading = false;
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style>
.drivercontainer {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: black;
}
.driver {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.first-standing {
  height: 100%;
  width: 100%;
}
.second-standing {
  padding-top: 5%;
  width: 100%;
  height: 100%;
}
.third-standing {
  padding-top: 5%;
  width: 100%;
  height: 100%;
}

.fill {
  height: 100%;
  background-color: rgb(44, 44, 44);
  color: white;
  white-space: nowrap;
}
.first-standing-badge {
  background: gold;
}
.second-standing-badge {
  background: silver;
}
.third-standing-badge {
  background: #cd7f32;
}

.flex-container {
  display: flex;
  flex-direction: row;
  background-color: rgb(44, 44, 44);
}
.item {
  display: flex;
  justify-content: center;
  width: 100%;
  color: white;
  font-weight: 500;
  height: 50px;
}

.driver-header-container {
  display: flex;
  flex-direction: row;
  background-color: black;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid red;
  z-index: 1;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.header-position {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
}

.position {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  color: white;
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
