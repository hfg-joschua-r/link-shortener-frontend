<template>
<div id="notifications">
  <transition name="fade">
        <notification v-if="showCopySucess" message="Link wurde erfolgreich in die Zwischenablage kopiert!" type="sucess"/>
  </transition>
</div>
 <h3> {{ info }} </h3>
  <h1 class="header">{{ title }}</h1>
  <input class="input" type="text" v-model="inputUrl" v-bind:placeholder="placeholder"/>
  <button @click="getGeneratedAbbrevation(inputUrl)" class="btn">Kürzen!</button><br/>
  <input @click="copyFromOutputField" type="text" class="input" v-model="generatedUrl" v-bind:readonly="outputFieldDisabled" id="outputInputField">
  <i class="el-icon-copy-document" id="copyIcon" v-bind:disabled="outputFieldDisabled"></i>
  <button v-on:click="outputFieldDisabled = !outputFieldDisabled" class="btn" style="width:57px; margin-right: 95px"
  v-bind:style= "[outputFieldDisabled ?  'background: #555B6E;':'background: #FAF9F9; border: 2px solid #555B6E; color: #555B6E;']"><i class="el-icon-edit"></i></button><br/>
  <br>
</template>

<script>
import axios from 'axios'
import notification from './notification.vue'
export default {
  name: 'UrlShortener',
  props: {
    title: String,
    placeholder: String,
  },
  components: {
    notification
  },
  data: function(){
    return {
      generatedUrl: "",
      outputFieldDisabled: true,
      showCopySucess: false,
      info: "",
      inputUrl: "",
    }
  },
  methods: {
    ouputUrl(url){
      //backend Call
      url ="https://" + url + ".com";
      console.log(url);
      this.generatedUrl = url;
    },
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
      let url = { url: this.inputUrl};
      axios
      .post('http://localhost:3000/code/generate', url)
      .then(response => (this.generatedUrl = "http://localhost:3000/code/" + response.data.url))
      .catch(error => (console.log(error)))
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
</style>