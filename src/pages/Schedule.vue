<template>
    <q-page v-show="!isLoading" class="schedule">
        <div v-if="upcomingRaces.length > 0">
            <div id="upcomingRacesHeader">
                <div class="row">
                    <div class="col past-races-container">
                        <h4 class="past-races">Upcoming Races</h4>
                    </div>
                </div>
            </div>

            <br><hr>
            <q-btn v-if="pastRaces.length > 0" icon="keyboard_arrow_down" color="black" @click.native="scrollToBottom">Past Races</q-btn>
            <!-- <a href="#pastRacesHeader" v-smooth-scroll @click='setUrlBack'><q-btn icon="keyboard_arrow_down" color="black">Past Races</q-btn></a>         -->
            <br><br>

            <div v-for="race in upcomingRaces" :key="race.date">
                <div class="border-test">
                    <div class="country">
                        <div class="country">
                            <h4 style="margin:0">{{ race.country }}</h4>    
                        </div>
                        <div class="flag">
                            <h5 style="margin:0">{{ race.date | moment("D MMM YYYY") }}</h5>
                        </div>
                    </div>
                    <div class="contain">
                        <div class="race-container">
                            <q-img :src="getRaceFlag(race.country)" height="50px"> 
                                <div class="absolute-full flag-no-padding" style="padding: 0px;">
                                </div>
                            </q-img>
                        </div>
                        <div class="track-container">
                            <div class="trackname text-bold">
                                {{ race.circuitName}}
                            </div>
                            <div class="trackdate">
                                <img v-if="race.country == 'UK'" src="https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Great%20Britain%20carbon.png.transform/1col/image.png" height="50px"> 
                                <img v-else-if="race.country == 'UAE'" src="https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/United%20Arab%20Emirates%20carbon.png.transform/1col/image.png" height="50px"> 
                                <img v-else :src="getCircuitImage(race.country)" height="50px">
                            </div>
                        </div>
                        <!-- <div class="row">
                            <div class="col">
                                <q-card class="fill " flat square >
                                    <div class="driver-background" style="padding-top: 12%;">
                                        <q-img :src="getDriverImage(race.drivers[1].Driver.givenName, race.drivers[1].Driver.familyName)">
                                        </q-img>
                                    </div>
                                    
                                    <q-card-section class="line-test" style="color: silver; padding-bottom: 3%;">
                                        <div class="text-subtitle2 text-center">{{ race.drivers[1].Driver.code }}</div>
                                    </q-card-section>
                                </q-card>
                            </div>

                            <div class="col">
                                <q-card class="fill" flat square>
                                    <q-img class="driver-background" :src="getDriverImage(race.drivers[0].Driver.givenName, race.drivers[0].Driver.familyName)">
                                    </q-img>
                                    <q-card-section class="line-test" style="color: gold; padding-bottom: 0px;" >
                                    <div class="text-subtitle2 text-center">{{ race.drivers[0].Driver.code }}</div>
                                    </q-card-section>
                                </q-card>
                            </div>

                            <div class="col">
                                <q-card class="fill" flat square>
                                    <div class="driver-background" style="padding-top: 12%">
                                        <q-img :src="getDriverImage(race.drivers[2].Driver.givenName, race.drivers[2].Driver.familyName)">
                                        </q-img>
                                    </div>
                                    <q-card-section class="line-test" style="color: #cd7f32; padding-bottom: 0px;">
                                    <div class="text-subtitle2 text-center">{{ race.drivers[2].Driver.code }}</div>
                                    </q-card-section>
                                </q-card>
                            </div>
                        </div> -->
                        <!-- <div class="text-center " >
                            <h5 class="h5-nomargin">See more</h5>
                        </div> -->
                    </div>
                </div>
                <br><br><br>
            </div>
        </div>

    <div v-if="upcomingRaces.length > 0">
        <div id="pastRacesHeader" class="pastRacesHeader">
            <div class="row">
                <div class="col past-races-container">
                    <h4  class="past-races">Past Races</h4>
                </div>
            </div>
        </div>
        <br><br><br>
        <div v-for="(race, index) in pastRaces" :key="index">
            <div class="border-test">
                <div class="country">
                    <div class="country">
                        <h4 style="margin:0">{{ race.country }}</h4>    
                    </div>
                    <div class="flag">
                        <h5 style="margin:0">{{ race.date | moment("D MMM YYYY") }}</h5>
                    </div>
                </div>
                <div class="contain">
                    <div class="race-container">
                        <q-img :src="getRaceFlag(race.country)" height="50px"> 
                            <div class="absolute-full flag-no-padding" style="padding: 0px;">
                            </div>
                        </q-img>
                    </div>
                    <div class="track-container" style="border: none;">
                        <div class="trackname text-bold">
                            {{ race.circuitName}}
                        </div>
                        <div class="trackdate">
                            <img v-if="race.country == 'UK'" src="https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Great%20Britain%20carbon.png.transform/1col/image.png" height="50px"> 
                            <img v-else-if="race.country == 'UAE'" src="https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/United%20Arab%20Emirates%20carbon.png.transform/1col/image.png" height="50px"> 
                            <img v-else :src="getCircuitImage(race.country)" height="50px">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <q-card class="fill " flat square >
                                <div class="driver-background" style="padding-top: 12%;">
                                    <q-img :src="getDriverImage(race.drivers[1].Driver.givenName, race.drivers[1].Driver.familyName)">
                                    </q-img>
                                </div>
                                
                                <q-card-section class="line-test" style="color: silver; padding-bottom: 3%;">
                                    <div class="text-subtitle2 text-center">{{ race.drivers[1].Driver.code }}</div>
                                </q-card-section>
                            </q-card>
                        </div>

                        <div class="col">
                            <q-card class="fill" flat square>
                                <q-img class="driver-background" :src="getDriverImage(race.drivers[0].Driver.givenName, race.drivers[0].Driver.familyName)">
                                </q-img>
                                <q-card-section class="line-test" style="color: gold; padding-bottom: 0px;" >
                                <div class="text-subtitle2 text-center">{{ race.drivers[0].Driver.code }}</div>
                                </q-card-section>
                            </q-card>
                        </div>

                        <div class="col">
                            <q-card class="fill" flat square>
                                <div class="driver-background" style="padding-top: 12%">
                                    <q-img :src="getDriverImage(race.drivers[2].Driver.givenName, race.drivers[2].Driver.familyName)">
                                    </q-img>
                                </div>
                                <q-card-section class="line-test" style="color: #cd7f32; padding-bottom: 0px;">
                                <div class="text-subtitle2 text-center">{{ race.drivers[2].Driver.code }}</div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </div>
                    <!-- <div class="text-center seemore" >
                        <h5 class="h5-nomargin">See more</h5>
                    </div> -->
                </div>
            </div>
            <br><br><br>
        </div>
    </div>

    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="red" @click.native="scrollToTop"/>
    </q-page-scroller>
  </q-page>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import JQuery from 'jquery'
let $ = JQuery

export default {
    name: 'schedule',
    data () {
        return {
            isLoading: true,
            pastRaces: [],
            upcomingRaces: [],
            drivers: [],
            countryFlags: {
                Australia: "au",
                Bahrain: "bh",
                China: "cn",
                Azerbaijan: "az",
                Spain: "es",
                Monaco: "mc",
                Canada: "ca",
                France: "fr",
                Austria: "at",
                UK: "gb",
                Germany: "de",
                Hungary: "hu",
                Italy: "it",
                Belgium: "be",
                Singapore: "sg",
                Russia: "ru",
                Japan: "jp",
                Mexico: "mx",
                USA: "us",
                Brazil: "br",
                UAE: "ae"
            },
        }
    },
    created() {
        this.getData();
        // this.canScroll = true;
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
    //   handleTopScroll(){
    //     var that = this;
    //     that.canScroll = false;
    //     that.handleScroll();
        
    //     // var sticky2 = $('#pastRacesHeader');
    //     // sticky2.css({
    //     //     position: "static",
    //     //     top: 0,
    //     //     opacity: 1
    //     // });
    //     // $('body').css({
    //     //     "padding-top": 0
    //     // });
    //     setTimeout(function(){
    //         that.canScroll = true;
    //     }, 2000);
    //   },
    handleScroll(){
        // if(this.canScroll == true){
            var sticky1 = $('#upcomingRacesHeader');
            var sticky2 = $('#pastRacesHeader');

            sticky1.css({
                position: "static",
                top: 50
            });
            sticky2.css({
                position: "static",
                top: 0
            });
            // $('body').css({
            //     "padding-top": 0
            // });
            var topOffset1 = sticky1.offset().top;
            var topOffset2 = sticky2.offset().top;
            var stickyHeight1 = sticky1.outerHeight();
            var stickyHeight2 = sticky2.outerHeight();
            var scrollHeight = $(window).scrollTop();
            //make upcoming races header sticky
            if(topOffset1 - 50 < scrollHeight && scrollHeight < topOffset2 - stickyHeight1){
                sticky1.css({
                    position: "sticky",
                    top: 50,
                    // opacity: 0.8
                });
                sticky2.css({
                    position: "static",
                    top: 0,
                    // opacity: 1
                });
                // $('body').css({
                //     "padding-top": stickyHeight1,
                //     "background-color": "black"
                // });
            }
            //make upcoming races and past races headers sticky
            else if(scrollHeight >= topOffset2 - stickyHeight1 && scrollHeight < topOffset2){
                sticky1.css({
                    position: "sticky",
                    top: 0,
                    // opacity: 0.8
                });
                sticky2.css({
                    position: "sticky",
                    top: 50,
                    // opacity: 0.8
                });
                
            }
            //make upcoming races static and past races sticky
            else if(scrollHeight + 50 >= topOffset2){
                sticky1.css({
                    position: "static",
                    opacity: 1
                });
                sticky2.css({
                    position: "sticky",
                    top: 50,
                    // opacity: 0.8
                });
                // $('body').css({
                //     "padding-top": "50px"
                // });
            }
            //make all headers static
            else{
                sticky1.css({
                    position: "static",
                    top: 0,
                    opacity: 1
                });
                sticky2.css({
                    position: "static",
                    top: 50,
                    // opacity: 0.8
                });
            }
            if(scrollHeight < 10){
                sticky1.css({
                    position: "static",
                    top: 50,
                    opacity: 1
                });
                // $('body').css({
                //     "padding-top": 0,
                //     "background-color": "black"
                // });
            }           
        // }
    },
    scrollToTop(){
        var el = this.$el.getElementsByClassName("upcomingRacesHeader")[0];
        el.scrollIntoView();
    },
    scrollToBottom(){
        var el = this.$el.getElementsByClassName("pastRacesHeader")[0];
        el.scrollIntoView();
    },
    moment: function () {
        return moment();
    },
    async getUpcomingRaces(){
        //get the amount of races in the season
        await axios.get("http://ergast.com/api/f1/current.json?limit=1000")
        .then(response => {
            this.upcomingRaces = [];
            let res = response.data.MRData;
            if(res.total > this.pastRaces.length){
                let count = [];
                for(let i = 0; i < res.total; i++){
                    if(i >= this.pastRaces.length){
                        count.push(i+1);
                    }
                }
                //get which races are still upcoming
                this.getUpcoming(count);
            }
        });
        
    },
    //async function to get the upcoming races. Async/await used to prevent a race condition. no pun intended
    async getUpcoming(count){
        for(let i = 0; i < count.length; i++){
            await axios.get(`http://ergast.com/api/f1/current/${count[i]}.json?limit=1000`)
            .then(response => {
                let race = response.data.MRData.RaceTable.Races[0];
                let raceStats = {
                    country: race.Circuit.Location.country,            
                    raceName: race.raceName,
                    date: race.date,
                    circuitName: race.Circuit.circuitName
                }
                this.upcomingRaces.push(raceStats);
            });
        }
    },
    async getData(){
        this.pastRaces = [];
        await axios.get("https://ergast.com/api/f1/2019/results.json?limit=1000")
        .then(response => {
            let res = response.data.MRData.RaceTable.Races;
            res.forEach((race) => {
                let raceStats = {
                country: race.Circuit.Location.country,            
                raceName: race.raceName,
                date: race.date,
                circuitName: race.Circuit.circuitName,
                drivers: race.Results,
                }
                this.pastRaces.push(raceStats);
                this.isLoading = false;
            });
            this.pastRaces.reverse();
        })
        .catch(e => {
            console.log(e);
        })
        this.getUpcomingRaces();
    },
    getCircuitImage(country){
        return `https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/${country}%20carbon.png.transform/1col/image.png`;
    },
    getDriverImage(name, familyName){
        let concatName = name.substring(0,3) + familyName.substring(0,3) + "01";
        let url = `https://www.formula1.com/content/dam/fom-website/drivers/${name[0]}/${concatName.toUpperCase()}_${name}_${familyName}/${concatName.toLowerCase()}.png.transform/2col-retina/image.png`;
        return url;
    },
    getRaceFlag(country){
        let flag = this.countryFlags[country];
        return `http://www.geonames.org/flags/x/${flag}.gif`;
    }
  },
}

</script>

<style>
html {
  scroll-behavior: smooth;
}

#upcomingRacesHeader {
    width: 100%;
    z-index:500;
}
#pastRacesHeader {
    opacity:1;
    width: 100%;
    z-index:500;
}

.see-more-btn{
    margin-bottom: 5%; 
    background-color: gray;
    border-style: solid;
    border-width: 5%;
    border-bottom-left-radius: 13px;
    border-bottom-right-radius: 13px;
    border-color: gray;
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
    padding-top: 3%;
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
    justify-content: flex-start;
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
}
.track-container{
    display: flex;
    flex-direction: row;
    padding-top: 3%;
    padding-bottom: 3%;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: white;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: white;
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
    margin-left: 15%;
    background-color: black;
    padding-left: 3%;
    /* padding-top: 2%; */
    padding-bottom: 2%;
    width: 100%;
    border-left: 3px;
    border-left-style: solid;
    border-bottom: 3px;
    border-color: white;
    border-bottom-style: solid;
    border-color: red;
    border-bottom-left-radius: 10px;
}
.past-races{
    padding: 0;
    margin: 0;
}

</style>