// frontend/tests/pages/signup.test.ts
import { mount } from '@vue/test-utils'
import Signup from '~/pages/signup.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuth } from '@sidebase/nuxt-auth'

describe('Signup Page', () => {
  it('renders correctly', () => {
    const wrapper = mount(Signup, {
      global: {
        plugins: [createTestingPinia()],
      },
    })
    expect(wrapper.text()).toContain('Sign Up')
  })

  it('validates form inputs', async () => {
    const wrapper = mount(Signup, {
      global: {
        plugins: [createTestingPinia()],
      },
    })

    // Attempt to submit the form without filling in the fields
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Name is required')
    expect(wrapper.text()).toContain('Email is required')
    expect(wrapper.text()).toContain('Password is required')
  })

  // Add more tests as needed
})
