<template>
<div if="notifications">
  <transition name="notification">
        <notification v-if="showCopySucess" message="Link wurde erfolgreich in die Zwischenablage kopiert!" type="sucess"/>
  </transition>
  </div>
  <h1 class="header">{{ title }}</h1>
  <input class="input" type="text" v-model="inputUrl" v-bind:placeholder="placeholder"/>
  <button @click="ouputUrl(inputUrl)" class="btn">Kürzen!</button><br/>
  <input @click="copyFromOutputField" type="text" class="input" v-model="generatedUrl" v-bind:readonly="outputFieldDisabled" id="outputInputField">
  <button v-on:click="outputFieldDisabled = !outputFieldDisabled" class="btn" style="width:57px; margin-right: 95px"
  v-bind:style= "[outputFieldDisabled ?  'background: #555B6E;':'background: #FAF9F9; border: 2px solid #555B6E; color: #555B6E;']">edit</button><br/>
  <br>
</template>

<script>
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
      if(this.outputFieldDisabled){
      outputField.select();
      document.execCommand('copy');
      this.showCopySucess = true;
      
      setTimeout(() => {
        this.showCopySucess = false;
      }, 3000)
      }
    }
  },
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>