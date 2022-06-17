<template>
  <router-view> </router-view>
  <Footer></Footer>
</template>

<script>
import Footer from "./components/Footer.vue";
export default {
  components: { Footer },
};
</script>

<style>
@font-face {
  font-family: "noorehidayat";
  src: local("noorehidayat"),
    url("./assets/fonts/noorehidayat.ttf") format("truetype");
}

.arab {
  font-family: "noorehidayat";
}
</style>
