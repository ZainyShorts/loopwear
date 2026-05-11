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

    const locale = pathname.split('/')[1] ?? 'en'

    // ownerOnly pages (settings, users) are never accessible to sub-users
    const ownerOnlyMatch = SIDEBAR_FEATURES.find(feature => {
      if (!feature.ownerOnly) return false
      const base = feature.getHref(locale, '').replace(/\/$/, '')
      return pathname.startsWith(base)
    })
    if (ownerOnlyMatch) {
      router.replace(`/${locale}/home`)
      return
    }

    // Resolve their permissions: local store takes priority over the login payload
    const storedPermissions = getUserPermissions(user.id)
    const permissions: string[] | undefined = storedPermissions ?? (user as any).permissions

    // Undefined / empty / wildcard → full access, nothing to check
    if (!permissions || permissions.length === 0 || permissions.includes('*')) return

    // Only check permission for configurable features (not alwaysAllowed / ownerOnly)
    const matchedFeature = SIDEBAR_FEATURES.find(feature => {
      if (feature.alwaysAllowed || feature.ownerOnly) return false
      const base = feature.getHref(locale, '').replace(/\/$/, '')
      return pathname.startsWith(base)
    })

    // Path isn't a permission-controlled feature → allow
    if (!matchedFeature) return

    // Redirect if user lacks access
    if (!hasAccess(permissions, matchedFeature.key)) {
      router.replace(`/${locale}/home`)
    }
  }, [pathname, user, getUserPermissions])

  return <>{children}</>
}

export default PermissionGuard
