<template>
  <div class="container">
    <Navbar></Navbar>
    <Body></Body>
  </div>
</template>

<script>
import Body from "../components/Body.vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "IndexPage",
  components: { Body, Navbar },
};
</script>
