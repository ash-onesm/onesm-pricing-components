import { defineCustomElement } from 'vue'
import PricingFormAdmissions from '@/components/Pricing/PricingFormAdmissions.vue'
import PricingFormBootcamp from '@/components/Pricing/PricingFormBootcamp.vue'
import PricingFormBuildYourOwn from '@/components/Pricing/PricingFormBuildYourOwn.vue'
import PricingFormComprehensiveCourse from '@/components/Pricing/PricingFormComprehensiveCourse.vue'
import PricingFormPlainHours from '@/components/Pricing/PricingFormPlainHours.vue'
import tailwind from '@/styles/global.css?inline'

const stylesheet = new CSSStyleSheet()
stylesheet.replaceSync(tailwind)
stylesheet.insertRule(`
:host {
  --font-lexend: 'Lexend', sans-serif;
  --font-secondary: 'DM Sans', sans-serif;
  display: block;
}
`)

// Find the first @layer rule that contains a @supports rule
// and report the index of that top‑level rule in the stylesheet
// while also returning the css-stylesheet-text of the innermost rule.
function fetchCSSInitializerStyles() {
  for (let i = 0; i < stylesheet.cssRules.length; i++) {
    const cssLayerRule = stylesheet.cssRules[i]

    if (cssLayerRule instanceof CSSLayerBlockRule) {
      for (const cssSupportsRule of cssLayerRule.cssRules) {
        if (cssSupportsRule instanceof CSSSupportsRule) {
          return {
            topLevelRuleIdx: i,
            cssText: `@layer properties { ${cssSupportsRule.cssRules[0]!.cssText} }`,
          }
        }
      }
    }
  }
  return null
}

// Apply the necessary initializer rules without the wrapping @support rule
const result = fetchCSSInitializerStyles()
if (result) {
  const { topLevelRuleIdx, cssText } = result

  stylesheet.deleteRule(topLevelRuleIdx)
  stylesheet.insertRule(cssText)
}

// Extend a custom element on top of the custom element returned by defineCustomElement
// in order to add the constructed stylesheet into the shadow dom
export class BootcampPricingForm extends defineCustomElement(PricingFormBootcamp) {
  constructor() {
    super()
    this.shadowRoot!.adoptedStyleSheets = [stylesheet]
  }
}
export class ComprehensiveCoursePricingForm extends defineCustomElement(PricingFormComprehensiveCourse) {
  constructor() {
    super()
    this.shadowRoot!.adoptedStyleSheets = [stylesheet]
  }
}

export class PlainHoursPricingForm extends defineCustomElement(PricingFormPlainHours) {
  constructor() {
    super()
    this.shadowRoot!.adoptedStyleSheets = [stylesheet]
  }
}

export class BuildYourOwnPricingForm extends defineCustomElement(PricingFormBuildYourOwn) {
  constructor() {
    super()
    this.shadowRoot!.adoptedStyleSheets = [stylesheet]
  }
}

export class AdmissionsPricingForm extends defineCustomElement(PricingFormAdmissions) {
  constructor() {
    super()
    this.shadowRoot!.adoptedStyleSheets = [stylesheet]
  }
}

export function register() {
  console.log('Web component registering...')
  window.customElements.define('bootcamp-pricing-form', BootcampPricingForm)
  window.customElements.define('comprehensive-course-pricing-form', ComprehensiveCoursePricingForm)
  window.customElements.define('plain-hours-pricing-form', PlainHoursPricingForm)
  window.customElements.define('build-your-own-pricing-form', BuildYourOwnPricingForm)
  window.customElements.define('admissions-pricing-form', AdmissionsPricingForm)
  console.log('Web component registered')
}
