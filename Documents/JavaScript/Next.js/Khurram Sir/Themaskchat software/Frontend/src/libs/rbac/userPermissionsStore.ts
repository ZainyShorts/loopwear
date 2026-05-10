import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserPermissionsState {
  permissionMap: Record<number, string[]>
  setUserPermissions: (userId: number, permissions: string[]) => void
  getUserPermissions: (userId: number) => string[] | undefined
}

export const useUserPermissionsStore = create<UserPermissionsState>()(
  persist(
    (set, get) => ({
      permissionMap: {},
      setUserPermissions: (userId, permissions) =>
        set(state => ({
          permissionMap: { ...state.permissionMap, [userId]: permissions },
        })),
      getUserPermissions: (userId) => get().permissionMap[userId],
    }),
    {
      name: 'user-permissions-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
