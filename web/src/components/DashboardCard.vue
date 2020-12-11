<template>
  <v-card
      class="mt-4 mx-auto"
      max-width="400"
  >
    <v-sheet
        class="v-sheet--offset mx-auto"
        :color="color"
        elevation="12"
        max-width="calc(100% - 32px)"
    >
      <v-sparkline
          :labels="labels"
          :value="value"
          color="white"
          line-width="2"
          padding="16"
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">
        {{ title }}
      </div>
      <div class="subheading font-weight-light grey--text">
        {{ subtitle }}
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon
          class="mr-2"
          small
      >
        mdi-clock
      </v-icon>
      <span class="caption grey--text font-weight-light">last update 26 minutes ago</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DashboardCard",
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    subtitle: {
      type: String,
      default: 'Subtitle card'
    },
    color: {
      type: String,
      default: 'cyan'
    }
  },
  data: () => ({
    labels: [
      '12am',
      '3am',
      '6am',
      '9am',
      '12pm',
      '3pm',
      '6pm',
      '9pm',
    ],
    value: [
      200,
      675,
      410,
      390,
      310,
      460,
      250,
      240,
    ],
  }),
}
</script>

<style scoped>

</style>