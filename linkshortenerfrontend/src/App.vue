<template>
 <router-view/>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
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