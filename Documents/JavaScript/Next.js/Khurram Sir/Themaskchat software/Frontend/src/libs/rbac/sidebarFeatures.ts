export interface SidebarFeature {
  key: string
  labelKey: string
  icon: string
  getHref: (locale: string, businessId?: string | null) => string
}

export const SIDEBAR_FEATURES: SidebarFeature[] = [
  {
    key: 'home',
    labelKey: 'home',
    icon: 'tabler-smart-home',
    getHref: (locale) => `/${locale}/home`,
  },
  {
    key: 'users',
    labelKey: 'users',
    icon: 'tabler-users',
    getHref: (locale) => `/${locale}/users`,
  },
  {
    key: 'menu',
    labelKey: 'menu',
    icon: 'tabler-list-search',
    getHref: (locale) => `/${locale}/menu`,
  },
  {
    key: 'speaker',
    labelKey: 'newsLetter',
    icon: 'tabler-volume',
    getHref: (locale) => `/${locale}/news-letter`,
  },
  {
    key: 'feedback',
    labelKey: 'feedBack',
    icon: 'tabler-message-dots',
    getHref: (locale) => `/${locale}/feedback`,
  },
  {
    key: 'inbox',
    labelKey: 'inbox',
    icon: 'tabler-lifebuoy',
    getHref: (locale, businessId) => `/${locale}/inbox/${businessId ?? ''}`,
  },
  {
    key: 'integration',
    labelKey: 'IntegrationsPage',
    icon: 'tabler-plug-connected',
    getHref: (locale) => `/${locale}/integration/`,
  },
  {
    key: 'chatbot',
    labelKey: 'chatbot',
    icon: 'tabler-robot',
    getHref: (locale) => `/${locale}/chatbot`,
  },
  {
    key: 'order-confirmation',
    labelKey: 'orderConfirmation',
    icon: 'tabler-shopping-cart',
    getHref: (locale) => `/${locale}/activity`,
  },
  {
    key: 'notification',
    labelKey: 'notification',
    icon: 'tabler-bell',
    getHref: (locale) => `/${locale}/notifications`,
  },
  {
    key: 'settings',
    labelKey: 'settings',
    icon: 'tabler-settings',
    getHref: (locale) => `/${locale}/account-settings`,
  },
]
