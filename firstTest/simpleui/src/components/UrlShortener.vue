<template>
  <Header>
      <h1>{{ title }}</h1>
  </Header> 
  <input type="text" v-model="inputUrl" v-bind:placeholder="placeholder"/><br>
  <Button @generate-url="ouputUrl(inputUrl)" text="shorten URL" color="lightblue"/>
  <br><br>
  <a v-bind:href="generatedUrl">{{ generatedUrl }}</a>
</template>

<script>
import Button from "./Button";
export default {
  name: 'UrlShortener',
  props: {
    title: String,
    placeholder: String,
  },
  components: {
    Button
  },
  data: function(){
    return {
      generatedUrl: "",
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
