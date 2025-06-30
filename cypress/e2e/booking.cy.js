describe('Booking Page', () => {
  beforeEach(() => {
    // Visit booking page before each test
    cy.visit('/booking')
    
    // Stub API responses
    cy.intercept('GET', '/api/reservations/*', {
      fixture: 'reservations.json'
    }).as('getReservations')
  })

  it('should allow date selection', () => {
    // Open datepicker
    cy.get('[data-test="date-picker"]').click()
    
    // Select first available date
    cy.get('.dp__day_selectable').first().click()
    
    // Verify date is selected and format is correct
    cy.get('[data-test="date-picker"]')
      .should('not.be.empty')
      .invoke('val')
      .should('match', /^\d{4}-\d{2}-\d{2}$/)
  })

  it('should allow time slot selection', () => {
    // Select date first
    cy.get('[data-test="date-picker"]').click()
    cy.get('.dp__day_selectable').first().click()
    
    // Wait for slots to load
    cy.wait('@getReservations')
    
    // Select a time slot
    cy.get('[data-test="time-slot"]').first().click()
    
    // Verify slot is selected
    cy.get('[data-test="time-slot"].selected').should('exist')
    
    // Verify multiple slots can be selected
    cy.get('[data-test="time-slot"]').eq(1).click()
    cy.get('[data-test="time-slot"].selected').should('have.length', 2)
  })

  it('should calculate correct price with rentals', () => {
    // Select time slot first
    cy.get('[data-test="date-picker"]').click()
    cy.get('.dp__day_selectable').first().click()
    cy.get('[data-test="time-slot"]').first().click()
    
    // Base price should be visible
    cy.get('[data-test="total-price"]').should('contain', '18')
    
    // Add rentals
    cy.get('[data-test="wakeboard-rental"]').type('1')
    cy.get('[data-test="wetsuit-rental"]').type('1')

    // Verify final price (18 + 5 + 5 = 28)
    cy.get('[data-test="total-price"]').should('contain', '28')
  })

  it('should validate form fields', () => {
    // Try to book without filling required fields
    cy.get('[data-test="book-button"]').click()
    
    // Check error messages
    cy.get('[data-test="name-error"]').should('be.visible')
    cy.get('[data-test="email-error"]').should('be.visible')
    cy.get('[data-test="phone-error"]').should('be.visible')
    
    // Fill in fields
    cy.get('[data-test="name-input"]').type('Test User')
    cy.get('[data-test="email-input"]').type('test@example.com')
    cy.get('[data-test="phone-input"]').type('+37061234567')
    
    // Error messages should disappear
    cy.get('[data-test="name-error"]').should('not.exist')
    cy.get('[data-test="email-error"]').should('not.exist')
    cy.get('[data-test="phone-error"]').should('not.exist')
  })

  it('should allow anonymous booking', () => {
    // Fill in required fields
    cy.get('[data-test="date-picker"]').click()
    cy.get('.dp__day_selectable').first().click()
    cy.get('[data-test="time-slot"]').first().click()
    cy.get('[data-test="name-input"]').type('Test User')
    cy.get('[data-test="email-input"]').type('test@example.com')
    cy.get('[data-test="phone-input"]').type('+37061234567')
    
    // Proceed to payment
    cy.get('[data-test="book-button"]').click()
    
    // Should redirect to Stripe
    cy.url().should('include', 'checkout.stripe.com')
  })
})