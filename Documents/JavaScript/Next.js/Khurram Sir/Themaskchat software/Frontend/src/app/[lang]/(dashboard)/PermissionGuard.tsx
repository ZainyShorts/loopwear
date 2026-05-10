'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { useAuthStore } from '@/store/authStore'
import { useUserPermissionsStore } from '@/libs/rbac/userPermissionsStore'
import { SIDEBAR_FEATURES } from '@/libs/rbac/sidebarFeatures'
import { hasAccess } from '@/libs/rbac/hasAccess'

interface Props {
  children: React.ReactNode
}

const PermissionGuard = ({ children }: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuthStore()
  const { getUserPermissions } = useUserPermissionsStore()

  useEffect(() => {
    // Only applies to sub-users (those created by a business owner)
    if (!user || !user.businessownerId) return

    // Resolve their permissions: local store takes priority over the login payload
    const storedPermissions = getUserPermissions(user.id)
    const permissions: string[] | undefined = storedPermissions ?? (user as any).permissions

    // Undefined / empty / wildcard → full access, nothing to check
    if (!permissions || permissions.length === 0 || permissions.includes('*')) return

    // Extract locale segment from pathname: /en/menu → "en"
    const locale = pathname.split('/')[1] ?? 'en'

    // Match the current path to a SIDEBAR_FEATURES entry.
    // We build a base path from getHref and check startsWith so that
    // sub-routes (e.g. /en/users/42) are covered by their parent feature.
    const matchedFeature = SIDEBAR_FEATURES.find(feature => {
      // Strip trailing slash and any dynamic tail (inbox has /${businessId})
      const base = feature
        .getHref(locale, '')           // pass empty string for businessId
        .replace(/\/$/, '')            // strip trailing slash
      return pathname.startsWith(base)
    })

    // Path doesn't correspond to any sidebar feature → allow (e.g. profile pages)
    if (!matchedFeature) return

    // If the user lacks permission for this feature → send to login
    if (!hasAccess(permissions, matchedFeature.key)) {
      router.replace(`/${locale}/login`)
    }
  }, [pathname, user, getUserPermissions])

  return <>{children}</>
}

export default PermissionGuard
