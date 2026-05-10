'use client'

import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

import { getUserById } from '@/api/user'
import { User } from '@/api/interface/userInterface'
import { useAuthStore } from '@/store/authStore'
import FeaturePermissionsCard from '@/components/rbac/FeaturePermissionsCard'
import EditUserInfo from '@/components/dialogs/edit-user-info'

type PreviewUserProps = {
  id: string
}

const UserDetails = ({ id }: PreviewUserProps) => {
  const [userItemData, setUserItemData] = useState<User | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const { user: currentUser } = useAuthStore()
  const isOwner = currentUser && Number(currentUser.user_type) === 1

  const fetchUser = async () => {
    try {
      const response = await getUserById(Number(id))
      setUserItemData(response?.data)
    } catch {
      // user fetch failed silently
    }
  }

  useEffect(() => {
    fetchUser()
  }, [id])

  return (
    <div className='flex flex-col gap-6'>
      {isOwner && userItemData && (
        <EditUserInfo
          open={editOpen}
          setOpen={setEditOpen}
          data={userItemData as any}
          onTypeAdded={fetchUser}
        />
      )}
      <Card>
        <CardContent className='flex flex-col pbs-12 gap-6'>
          <div>
            <div className='flex items-center justify-between'>
              <Typography variant='h5'>User Details</Typography>
              {isOwner && (
                <Button
                  variant='contained'
                  size='small'
                  startIcon={<i className='tabler-edit text-base' />}
                  onClick={() => setEditOpen(true)}
                >
                  Edit
                </Button>
              )}
            </div>
            <Divider className='mlb-4' />
            <div className='flex flex-col gap-2'>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Company Name:
                </Typography>
                <Typography>{userItemData?.name}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  First Name:
                </Typography>
                <Typography>{userItemData?.first_name}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Last Name:
                </Typography>
                <Typography>{userItemData?.last_name}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  User Type:
                </Typography>
                <Typography>{userItemData?.user_type}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Status:
                </Typography>
                <Typography>{userItemData?.status}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Country:
                </Typography>
                <Typography>{userItemData?.country}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  City:
                </Typography>
                <Typography>{userItemData?.city}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Postal Code Delivery:
                </Typography>
                <Typography>{userItemData?.postalCode}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Address:
                </Typography>
                <Typography>{userItemData?.address}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Mobile:
                </Typography>
                <Typography>{userItemData?.mobile}</Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isOwner && userItemData && (
        <FeaturePermissionsCard
          userId={Number(id)}
          userName={userItemData.first_name || userItemData.name}
          initialPermissions={(userItemData as any).permissions ?? (userItemData as any).sidebar_permissions ?? []}
        />
      )}
    </div>
  )
}

export default UserDetails
