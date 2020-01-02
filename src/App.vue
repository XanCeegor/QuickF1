<template>
  <div id="q-app">
    <router-view style="background-color:black;" />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    let root = "/recentrace";
    this.$router.push({ path: root });
  }
};
</script>
