// /src/store/bookingStore.js
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useBookingStore = defineStore('booking', () => {
  const selectedDate = ref(null);
  const selectedSlots = ref([]);
  const wakeboardRental = ref(0);
  const wetsuitRental = ref(0);

  const calculatePrice = (slots) => {
    let total = 0;

    slots.forEach((slot) => {
      const [startHour] = slot.split('-')[0].split(':').map(Number);

      if (selectedDate.value) {
        const day = new Date(selectedDate.value).getDay();
        const isWeekend = day === 0 || day === 6;
        const isEvening = startHour >= 17;

        if (isWeekend || isEvening) {
          total += 18; // Weekend or evening rate
        } else {
          total += 16; // Regular rate
        }
      }
    });

    // Add rentals
    total += wakeboardRental.value * 5;
    total += wetsuitRental.value * 5;

    return total;
  };

  const totalPrice = computed(() => calculatePrice(selectedSlots.value));

  return {
    selectedDate,
    selectedSlots,
    wakeboardRental,
    wetsuitRental,
    totalPrice,
  };
});