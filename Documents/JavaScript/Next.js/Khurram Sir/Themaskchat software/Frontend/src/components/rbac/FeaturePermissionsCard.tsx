'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import toast from 'react-hot-toast'

import { CONFIGURABLE_FEATURES } from '@/libs/rbac/sidebarFeatures'
import { useUserPermissionsStore } from '@/libs/rbac/userPermissionsStore'
import { updateUser } from '@/api/user'

type Props = {
  userId: number
  userName: string
  /** Initial permissions from the backend (user.sidebar_permissions) */
  initialPermissions?: string[]
}

const FeaturePermissionsCard = ({ userId, userName, initialPermissions }: Props) => {
  const { getUserPermissions, setUserPermissions } = useUserPermissionsStore()

  // Priority: local store override → backend value → full access default
  const stored = getUserPermissions(userId) ?? initialPermissions
  const initialFullAccess = !stored || stored.length === 0 || stored.includes('*')
  const initialSelected = initialFullAccess
    ? CONFIGURABLE_FEATURES.map(f => f.key)
    : stored

  const [fullAccess, setFullAccess] = useState(initialFullAccess)
  const [selected, setSelected] = useState<string[]>(initialSelected)
  const [saving, setSaving] = useState(false)

  const toggleFeature = (key: string) => {
    setSelected(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  const handleSave = async () => {
    const permissions = fullAccess ? ['*'] : selected
    setSaving(true)
    try {
      // Persist to backend (updates sidebar_permissions column in DB)
      await updateUser(userId, { permissions } as any)
      // Also update local store so the sidebar refreshes immediately on this device
      setUserPermissions(userId, permissions)
      toast.success(`Permissions updated for ${userName}`)
    } catch {
      toast.error('Failed to save permissions. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <CardContent className='flex flex-col gap-4'>
        <div>
          <Typography variant='h5'>Feature Access</Typography>
          <Typography variant='body2' color='text.secondary' className='mt-1'>
            Control which sidebar features {userName} can access.
          </Typography>
        </div>

        <Divider />

        <FormControlLabel
          control={
            <Switch
              checked={fullAccess}
              onChange={e => setFullAccess(e.target.checked)}
              color='primary'
            />
          }
          label={<Typography fontWeight={600}>Full Access (all features)</Typography>}
        />

        {!fullAccess && (
          <Box className='flex flex-col gap-1 pl-2'>
            {CONFIGURABLE_FEATURES.map(feature => (
              <FormControlLabel
                key={feature.key}
                control={
                  <Switch
                    size='small'
                    checked={selected.includes(feature.key)}
                    onChange={() => toggleFeature(feature.key)}
                  />
                }
                label={
                  <Box className='flex items-center gap-2'>
                    <i className={`${feature.icon} text-lg text-textSecondary`} />
                    <Typography className='capitalize'>{feature.labelKey}</Typography>
                  </Box>
                }
              />
            ))}
          </Box>
        )}

        <Button
          variant='contained'
          onClick={handleSave}
          disabled={saving}
          className='is-fit mt-2'
          startIcon={saving ? <CircularProgress size={16} color='inherit' /> : null}
        >
          {saving ? 'Saving…' : 'Save Permissions'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default FeaturePermissionsCard
