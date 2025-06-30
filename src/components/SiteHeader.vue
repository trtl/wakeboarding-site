<template>
  
    <header class="w-full fixed top-0 left-0 z-50 glass-header">
      <div class="relative flex items-center justify-center px-4 py-3 h-16">
        <!-- Logo (top-left, larger) -->
        <router-link to="/" class="absolute left-4 top-1/2 transform -translate-y-1/2">
          <img src="@/assets/logo.svg" alt="WakeB1 Logo" class="h-14 w-auto" />
        </router-link>

        
        <!-- Toggle Menu Button (top-right corner) -->
        <button 
          @click="toggleMenu" 
          class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700 hover:bg-gray-300 rounded-md p-2 transition-colors duration-200 focus:outline-none"
        >
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      
    </header>
  
    <!-- Sidebar Menu -->
  <div 
    v-if="isMenuOpen"
    class="fixed top-0 right-0 h-full w-50 sidebar-gradient shadow-lg transform transition-transform duration-300 ease-in-out z-50"
    :class="{ 'translate-x-0': isMenuOpen, 'translate-x-full': !isMenuOpen }"
  >
    <div class="p-6">
      <!-- Close Button -->
      <button @click="toggleMenu" class="absolute top-4 right-4 focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Menu Items -->
      <nav class="mt-12 space-y-6">
        <!-- Booking Section -->
        <router-link 
          to="/booking" 
          class="block font-bold text-red-600 hover:text-red-700 transform hover:translate-x-2 transition-transform duration-200 text-lg"
          @click="toggleMenu"
        >
          Rezervacija
        </router-link>

        <!-- Other Menu Items -->
        <div class="space-y-4">
          <a 
            class="block text-gray-700 hover:text-gray-900 transform hover:translate-x-2 transition-transform duration-200"
            @click="scrollToSection('prices');"
          >
            Kainos
          </a>
          <a 
            class="block text-gray-700 hover:text-gray-900 transform hover:translate-x-2 transition-transform duration-200"
            @click="scrollToSection('camps');"
          >
            Vaikų Stovyklos
          </a>
          <a 
            class="block text-gray-700 hover:text-gray-900 transform hover:translate-x-2 transition-transform duration-200"
            @click="scrollToSection('gift-cards');"
          >
            Dovanų Kuponai
          </a>
          <router-link 
            to="/contacts" 
            class="block text-gray-700 hover:text-gray-900 transform hover:translate-x-2 transition-transform duration-200"
            @click="toggleMenu"
          >
            Kontaktai
          </router-link>
        </div>
        <div class="border-t border-gray-200 my-4"></div>
        <!-- Login/Profile Section -->
        <div v-if="isAuthenticated" class="flex items-center space-x-2 cursor-pointer" @click="router.push('/profile')">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="text-gray-700 hover:text-gray-900">Profilis</span>
        </div>
        <div v-else class="flex items-center space-x-2 cursor-pointer" @click="showLoginForm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="text-gray-700 hover:text-gray-900">Prisijungti</span>
        </div>
         <!-- Divider -->
        <div class="border-t border-gray-200 my-6"></div>

        <!-- Weather Data -->
        <div class="py-4">
          <WheatherData />
        </div>
      </nav>
    </div>
  </div>

  <!-- Login/Signup Modal -->
  <LoginForm v-if="isLoginFormVisible" @close="isLoginFormVisible = false" />
</template>
  
  <script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import WheatherData from './WheatherData.vue'
import LoginForm from './LoginForm.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = useRouter()
const isMenuOpen = ref(false)
const isLoginFormVisible = ref(false)
const auth = getAuth()
const isAuthenticated = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : 'auto'
}

const scrollToSection = (sectionId) => {
  toggleMenu()
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
    // Wait for navigation and DOM update to complete
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }, 300) // Increased timeout to ensure DOM is ready
  } else {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}
const showLoginForm = () => {
  isLoginFormVisible.value = true
  toggleMenu()
}

// Watch auth state changes
onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user
  })

  // Cleanup subscription on component unmount
  onUnmounted(() => unsubscribe())
})
  </script>
  
  <style scoped>
.sidebar-gradient {
  background: #7be05c;
  background: linear-gradient(221deg,rgba(114, 237, 76, 1) 0%, rgba(183, 233, 172, 1) 17%, rgba(233, 245, 233, 1) 55%, rgba(241, 249, 241, 0.97) 87%, rgba(255, 255, 255, 0.95) 100%);
}
.glass-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}


/* Optional: Add transition for smooth color changes */
:deep(*) {
  transition: color 1s ease;
}

  [v-cloak] {
    display: none;
  }
  </style>
  