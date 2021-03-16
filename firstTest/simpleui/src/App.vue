<template>
<div>
  <UrlShortener title="Josch's URL shortener" placeholder="deineUrl.com"/>
</div>
</template>

<script>
import UrlShortener from './components/UrlShortener'

export default {
  name: 'App',
  components: {
    UrlShortener
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
</style>
