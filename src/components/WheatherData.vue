const waterResponse = await axios.get('http://localhost:4000/api/water-temperature');
<template>
  <div class="flex items-center justify-center space-x-6">
    <!-- Air Temperature -->
    <div class="flex items-center text-gray-700">
      <img src="@/assets/sunIcon.svg" alt="Sun Icon" class="w-6 h-6 mr-1" />
      <span class="font-medium">
        <span v-if="airTemperature !== null">{{ airTemperature }}°C</span>
        <span v-else>--°C</span>
      </span>
    </div>

    <!-- Water Temperature -->
    <div class="flex items-center text-gray-700">
      <img src="@/assets/waterIcon.svg" alt="Droplet Icon" class="w-6 h-6 mr-1" />
      <span class="font-medium">
        <span v-if="waterTemperature !== null">{{ waterTemperature }}°C</span>
        <span v-else>--°C</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';


const airTemperature = ref(null);
const waterTemperature = ref(null);

const fetchAirTemperature = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/air-temperature');
    const forecast = response.data.forecastTimestamps.find(entry => entry.forecastTimeUtc.includes(new Date().toISOString().split('T')[0]));
    if (forecast) {
      airTemperature.value = forecast.airTemperature;
    }
  } catch (error) {
    console.error('Failed to fetch air temperature:', error);
  }
};

const fetchWaterTemperature = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/water-temperature');
    const latestObservation = response.data.observations.find(obs => obs.waterTemperature !== null);
    if (latestObservation) {
      waterTemperature.value = latestObservation.waterTemperature;
    }
  } catch (error) {
    console.error('Failed to fetch water temperature:', error);
  }
};

const fetchTemperatures = () => {
  fetchAirTemperature();
  fetchWaterTemperature();
};

onMounted(() => {
  fetchTemperatures();
  setInterval(fetchTemperatures, 14400000); // Update every 4 hours (4 hours * 60 minutes * 60 seconds * 1000 ms)
});
</script>

<style scoped>
.bg-blue-100 {
  background-color: #ebf8ff;
}
</style>