<template>
  <div id="app">
    <router-view />
    <theme-picker />
  </div>
</template>

<script>
import ThemePicker from "@/components/ThemePicker";

export default {
  name: "App",
  components: { ThemePicker },
    metaInfo() {
        return {
            title: this.$store.state.settings.dynamicTitle && this.$store.state.settings.title,
            titleTemplate: title => {
                return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE
            }
        }
    }
};
</script>
<style>
@import "../node_modules/halfmoon/css/halfmoon.css";
</style>
<style>
#app .theme-picker {
  display: none;
}
.bg{
	height: 91vh;
	background-color: #80b9ff;
}
</style>
