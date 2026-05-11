"use client"

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material"
import { CONFIGURABLE_FEATURES } from "@/libs/rbac/sidebarFeatures"
import { hasAccess } from "@/libs/rbac/hasAccess"

interface ManagedUser {
  id: number | string
  name: string
  email: string
  permissions?: string[]
}

interface Props {
  user: ManagedUser
  onUpdate: (userId: number | string, permissions: string[]) => void
}

const ALL_KEYS = CONFIGURABLE_FEATURES.map((f) => f.key)

const FEATURE_LABELS: Record<string, string> = Object.fromEntries(
  CONFIGURABLE_FEATURES.map((f) => [f.key, f.labelKey])
)

const PermissionManager = ({ user, onUpdate }: Props) => {
  const isWildcard = !user.permissions || user.permissions.includes("*")

  const toggleWildcard = () => {
    if (isWildcard) {
      // Switch to explicit full list so individual items can be toggled
      onUpdate(user.id, [...ALL_KEYS])
    } else {
      onUpdate(user.id, ["*"])
    }
  }

  const toggleFeature = (key: string) => {
    const current = isWildcard ? ALL_KEYS : (user.permissions ?? [])
    const next = current.includes(key)
      ? current.filter((k) => k !== key)
      : [...current, key]

    onUpdate(user.id, next)
  }

  const isChecked = (key: string) => hasAccess(user.permissions, key)

  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={isWildcard}
                  onChange={toggleWildcard}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2" color={isWildcard ? "primary" : "text.secondary"}>
                  Full Access
                </Typography>
              }
              labelPlacement="start"
            />
          </Stack>
        }
      />
      <Divider />
      <CardContent>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {CONFIGURABLE_FEATURES.map((feature) => (
            <FormControlLabel
              key={feature.key}
              control={
                <Checkbox
                  checked={isChecked(feature.key)}
                  onChange={() => toggleFeature(feature.key)}
                  disabled={isWildcard}
                  size="small"
                />
              }
              label={
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <i className={`${feature.icon} text-base`} />
                  <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                    {FEATURE_LABELS[feature.key]}
                  </Typography>
                </Stack>
              }
              sx={{ minWidth: 160 }}
            />
          ))}
        </Stack>
        {isWildcard && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
            Disable &quot;Full Access&quot; to assign individual features.
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default PermissionManager
