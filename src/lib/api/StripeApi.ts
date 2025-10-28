import type { PaymentOption } from '@/lib/model/PaymentOption.ts'
import type PricingConfiguration from '@/lib/model/PricingConfiguration.ts'
import { stripeApiClient } from '@/lib/api/stripeApiClient.ts'

class StripeApi {
  async getPaymentLink(pricingConfig: PricingConfiguration, installments: PaymentOption): Promise<{
    body: {
      paymentLinkUrl: string | null
    }
  }> {
    return await stripeApiClient.post<{
      pricingConfig: PricingConfiguration
      installments: PaymentOption
    }>('payment-link', { json: { pricingConfig, installments } }).json()
  }
}

export default new StripeApi()
