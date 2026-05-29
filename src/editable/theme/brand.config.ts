import { siteIdentity } from '@/config/site.identity'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

const { recipe } = getFactoryState()
const productKind = getProductKind(recipe)
const envName = process.env.NEXT_PUBLIC_SITE_NAME || process.env.NEXT_PUBLIC_BRAND_NAME
const envTagline = process.env.NEXT_PUBLIC_SITE_TAGLINE || process.env.NEXT_PUBLIC_BRAND_TAGLINE
const envDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN
const envUrl = process.env.NEXT_PUBLIC_SITE_URL

export const slot4BrandConfig = {
  siteName: envName || siteIdentity.name,
  tagline: envTagline || siteIdentity.tagline,
  domain: envDomain || siteIdentity.domain,
  baseUrl: envUrl || siteIdentity.url,
  productKind,
  ogImage: siteIdentity.ogImage,
  accents:
    productKind === 'visual'
      ? { primary: '#8b00ff', surface: '#0b0b0e' }
      : productKind === 'editorial'
        ? { primary: '#8b00ff', surface: '#f7f7f4' }
        : productKind === 'directory'
          ? { primary: '#101010', surface: '#f5f5f2' }
          : { primary: '#8b00ff', surface: '#f6f6f2' },
} as const
