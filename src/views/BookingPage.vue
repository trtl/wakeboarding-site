<template>
  <div class="min-h-screen bg-gray-50 pt-16">
    <div class="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <!-- Left Column: Calendar and Form -->
      <div class="space-y-6">
        <!-- Calendar for Date Selection -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <h2 class="text-xl font-semibold mb-4">Pasirinkite datą</h2>
          <Datepicker data-test="date-picker" 
            v-model="selectedDate"
            :inline="true"
            :format="dateFormat"
            :enable-time-picker="false"
            :min-date="new Date()"
            :autoApply="true"
            modelType="yyyy-MM-dd"
            @update:modelValue="fetchReservedSlots"
          />
        </div>

        <!-- Reservation Info -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <h2 class="text-xl font-semibold mb-4">Užsakymo informacija</h2>
          <div class="space-y-4">
            <input v-model="name" placeholder="Vardas" class="w-full p-2 border rounded" />
            <input v-model="email" placeholder="El. paštas" class="w-full p-2 border rounded" />
            <input v-model="phone" placeholder="Telefonas" class="w-full p-2 border rounded" />

            <div class="flex justify-between items-center">
              <label>vandenlentės nuoma:</label>
              <input type="number" v-model="bookingStore.wakeboardRental" min="0" max="5" class="border p-1 rounded w-16" />
            </div>
            <div class="flex justify-between items-center">
              <label>hidrokostiumo nuoma:</label>
              <input type="number" v-model="bookingStore.wetsuitRental" min="0" max="5" class="border p-1 rounded w-16" />
            </div>

            <div data-test="total-price" class="text-lg font-semibold mt-4">
              Viso kaina: {{ bookingStore.totalPrice }} €
            </div>

            <div class="flex space-x-4">
              <button
                data-test="book-button" 
                @click="handleReservation" 
                class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold
                transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                :disabled="!isFormValid || bookingStore.selectedSlots.length === 0"
              >
                Rezervuoti
              </button>
              <button 
                @click="handlePayment"
                class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold
                transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                :disabled="!isFormValid || bookingStore.selectedSlots.length === 0"
              >
                Mokėti
              </button>
            </div>

          </div>
        </div>
      </div>



      <!-- 'bg-gray-200 text-gray-500 cursor-not-allowed': reservedSlots.includes(slot),
              'bg-green-500 text-white font-medium shadow-md transform scale-105': bookingStore.selectedSlots.includes(slot),
              'bg-white hover:bg-green-100 cursor-pointer': !reservedSlots.includes(slot) -->
      <div class="grid grid-cols-3 gap-2">
        <div
          v-for="slot in timeSlots"
          :key="slot"
          data-test="time-slot"
          :class="{
            'bg-gray-200 text-gray-500 cursor-not-allowed': reservedSlots.includes(slot),
            'bg-green text-red-300 font-medium shadow-md transform scale-105': bookingStore.selectedSlots.includes(slot),
            'bg-white hover:bg-green-100 hover:text-white cursor-pointer': !reservedSlots.includes(slot)
          }"
          @click="toggleSlot(slot)"
          class="p-3 border text-center transition-all duration-200 ease-in-out"
        >
          {{ slot }}
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch,computed } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { getReservedSlots, reserveTimeSlots  } from '@/firebase/reservations';
import { useBookingStore } from '@/store/booking';
import { getAuth } from 'firebase/auth'



const auth = getAuth();
const dateFormat = "yyyy-MM-dd";
const bookingStore = useBookingStore();
const selectedDate = ref(null);
const name = ref('');
const email = ref('');
const phone = ref('');
const isFormValid = computed(() => {
  return name.value && 
         email.value && 
         phone.value && 
         bookingStore.selectedSlots.length > 0;
});

const timeSlots = ref([
  "08:00-08:20", "08:20-08:40", "08:40-09:00",
  "09:00-09:20", "09:20-09:40", "09:40-10:00",
  "10:00-10:20", "10:20-10:40", "10:40-11:00",
  "11:00-11:20", "11:20-11:40", "11:40-12:00",
  "12:00-12:20", "12:20-12:40", "12:40-13:00",
  "13:00-13:20", "13:20-13:40", "13:40-14:00",
  "14:00-14:20", "14:20-14:40", "14:40-15:00",
  "15:00-15:20", "15:20-15:40", "15:40-16:00",
  "16:00-16:20", "16:20-16:40", "16:40-17:00",
  "17:00-17:20", "17:20-17:40", "17:40-18:00",
  "18:00-18:20", "18:20-18:40", "18:40-19:00",
  "19:00-19:20", "19:20-19:40", "19:40-20:00",
  "20:00-20:20", "20:20-20:40", "20:40-21:00",
  "21:00-21:20", "21:20-21:40", "21:40-22:00",
]);

const reservedSlots = ref([]);


const fetchReservedSlots = async (date) => {
  try {
    if (!date) {
      reservedSlots.value = [];
      return;
    }
    
    let formattedDate;
    if (typeof date === 'string') {
      formattedDate = date;
    } else if (date instanceof Date) {
      formattedDate = date.toISOString().split('T')[0];
    } else {
      console.error('Invalid date format:', date);
      reservedSlots.value = [];
      return;
    }

    // Only fetch if we have a valid date
    const slots = await getReservedSlots(formattedDate);
    reservedSlots.value = slots;
    bookingStore.selectedDate = formattedDate;
    bookingStore.selectedSlots = [];
    
  } catch (error) {
    console.error('Error fetching slots:', error);
    reservedSlots.value = [];
  }
};


// Watch for date changes
watch(selectedDate, (newDate) => {
  if (newDate) {
    fetchReservedSlots(newDate);
  }
});

const toggleSlot = (slot) => {
  if (reservedSlots.value.includes(slot)) return;
  
  const index = bookingStore.selectedSlots.indexOf(slot);
  if (index === -1) {
    bookingStore.selectedSlots.push(slot);
  } else {
    bookingStore.selectedSlots.splice(index, 1);
  }
};

const handleReservation = async () => {
  try {
    // Check if slots are selected and form is valid
    if (bookingStore.selectedSlots.length === 0) {
      alert('Pasirinkite bent vieną laiko intervalą');
      return;
    }

    if (!isFormValid.value) {
      alert('Užpildykite visus privalomus laukus');
      return;
    }

    // Verify selected date exists
    if (!bookingStore.selectedDate) {
      alert('Pasirinkite datą');
      return;
    }

    const userInfo = {
      userId: auth.currentUser?.uid || null,
      name: name.value,
      email: email.value,
      phone: phone.value,
      wakeboardRental: bookingStore.wakeboardRental,
      wetsuitRental: bookingStore.wetsuitRental,
      totalPrice: bookingStore.totalPrice,
      isAnonymous: !auth.currentUser
    };

    const bookingId = await reserveTimeSlots(
      bookingStore.selectedDate, 
      bookingStore.selectedSlots,
      userInfo
    );

    // Only proceed if booking was successful
    if (bookingId) {
      // Clear form and selections
      name.value = '';
      email.value = '';
      phone.value = '';
      bookingStore.selectedSlots = [];
      bookingStore.wakeboardRental = 0;
      bookingStore.wetsuitRental = 0;

      // Refresh reserved slots
      await fetchReservedSlots(bookingStore.selectedDate);

      alert('Rezervacija sėkmingai atlikta!');
    }
    
  } catch (error) {
    console.error('Reservation failed:', error);
    alert('Nepavyko atlikti rezervacijos. Bandykite dar kartą.');
  }
};


const handlePayment = async () => {
  try {
    if (!isFormValid.value || bookingStore.selectedSlots.length === 0) {
      alert('Užpildykite visus privalomus laukus');
      return;
    }

    const bookingDetails = {
      date: bookingStore.selectedDate,
      timeInterval: bookingStore.selectedSlots,
      name: name.value,
      email: email.value,
      phone: phone.value,
      wakeboardRental: bookingStore.wakeboardRental,
      wetsuitRental: bookingStore.wetsuitRental
    };

    // Use hardcoded URL for demo/development
    const response = await fetch('http://localhost:4000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: bookingStore.totalPrice,
        bookingDetails: bookingDetails
      }),
      locale: 'lt'
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const { url } = await response.json();
    
    if (!url) {
      throw new Error('No checkout URL received');
    }
    
    // Redirect to Stripe Checkout
    window.location.href = url;
    
  } catch (error) {
    console.error('Payment error:', error);
    alert('Mokėjimo inicijavimas nepavyko. Bandykite dar kartą.');
  }
};

</script>