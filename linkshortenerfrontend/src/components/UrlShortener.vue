<template>
<div id="notifications">
  <transition name="fade">
        <notification v-if="showCopySucess" message="Link wurde erfolgreich in die Zwischenablage kopiert!" type="sucess"/>
  </transition>
  <transition name="fade">
        <notification v-if="showFailure" message= "Die angegebene URL ist nicht gültig! :(" type="failure"/>
  </transition>
</div>
 <h3> {{ info }} </h3>
  <h1 class="header">Kürze deine URL.</h1>
  <input class="input" type="text" v-model="inputUrl" placeholder="https://hfg-gmuend.de"/>
  <button @click="getGeneratedAbbrevation(inputUrl)" class="btn">Kürzen!</button><br/>
  <input @click="copyFromOutputField" type="text" class="input" v-model="generatedUrl" v-bind:readonly="outputFieldDisabled" id="outputInputField">
  <i class="el-icon-copy-document" id="copyIcon" v-bind:disabled="outputFieldDisabled"></i>
  <button v-on:click="outputFieldDisabled = !outputFieldDisabled" class="btn" style="width:57px; margin-right: 95px"
  v-bind:style= "[outputFieldDisabled ?  'background: #555B6E;':'background: #FAF9F9; border: 2px solid #555B6E; color: #555B6E;']"><i class="el-icon-edit"></i></button><br/>
  <br>
  <a href="https://www.hfg-gmuend.de/"><img src="../assets/Gmuend_logo.svg" class="logo"/></a>
</template>

<script>
import axios from 'axios'
import notification from './notification.vue'
export default {
  name: 'UrlShortener',
  components: {
    notification
  },
  data: function(){
    return {
      generatedUrl: "",
      outputFieldDisabled: true,
      showCopySucess: false,
      showFailure: false,
      info: "",
      inputUrl: "",
    }
  },
  methods: {
    copyFromOutputField(){
      var outputField = document.getElementById("outputInputField");
      if(this.outputFieldDisabled && outputField.value != ""){
      outputField.select();
      document.execCommand('copy');
      this.showCopySucess = true;

      setTimeout(() => {
        this.showCopySucess = false;
      }, 4000)
      }
    },
    async getGeneratedAbbrevation(){
      if(!this.inputUrl.includes("https://"))
        this.inputUrl = "https://" + this.inputUrl;
      
      let url = { url: this.inputUrl};
      axios
      .post('http://localhost:3000/code/generate', url)
      .then(response => {
        if(response.status == 200)
          this.generatedUrl = "http://localhost:8080/resolveLink/" + response.data.url
      })
      .catch(error => {
      console.log(error);
          this.showFailure = true;
          setTimeout(() => {this.showFailure = false;}, 3000)
      })
    }
  },
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
#copyIcon {
  position: absolute;
  color: #BEE3DB;
  margin-top: 1%;
  left: 56%;
  font-size: 28px;
}
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
body {
  background-color: #FAF9F9;
}
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #FAF9F9;
  color: #2c3e50;
  margin-top: 60px;
}
.header {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 63px;
  margin-top: 15%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #FAF9F9;
  color: #000000;
}
.input {
  background: #BEE3DB;
  font-family: inherit;
  font-size: 22px;
  font-weight: normal;
  width: 458px;
  height: 57px;
  left: 408px;
  padding-left: 1%;
  border-style: none;
}
.input:disabled {
  background: #89B0AE;
  font-family: inherit;
  font-weight: normal;
  width: 458px;
  height: 57px;
  left: 408px;
}
input:read-only {
  background: #89B0AE;
  font-family: inherit;
  font-weight: normal;
}
input:focus {
  outline: none;
}
.btn {
  display: inline-block;
  background: #555B6E;
  color: #BEE3DB;
  border: none;
  width: 151px;
  height: 57px; 
  margin: 0px 0px 10px 10px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 22px;
  font-family: inherit;
  font-weight: 600;
}
.btn:focus {
  outline: none;
}
.logo {
position: absolute;
left: 30px;
top: 800px;
}
</style>