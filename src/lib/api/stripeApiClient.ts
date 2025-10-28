import ky from 'ky'

export const stripeApiClient = ky.create({
  prefixUrl: `${import.meta.env.PUBLIC_ONESM_STRIPE_PRICING_FORM_API_URL}/`,
})
