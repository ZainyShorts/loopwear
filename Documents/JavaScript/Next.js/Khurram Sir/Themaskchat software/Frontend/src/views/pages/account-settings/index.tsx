"use client"

import { useState, useEffect } from "react"
import type { SyntheticEvent, ReactElement } from "react"

import Grid from "@mui/material/Grid"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabPanel from "@mui/lab/TabPanel"

import CustomTabList from "@core/components/mui/TabList"
import { useAuthStore } from "@/store/authStore"

const AccountSettings = ({ tabContentList }: { tabContentList: { [key: string]: ReactElement } }) => {
  const { user } = useAuthStore()

  const isSubUser = !!user?.businessownerId
  const userType = Number(user?.user_type)

  // Owners need an active subscription to access most tabs; sub-users are always enabled
  const hasSubscription = isSubUser || user?.subscription !== false

  const [activeTab, setActiveTab] = useState("account")

  // Reset to account tab if switching users
  useEffect(() => {
    setActiveTab("account")
  }, [user?.id])

  const handleChange = (_: SyntheticEvent, value: string) => {
    if (hasSubscription || value === "billing-plans") {
      setActiveTab(value)
    }
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomTabList onChange={handleChange} variant="scrollable" pill="true">

            {/* Account — visible to all */}
            <Tab
              label={
                <div className="flex items-center gap-1.5">
                  <i className="tabler-user-circle text-lg" />
                  Account
                </div>
              }
              value="account"
            />

            {/* Billing & Plans — owners only, not sub-users */}
            {userType === 1 && !isSubUser && (
              <Tab
                label={
                  <div className="flex items-center gap-1.5">
                    <i className="tabler-bookmark text-lg" />
                    Billing & Plans
                  </div>
                }
                value="billing-plans"
              />
            )}

            {/* Platforms — owners only */}
            {!isSubUser && userType !== 2 && (
              <Tab
                label={
                  <div className="flex items-center gap-1.5">
                    <i className="tabler-plug-connected text-lg" />
                    Platforms
                  </div>
                }
                value="connections"
                disabled={!hasSubscription}
                sx={{
                  opacity: !hasSubscription ? 0.5 : 1,
                  cursor: !hasSubscription ? "not-allowed" : "pointer",
                  "&.Mui-disabled": { color: "text.disabled" },
                }}
              />
            )}

            {/* Business — owners only */}
            {!isSubUser && userType !== 2 && (
              <Tab
                label={
                  <div className="flex items-center gap-1.5">
                    <i className="tabler-building-store text-lg" />
                    Business
                  </div>
                }
                value="business"
                disabled={!hasSubscription}
                sx={{
                  opacity: !hasSubscription ? 0.5 : 1,
                  cursor: !hasSubscription ? "not-allowed" : "pointer",
                  "&.Mui-disabled": { color: "text.disabled" },
                }}
              />
            )}

            {/* Outlets — owners only */}
            {!isSubUser && userType !== 2 && (
              <Tab
                label={
                  <div className="flex items-center gap-1.5">
                    <i className="tabler-map-pin text-lg" />
                    Outlets
                  </div>
                }
                value="outlets"
                disabled={!hasSubscription}
                sx={{
                  opacity: !hasSubscription ? 0.5 : 1,
                  cursor: !hasSubscription ? "not-allowed" : "pointer",
                  "&.Mui-disabled": { color: "text.disabled" },
                }}
              />
            )}

          </CustomTabList>

          {/* Upgrade notice — owners without subscription only */}
          {!hasSubscription && !isSubUser && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 text-orange-700">
                <i className="tabler-info-circle text-lg" />
                <span className="text-sm font-medium">Upgrade your subscription to access all account settings</span>
              </div>
            </div>
          )}
        </Grid>

        <Grid item xs={12}>
          <TabPanel value={activeTab} className="p-0">
            {tabContentList[activeTab]}
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  )
}

export default AccountSettings
