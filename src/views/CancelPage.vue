<template>
  <div class="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md text-center">
      <h2 class="text-2xl font-bold text-green-600 mb-4">Payment Cancelled</h2>
      <p class="text-gray-600 mb-6">Your reservation failed.</p>
      <router-link 
        to="/" 
        class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
      >
        Return Home
      </router-link>
    </div>
  </div>
</template>