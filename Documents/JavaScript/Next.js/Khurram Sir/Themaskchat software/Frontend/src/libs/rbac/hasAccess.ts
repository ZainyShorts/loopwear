/**
 * Returns true if the given permissions array grants access to featureKey.
 * A wildcard "*" in permissions means full access to all features.
 * If permissions is undefined (legacy users), full access is assumed.
 */
export function hasAccess(permissions: string[] | undefined, featureKey: string): boolean {
  if (!permissions || permissions.includes('*')) return true

  return permissions.includes(featureKey)
}
