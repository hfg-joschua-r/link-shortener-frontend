<template>
  <Header>
      <h1 class="header">{{ title }}</h1>
  </Header> 
  <input class="input" type="text" v-model="inputUrl" v-bind:placeholder="placeholder"/>
  <button @click="ouputUrl(inputUrl)" class="btn">Kürzen!</button><br/>
  <!-- <Button @generate-url="ouputUrl(inputUrl)" text="Kürzen!" function="generate-url"/><br> -->
  <input type="text" class="input" v-model="generatedUrl" v-bind:disabled="editOutputUrl">
  <button @click="editOutputUrl = !editOutputUrl" class="btn" style="width:57px; margin-right: 95px"
  v-bind:style= "[editOutputUrl ? 'background: #555B6E;' : 'background: #FAF9F9; border: 2px solid #555B6E; color: #555B6E;']">edit</button><br/>
  <br>
  <a v-bind:href="generatedUrl">{{ generatedUrl }}</a>
</template>

<script>
export default {
  name: 'UrlShortener',
  props: {
    title: String,
    placeholder: String,
  },
  components: {
  },
  data: function(){
    return {
      generatedUrl: "",
      editOutputUrl: true,
    }
  },
  methods: {
    ouputUrl(url){
      //backend Call
      url ="https://" + url + ".com";
      console.log(url);
      this.generatedUrl = url;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
