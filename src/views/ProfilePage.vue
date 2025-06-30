<template>
  <div class="flex min-h-screen bg-gray-50 pt-16">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-lg">
      <nav class="mt-8">
        <div class="space-y-1">
          <button 
            @click="activeTab = 'profile'"
            :class="[
              'w-full px-4 py-2 text-left',
              activeTab === 'profile' 
                ? 'bg-green-50 text-green-600 border-l-4 border-green-600' 
                : 'text-gray-600 hover:bg-gray-50'
            ]"
          >
            Profilis
          </button>
          <button 
            @click="activeTab = 'reservations'"
            :class="[
              'w-full px-4 py-2 text-left',
              activeTab === 'reservations' 
                ? 'bg-green-50 text-green-600 border-l-4 border-green-600' 
                : 'text-gray-600 hover:bg-gray-50'
            ]"
          >
            Rezervacijos
          </button>
        </div>
        <div class="px-4 mt-8">
          <button 
            @click="handleLogout" 
            class="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
          >
            Atsijungti
          </button>
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-8">
      <!-- Profile Tab -->
      <!-- Replace the existing profile tab content -->
      <div v-if="activeTab === 'profile'" class="max-w-2xl">
        <div class="bg-white shadow rounded-lg p-6">
          <div class="space-y-6">
            <div v-if="!isEditing" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">Vardas</label>
                <div class="mt-1 text-gray-900">{{ userProfile.name }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">El. Paštas</label>
                <div class="mt-1 text-gray-900">{{ userProfile.email }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Telefonas</label>
                <div class="mt-1 text-gray-900">{{ userProfile.phone }}</div>
              </div>
              <button 
                @click="startEditing"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Keisti
              </button>
            </div>

            <form v-else @submit.prevent="saveChanges" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">Vardas</label>
                <input
                  v-model="editForm.name"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <!-- Show email as read-only during edit -->
              <div>
                <label class="block text-sm font-medium text-gray-700">El. Paštas</label>
                <div class="mt-1 text-gray-900">{{ userProfile.email }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Telefonas</label>
                <input
                  v-model="editForm.phone"
                  type="tel"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div class="flex space-x-4">
                <button 
                  type="submit"
                  class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Išsaugoti
                </button>
                <button 
                  type="button"
                  @click="cancelEditing"
                  class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Atšaukti
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Reservations Tab -->
      <!-- Reservations Tab -->
      <div v-if="activeTab === 'reservations'" class="max-w-4xl">
        <div v-if="reservations.length" class="space-y-4">
          <div v-for="booking in reservations" 
              :key="booking.id" 
              class="bg-white shadow rounded-lg p-6"
          >
            <div class="flex justify-between items-start">
              <div class="space-y-2">
                <div class="text-lg font-medium">Rezervacija {{ booking.date }}</div>
                <div class="text-gray-600">
                  <div>Laiko intervalai:</div>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="slot in booking.timeInterval" 
                          :key="slot"
                          class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
                    >
                      {{ slot }}
                    </span>
                  </div>
                </div>
                <div class="text-gray-600">
                  <div>Įranga:</div>
                  <div>Wakeboard: {{ booking.wakeboardRental }}</div>
                  <div>Wetsuit: {{ booking.wetsuitRental }}</div>
                </div>
                <div class="font-medium">
                  Viso kaina: {{ booking.totalPrice }} €
                </div>
              </div>
              <button 
                @click="deleteBooking(booking.id, booking.date, booking.timeInterval)"
                class="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                Ištrinti
              </button>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-500 text-center py-8">
          Rezervacijų nerasta
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
//import { useBookingStore } from '@/stores/booking'
import { getAuth, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebaseConfig'
import { updateDoc, deleteDoc, arrayRemove } from 'firebase/firestore'

const router = useRouter()
//const bookingStore = useBookingStore()
const activeTab = ref('profile')
const auth = getAuth()
const loading = ref(true)
const error = ref(null)
const userProfile = ref({
  name: '',
  email: '',
  phone: ''
})

// Add these after other ref declarations
const isEditing = ref(false)
const editForm = ref({
  name: '',
  email: '',
  phone: ''
})

const reservations = ref([])

const fetchUserProfile = async () => {
  const user = auth.currentUser
  if (!user) return

  try {
    loading.value = true
    error.value = null
    
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (userDoc.exists()) {
      userProfile.value = userDoc.data()
    } else {
      error.value = 'User profile not found'
    }
  } catch (err) {
    console.error('Error fetching user profile:', err)
    error.value = 'Failed to load profile data'
  } finally {
    loading.value = false
  }
}

const startEditing = () => {
  editForm.value = { ...userProfile.value }
  isEditing.value = true
}

const cancelEditing = () => {
  isEditing.value = false
  editForm.value = { ...userProfile.value }
}

const saveChanges = async () => {
  try {
    const user = auth.currentUser
    if (!user) return

    await updateDoc(doc(db, 'users', user.uid), {
      name: editForm.value.name,
      phone: editForm.value.phone
    })

    // Update local profile without changing email
    userProfile.value = {
      ...userProfile.value,
      name: editForm.value.name,
      phone: editForm.value.phone
    }
    isEditing.value = false
    alert('Profilis atnaujintas sėkmingai')
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Nepavyko atnaujinti profilio')
  }
}

const handleLogout = async () => {
  try {
    await signOut(auth)
    router.push('/')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}


const fetchUserReservations = async () => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    loading.value = true;
    error.value = null;
 
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const bookingIds = userDoc.data()?.bookings || [];
    
    // Fetch and filter valid booking documents
    const bookingsData = (await Promise.all(
      bookingIds.map(async (bookingId) => {
        const bookingDoc = await getDoc(doc(db, 'bookings', bookingId));
            
        if (!bookingDoc.exists()) return null;
        
        const data = bookingDoc.data();
        // Only return bookings that have required fields
        if (!data.date || !data.timeInterval) return null;
        
        return {
          id: bookingDoc.id,
          ...data
        };
      })
    )).filter(booking => booking !== null); // Remove null entries
    

    reservations.value = bookingsData;
  } catch (err) {
    console.error('Error fetching reservations:', err);
    error.value = 'Failed to load reservations';
  } finally {
    loading.value = false;
  }
};

const deleteBooking = async (bookingId, date, slots) => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    // Delete the booking document
    await deleteDoc(doc(db, 'bookings', bookingId));

    // Remove booking ID from user's bookings array
    await updateDoc(doc(db, 'users', user.uid), {
      bookings: arrayRemove(bookingId)
    });

    // Update reservations document to remove these slots
    const reservationRef = doc(db, 'reservations', date);
    const reservationDoc = await getDoc(reservationRef);
    
    if (reservationDoc.exists()) {
      const currentSlots = reservationDoc.data().timeInterval || [];
      const updatedSlots = currentSlots.filter(slot => !slots.includes(slot));
      
      if (updatedSlots.length === 0) {
        // If no slots left, delete the whole reservation document
        await deleteDoc(reservationRef);
      } else {
        // Update with remaining slots
        await updateDoc(reservationRef, {
          timeInterval: updatedSlots
        });
      }
    }

    // Refresh the reservations list
    await fetchUserReservations();

  } catch (error) {
    console.error('Error deleting booking:', error);
    alert('Nepavyko ištrinti rezervacijos');
  }
};


onMounted(async () => {
  await fetchUserProfile()
  await fetchUserReservations()
})
</script>