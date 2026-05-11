'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import toast from 'react-hot-toast'

import DialogCloseButton from '../DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'
import Loader from '@/components/loader/Loader'
import type { User } from '@/api/interface/userInterface'
import { createUser } from '@/api/user'
import { useAuthStore } from '@/store/authStore'
import { CONFIGURABLE_FEATURES } from '@/libs/rbac/sidebarFeatures'
import { useUserPermissionsStore } from '@/libs/rbac/userPermissionsStore'

type AddUserFormProps = {
  open: boolean
  setOpen: (open: boolean) => void
  onTypeAdded?: () => void
}

const AddUserForm = ({ open, setOpen, onTypeAdded }: AddUserFormProps) => {
  const { user } = useAuthStore()
  const { setUserPermissions } = useUserPermissionsStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>()

  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [loading, setLoading] = useState(false)

  // Permissions state — all features selected by default
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    CONFIGURABLE_FEATURES.map(f => f.key)
  )

  const toggleFeature = (key: string) => {
    setSelectedFeatures(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  const handleReset = () => {
    reset()
    setSelectedFeatures(CONFIGURABLE_FEATURES.map(f => f.key))
    setOpen(false)
  }

  const onSubmit = (data: User) => {
    setLoading(true)

    const permissions = selectedFeatures

    const submissionData = {
      ...data,
      status: 'Active',
      user_type: 3,
      businessownerId: user?.businessownerId ?? user?.id,
      subscription: true,
      permissions,
    }

    createUser(submissionData)
      .then(res => {
        const newUserId = res?.data?.id ?? res?.data?.data?.id

        if (newUserId) {
          // Mirror to local store so the sub-user's sidebar reflects immediately
          setUserPermissions(newUserId, permissions)
        }

        toast.success(res?.data?.message ?? 'User created successfully', { duration: 5000 })
        onTypeAdded?.()
        handleReset()
      })
      .catch(error => {
        const msg = error?.email?.[0] ?? 'An error occurred while creating the user'
        toast.error(msg, { duration: 5000 })
      })
      .finally(() => setLoading(false))
  }

  return (
    <Dialog fullWidth open={open} maxWidth='md' scroll='body' sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>

      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Add User Information
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>

            {/* ── User fields ── */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Company Name *'
                placeholder='Enter company name'
                {...register('name', { required: 'Company name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='First Name *'
                placeholder='Enter your first name'
                {...register('first_name', { required: 'First name is required' })}
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Last Name *'
                placeholder='Enter your last name'
                {...register('last_name', { required: 'Last name is required' })}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Email *'
                placeholder='Enter your email'
                {...register('email', { required: 'Email is required' })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Mobile *'
                placeholder='Enter your mobile'
                {...register('mobile', { required: 'Mobile number is required' })}
                error={!!errors.mobile}
                helperText={errors.mobile?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Password *'
                placeholder='············'
                type={isPasswordShown ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={() => setIsPasswordShown(s => !s)}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Country *'
                placeholder='Enter Your Country'
                {...register('country', { required: 'Country is required' })}
                error={!!errors.country}
                helperText={errors.country?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='City *'
                placeholder='Enter Your City'
                {...register('city', { required: 'City is required' })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Address *'
                placeholder='Enter Your Address'
                {...register('address', { required: 'Address is required' })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Postal Code *'
                placeholder='Enter Postal Code'
                {...register('postalCode', { required: 'Postal Code is required' })}
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message}
              />
            </Grid>

            {/* ── Feature Access ── */}
            <Grid item xs={12}>
              <Divider className='mb-2' />
              <Typography variant='h6' className='mb-3'>
                Feature Access
              </Typography>

              <Box className='grid grid-cols-2 sm:grid-cols-3 gap-1 mt-2 pl-2'>
                {CONFIGURABLE_FEATURES.map(feature => (
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
                        <Typography variant='body2' className='capitalize'>
                          {feature.labelKey}
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </Box>
            </Grid>
          </Grid>

          <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16 mt-6'>
            <Button variant='contained' type='submit' disabled={loading}>
              {loading ? 'Creating...' : 'Submit'}
            </Button>
            <Button variant='tonal' color='error' type='button' onClick={handleReset}>
              Cancel
            </Button>
          </DialogActions>

          {loading && <Loader />}
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default AddUserForm
