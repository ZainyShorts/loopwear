'use client'

import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import toast from 'react-hot-toast'

import DialogCloseButton from '../DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'
import { User } from '@/api/interface/userInterface'
import { getUserTypes, updateUser } from '@/api/user'
import { SIDEBAR_FEATURES } from '@/libs/rbac/sidebarFeatures'
import { useUserPermissionsStore } from '@/libs/rbac/userPermissionsStore'

type UserRole = { id: number; type: string }

type EditUserInfoProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: any
  onTypeAdded?: any
}

const EditUserInfo = ({ open, setOpen, data, onTypeAdded }: EditUserInfoProps) => {
  const { getUserPermissions, setUserPermissions } = useUserPermissionsStore()
  const { register, handleSubmit, control, formState: { errors } } = useForm<User>({
    defaultValues: {
      name: data?.name || '',
      first_name: data?.first_name || '',
      last_name: data?.last_name || '',
      email: data?.email || '',
      mobile: data?.mobile || '',
      country: data?.country || '',
      city: data?.city || '',
      address: data?.address || '',
      postalCode: data?.postalCode || '',
      user_type: data?.user_type,
      status: data?.status || 'Active',
    }
  })

  const [userTypes, setUserTypes] = useState<UserRole[]>([])
  const [loading, setLoading] = useState(false)

  // Permissions priority: local store (set on create) → backend field → empty (=full access)
  const storedPermissions = data?.id ? getUserPermissions(data.id) : undefined
  const rawPermissions: string[] = storedPermissions ?? data?.permissions ?? data?.sidebar_permissions ?? []
  const initFullAccess = rawPermissions.length === 0 || rawPermissions.includes('*')
  const [fullAccess, setFullAccess] = useState(initFullAccess)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    initFullAccess ? SIDEBAR_FEATURES.map(f => f.key) : rawPermissions
  )

  const toggleFeature = (key: string) => {
    setSelectedFeatures(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  useEffect(() => {
    const fetchUserTypes = async () => {
      try {
        const response = await getUserTypes()
        const all: UserRole[] = response?.data || []
        setUserTypes(all.filter(t => !['superadmin', 'admin', 'businessowner'].includes(t.type.toLowerCase())))
      } catch {
        // silently ignore
      }
    }
    fetchUserTypes()
  }, [])

  const handleClose = () => setOpen(false)

  const onSubmit = async (formData: User) => {
    setLoading(true)
    const id = data?.id ?? 0
    const permissions = fullAccess ? ['*'] : selectedFeatures
    try {
      await updateUser(id, { ...formData, permissions } as any)
      // Also update local permissions store so sidebar refreshes immediately
      setUserPermissions(id, permissions)
      toast.success('User updated successfully')
      onTypeAdded?.()
      setOpen(false)
    } catch {
      toast.error('Failed to update user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog fullWidth open={open} maxWidth='md' scroll='body' sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Edit User Information
        <Typography component='span' className='flex flex-col text-center'>
          Update the user's details, role and feature access.
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>

            {/* ── Basic info ── */}
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label='Company Name' defaultValue={data?.name || ''} {...register('name')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth label='First Name'
                defaultValue={data?.first_name || ''}
                {...register('first_name', { required: 'First name is required' })}
                error={!!errors.first_name} helperText={errors.first_name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth label='Last Name'
                defaultValue={data?.last_name || ''}
                {...register('last_name', { required: 'Last name is required' })}
                error={!!errors.last_name} helperText={errors.last_name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth label='Email'
                defaultValue={data?.email || ''}
                {...register('email', { required: 'Email is required' })}
                error={!!errors.email} helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label='Mobile' defaultValue={data?.mobile || ''} {...register('mobile')} />
            </Grid>

            {/* ── Role ── */}
            <Grid item xs={12} sm={6}>
              <Controller
                name='user_type'
                control={control}
                defaultValue={data?.user_type}
                render={({ field }) => (
                  <CustomTextField select fullWidth label='User Role' {...field} value={field.value ?? ''}>
                    {userTypes.map(role => (
                      <MenuItem key={role.id} value={role.id}>{role.type}</MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* ── Status ── */}
            <Grid item xs={12} sm={6}>
              <Controller
                name='status'
                control={control}
                defaultValue={data?.status || 'Active'}
                render={({ field }) => (
                  <CustomTextField select fullWidth label='Status' {...field} value={field.value ?? 'Active'}>
                    <MenuItem value='Active'>Active</MenuItem>
                    <MenuItem value='Inactive'>Inactive</MenuItem>
                    <MenuItem value='Pending'>Pending</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label='Country' defaultValue={data?.country || ''} {...register('country')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label='City' defaultValue={data?.city || ''} {...register('city')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label='Address' defaultValue={data?.address || ''} {...register('address')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label='Postal Code' defaultValue={data?.postalCode || ''} {...register('postalCode')} />
            </Grid>

            {/* ── Feature Access ── */}
            <Grid item xs={12}>
              <Divider className='mb-3' />
              <Typography variant='h6' className='mb-3'>Feature Access</Typography>

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
                <Box className='grid grid-cols-2 sm:grid-cols-3 gap-1 mt-2 pl-2'>
                  {SIDEBAR_FEATURES.map(feature => (
                    <FormControlLabel
                      key={feature.key}
                      control={
                        <Switch
                          size='small'
                          checked={selectedFeatures.includes(feature.key)}
                          onChange={() => toggleFeature(feature.key)}
                        />
                      }
                      label={
                        <Box className='flex items-center gap-1'>
                          <i className={`${feature.icon} text-base text-textSecondary`} />
                          <Typography variant='body2' className='capitalize'>{feature.labelKey}</Typography>
                        </Box>
                      }
                    />
                  ))}
                </Box>
              )}
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' type='submit' disabled={loading}>
            {loading ? 'Saving…' : 'Save Changes'}
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditUserInfo
