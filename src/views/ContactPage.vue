<template>
  <div class="min-h-screen bg-gray-50 pt-16">
    <div class="container mx-auto px-4 py-12">
      
      <!-- Contact Information -->
      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold mb-4">Kontaktai</h2>
          <div class="space-y-4">
            <div class="flex items-center">
              <svg class="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p class="font-medium">telefonas</p>
                <a href="tel:+370 684 60071" class="text-black hover:text-green-600">
                  +370 684 60071
                </a>
              </div>
            </div>
            
            <div class="flex items-center">
              <svg class="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p class="font-medium">el. paštas</p>
                <a href="mailto:info@wakeb1.lt" class="text-black hover:text-green-600">
                  info@wakeb1.lt
                </a>
              </div>
            </div>

            <div class="flex items-center">
              <svg class="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p class="font-medium">Adresas</p>
                <p class="text-gray-600">Užusaliai, tarp Kauno ir Jonavos.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Hours of Operation -->
        <div 
          class="rounded-lg shadow-md p-6" 
          style="background: radial-gradient(circle, rgba(114, 237, 76, 1) 0%, rgba(183, 233, 172, 1) 17%, rgba(233, 245, 233, 1) 55%, rgba(241, 249, 241, 0.97) 87%, rgba(255, 255, 255, 0.95) 100%)"
        >
          <h2 class="text-2xl font-semibold mb-4">Darbo valandos</h2>
          <div class="space-y-2">
            <p class="flex justify-between">
              <span class="font-medium">I - VII</span>
              <span>8:00 - 22:00</span>
            </p>
            <p class="flex justify-between">
              <span class="font-medium">Vaikų stovyklų laikas</span>
              <span>09:00 - 15:00</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Google Maps -->
      <div class="w-full h-96 rounded-lg overflow-hidden shadow-md">
        <iframe
          class="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18314.15414996895!2d24.156754011826155!3d54.98591277361225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e71055894ecf39%3A0xd925aff8d033de0!2sWake%20B1%20U%C5%BEusaliai!5e0!3m2!1slt!2slt!4v1747303335189!5m2!1slt!2slt"
          frameborder="0"
          style="border:0"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
</template>
