<template>
  <div v-layout="'app-layout'">
      <div class="pa-4">
        <div class="d-flex">
          <DashboardCard
              class="flex"
              :title="$t('dashboard.chart.visualization')"
          ></DashboardCard>
          <DashboardCard
              class="flex"
              color="orange"
              :title="$t('dashboard.chart.sales')"
          ></DashboardCard>
          <DashboardCard
              class="flex"
              color="purple"
              :title="$t('dashboard.chart.concurrency')"
          ></DashboardCard>
        </div>
      </div>
  </div>
</template>

<script>
import DashboardCard from "@/components/DashboardCard";
export default {
  name: "Home",
  components: {DashboardCard}
};
</script>

<style scoped></style>
