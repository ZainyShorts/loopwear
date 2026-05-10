"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from 'react'
import { useTheme } from "@mui/material/styles"
import PerfectScrollbar from "react-perfect-scrollbar"
import type { getDictionary } from "@/utils/getDictionary"
import type { VerticalMenuContextProps } from "@menu/components/vertical-menu/Menu"
import { Menu, MenuItem, MenuSection } from "@menu/vertical-menu"
import { useSettings } from "@core/hooks/useSettings"
import useVerticalNav from "@menu/hooks/useVerticalNav"
import StyledVerticalNavExpandIcon from "@menu/styles/vertical/StyledVerticalNavExpandIcon"
import menuItemStyles from "@core/styles/vertical/menuItemStyles"
import menuSectionStyles from "@core/styles/vertical/menuSectionStyles"
import { useAuthStore } from "@/store/authStore"
import { getAllBusiness } from "@/api/business"
import { SIDEBAR_FEATURES } from "@/libs/rbac/sidebarFeatures"
import { hasAccess } from "@/libs/rbac/hasAccess"
import { useUserPermissionsStore } from "@/libs/rbac/userPermissionsStore"

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps["transitionDuration"]
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className="tabler-chevron-right" />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  const { user } = useAuthStore()
  const getUserPermissions = useUserPermissionsStore(state => state.getUserPermissions)
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { settings } = useSettings()
  const params = useParams()
  const { isBreakpointReached } = useVerticalNav()

  const { transitionDuration } = verticalNavOptions
  const { lang: locale } = params
  const ScrollWrapper = isBreakpointReached ? "div" : PerfectScrollbar

  const [businessItemData, setSelectBusinessID] = useState<string | null>(null)

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await getAllBusiness()

        setSelectBusinessID(response?.data?.results[0].business_id || null)
      } catch {
        // business id unavailable, inbox link will use empty string
      }
    }

    fetchBusiness()
  }, [])

  if (!user) return null

  const isOwner = Number(user.user_type) === 1
  const storedPermissions = getUserPermissions(user.id)
  const effectivePermissions: string[] | undefined = isOwner
    ? ['*']
    : (storedPermissions ?? user.permissions)

  const nav = dictionary['navigation'] as Record<string, string>

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: "bs-full overflow-y-auto overflow-x-hidden",
            onScroll: (container: any) => scrollMenu(container, false),
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: (container: any) => scrollMenu(container, true),
          })}
    >
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className="tabler-circle text-xs" /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuSection label="">
          {SIDEBAR_FEATURES.map((feature) => {
            if (!hasAccess(effectivePermissions, feature.key)) return null

            return (
              <MenuItem
                key={feature.key}
                href={feature.getHref(locale as string, businessItemData)}
                icon={<i className={feature.icon} />}
              >
                {nav[feature.labelKey] ?? feature.labelKey}
              </MenuItem>
            )
          })}
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
