<template>
    <q-page v-show="!isLoading" class="schedule">
        <div class="row">
            <div class="col past-races-container">
                <h4 class="past-races">Past Races</h4>
            </div>
        </div>
        <br>
        <div v-for="(race, index) in races" :key="index">
            <div class="border-test">
                <div class="contain">
                    <div class="race-container">
                        <q-img src="http://www.geonames.org/flags/x/au.gif"> 
                            <div class="absolute-full flag-no-padding" style="padding: 0px;">
                                <div class="country details-overlay">
                                    <div class="country">
                                        <h4 style="margin:0">{{ race.country }}</h4>    
                                    </div>
                                    <div class="flag">
                                        <h5 style="margin:0">{{ race.date }}</h5>
                                    </div>
                                </div>
                            </div>
                        </q-img>
                    </div>
                    <div class="track-container">
                        <div class="trackname">
                            {{ race.circuitName}}
                        </div>
                        <div class="trackdate">
                            <img src="https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Australia%20carbon.png.transform/3col/image.png" height="50px">
                        </div>
                    </div>
                    <hr>
                    <div v-for="(driver, index) in drivers" :key="index"></div>
                    <div class="row drivers">
                        <div class="col">
                            <q-card class="fill" flat square >
                                <div class="driver-background" style="padding-top: 12%;">
                                    <q-img src="https://www.formula1.com/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png.transform/2col-retina/image.png">
                                    </q-img>
                                </div>
                                
                                <q-card-section class="line-test" style="color: silver; padding-bottom: 3%;">
                                    <div class="text-subtitle2 text-center">{{ }}</div>
                                </q-card-section>
                            </q-card>
                        </div>

                        <div class="col">
                            <q-card class="fill" flat square>
                                <q-img class="driver-background" src="https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col-retina/image.png">
                                </q-img>
                                <q-card-section class="line-test" style="color: gold; padding-bottom: 0px;" >
                                <div class="text-subtitle2 text-center">{{ }}</div>
                                </q-card-section>
                            </q-card>
                        </div>

                        <div class="col">
                            <q-card class="fill" flat square>
                                <div class="driver-background" style="padding-top: 12%">
                                    <q-img src="https://www.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col-retina/image.png">
                                    </q-img>
                                </div>
                                <q-card-section class="line-test" style="color: #cd7f32; padding-bottom: 0px;">
                                <div class="text-subtitle2 text-center">{{  }}</div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </div>
                    <div class="text-center seemore" >
                        <h5 class="h5-nomargin">See more</h5>
                    </div>
                </div>
            </div>
            <br><br>
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
            races: [],
            drivers: []
        }
    },
    created() {
        this.getData();
        
    },
  methods: {
    getDriverImage(index) {
      return `https://www.formula1.com/content/fom-website/en/drivers/${this.drivers[index].firstname}-${this.drivers[index].familyname}/_jcr_content/image16x9.img.1536.high.jpg`
    },
    getData(){
      this.races = [];
      axios.get('https://ergast.com/api/f1/current.json')
      .then(response => {
        let res = response.data.MRData.RaceTable.Races;
        res.forEach((race) => {
          let raceStats = {
            country: race.Circuit.Location.country,
            raceName: race.raceName,
            date: race.date,
            circuitName: race.Circuit.circuitName,
          }
          this.races.push(raceStats);
          this.isLoading = false;
        });
        this.drivers = [];
        for(var i = 0; i < 20; i++){
            console.log(i);
            this.getTop3(i);
        }
      })
      .catch(e => {
        console.log(e);
      })
    },
    getTop3(round){
        console.log(round);
        axios.get(`https://ergast.com/api/f1/2019/${i}/results.json`)
        .then(response => {
            let res = response.data.MRData.RaceTable.Races[0].Results;
            res.forEach((driver) => {
            let driverStats = {
                name: driver.Driver.code,
            }
            this.drivers.push(driverStats);
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

<style>
.seemore{
    margin-bottom: 5%; 
    background-color: red;
    border-style: solid;
    border-width: 5%;
    border-bottom-left-radius: 13px;
    border-bottom-right-radius: 13px;
    border-color: red;
    border-top-style: solid;
    border-top-color: white;
    border-top-width: 2px;
}
.h5-nomargin{
    margin: 0px;
}
.line-test{
    padding-top: 0px;
    border-style: solid;
    border-width: 2px;
}
.drivers{
    background-color: black;
}

/* drivers */
.drivercontainer{
    display: flex;
    flex-direction: row;
    background-color: red;
    
}
.driver{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-shrink: inherit;
}
.second{
  margin-top: 5%;
  
}
.third{
  padding-top: 5%;
}
.fill{
  height: 100%;
  background-color: rgb(44, 44, 44);
  color: white;
  /* white-space: nowrap; */
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
.driver-background{
    background-image: linear-gradient(123deg, #15151e 25%, #23232b 25%, #23232b 50%, #15151e 50%, #15151e 75%, #23232b 75%, #23232b 100%);
    background-size: 11.92px 18.36px;
}





.flag-no-padding{
    position: absolute;
    opacity: 85%;
}
.details-overlay{
    border-style: solid;
    border-width: 5px;
    border-color: black;
    background-color: black;
    position: absolute;
    width: 100%;
}

.border-test{
    border-left-style: solid;
    border-bottom-style: solid;
    border-bottom-color: red;
    border-left-color: red;
    border-width: 5px;
    border-radius: 5px;
    margin-left: 5%;
    padding-left: 2%;
}

.contain{
    background-color: gray;
    margin-right: 3%;
    margin-bottom: 3%;
    border-bottom-left-radius: 13px;
    border-bottom-right-radius: 13px;
}
.scheduleline{
    border:0;
    margin:0;
    width:100%;
    height:1px;
    background:red;
    margin-top: 3%;
}
.race-container{
  display: flex;
  flex-direction: row;
}
.country{
    display: flex;
    justify-content: center;
    width: 100%;
    color:white;
    font-weight: 500;
    padding-left: 2%;
    align-items: center;
}
.flag{
    display: flex;
    justify-content: flex-end;
    width: 100%;
    color:white;
    font-weight: 500;
    margin-right: 3%;
    height: 50%
}
.track-container{
    display: flex;
    flex-direction: row;
    margin-top: 3%;
}
.trackname{
    display: flex;
    justify-content: flex-start;
    width: 100%;
    color:white;
    padding-left: 2%;
    align-items: center;
}
.trackdate{
    display: flex;
    justify-content: flex-end;
    margin-right: 5%;
    width: 60%;
    align-items: center;

}



.h4-no-margin{
    margin: 0;
}
.schedule{
    background-color: black;
    color: white;
}
.past-races-container{
    padding-left: 15%;
    padding-top: 5%;
    padding-bottom: 5%;
}
.past-races{
    border-bottom: 3px;
    border-color: white;
    border-bottom-style: solid;
    padding: 0;
    border-color: red;
    margin: 0;
}
[v-cloak] {
  display: none;
}
</style>