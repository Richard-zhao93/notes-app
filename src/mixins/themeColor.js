const themeColor = {
  computed: {
    themeColor() {
      return this.$store.state.themeColor
    },
    themeColorCode() {
      return this.$store.getters.getThemeColorCode
    }
  }
}

export default themeColor
