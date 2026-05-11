'use client'

import { useEffect, useState, useCallback } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import toast from 'react-hot-toast'

import { inboxApi, type InboxTeam } from '@/api/inboxApi'
import { getAllUsers } from '@/api/user'

const PLATFORMS = [
  { key: 'whatsapp', label: 'WhatsApp', color: '#25D366' },
  { key: 'instagram', label: 'Instagram', color: '#E1306C' },
  { key: 'messenger', label: 'Messenger', color: '#0084FF' },
  { key: 'telegram', label: 'Telegram', color: '#0088cc' },
]

interface SubUser {
  id: number
  first_name: string
  last_name: string
  email: string
}

interface Customer {
  id: number
  name: string
  phone_number: string
  type?: string
}

interface TeamFormProps {
  team?: InboxTeam | null
  subUsers: SubUser[]
  customers: Customer[]
  onSave: (team: InboxTeam) => void
  onCancel: () => void
}

const TeamForm = ({ team, subUsers, customers, onSave, onCancel }: TeamFormProps) => {
  const [name, setName] = useState(team?.name ?? '')
  const [platforms, setPlatforms] = useState<string[]>(team?.platforms ?? [])
  const [assignAll, setAssignAll] = useState(team?.assign_all ?? true)
  const [memberIds, setMemberIds] = useState<number[]>(team?.members.map(m => m.user) ?? [])
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<number[]>(team?.assigned_customer_ids ?? [])
  const [saving, setSaving] = useState(false)
  const [customerSearch, setCustomerSearch] = useState('')

  const togglePlatform = (key: string) =>
    setPlatforms(prev => prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key])

  const toggleMember = (userId: number) =>
    setMemberIds(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId])

  const toggleCustomer = (customerId: number) =>
    setSelectedCustomerIds(prev =>
      prev.includes(customerId) ? prev.filter(id => id !== customerId) : [...prev, customerId]
    )

  const filteredCustomers = customers.filter(c => {
    const matchesPlatform = platforms.length === 0 || platforms.includes(c.type ?? '')
    const matchesSearch =
      !customerSearch ||
      c.name?.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.phone_number.includes(customerSearch)
    return matchesPlatform && matchesSearch
  })

  const handleSave = async () => {
    if (!name.trim()) { toast.error('Team name is required'); return }
    if (platforms.length === 0) { toast.error('Select at least one platform'); return }

    setSaving(true)
    try {
      let saved: InboxTeam
      const payload = { name: name.trim(), platforms, assign_all: assignAll, member_ids: memberIds }

      if (team) {
        saved = await inboxApi.updateTeam(team.id, payload)
      } else {
        saved = await inboxApi.createTeam(payload)
      }

      if (!assignAll && selectedCustomerIds.length > 0) {
        await inboxApi.assignCustomersToTeam(saved.id, selectedCustomerIds)
        saved.assigned_customer_ids = selectedCustomerIds
      }

      toast.success(team ? 'Team updated' : 'Team created')
      onSave(saved)
    } catch {
      toast.error('Failed to save team')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box className='flex flex-col gap-4'>
      <TextField
        fullWidth
        size='small'
        label='Team Name'
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <Box>
        <Typography variant='subtitle2' className='mb-1'>Platforms</Typography>
        <FormGroup row>
          {PLATFORMS.map(p => (
            <FormControlLabel
              key={p.key}
              control={
                <Checkbox
                  size='small'
                  checked={platforms.includes(p.key)}
                  onChange={() => togglePlatform(p.key)}
                />
              }
              label={<Typography variant='body2'>{p.label}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>

      <Box>
        <Box className='flex items-center gap-1 mb-1'>
          <Typography variant='subtitle2'>Team Members</Typography>
          <Tooltip title='Members you add here will automatically see chats from the selected platforms when they log into Inbox. No extra steps needed.'>
            <i className='tabler-info-circle text-base text-textSecondary cursor-help' />
          </Tooltip>
        </Box>
        {subUsers.length === 0 ? (
          <Typography variant='body2' color='text.secondary'>No sub-accounts found. Create sub-accounts first from the Users page.</Typography>
        ) : (
          <FormGroup>
            {subUsers.map(u => (
              <FormControlLabel
                key={u.id}
                control={
                  <Checkbox
                    size='small'
                    checked={memberIds.includes(u.id)}
                    onChange={() => toggleMember(u.id)}
                  />
                }
                label={
                  <Typography variant='body2'>
                    {`${u.first_name} ${u.last_name}`.trim() || u.email}
                    <Typography component='span' variant='caption' color='text.secondary' className='ml-1'>
                      ({u.email})
                    </Typography>
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        )}
      </Box>

      <Box>
        <FormControlLabel
          control={<Switch checked={assignAll} onChange={e => setAssignAll(e.target.checked)} />}
          label={
            <Box>
              <Typography variant='body2' fontWeight='medium'>
                {assignAll ? 'All chats on selected platforms' : 'Specific chats only'}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {assignAll
                  ? 'Members can see all incoming chats matching the selected platforms'
                  : 'Members can only see chats you assign below'}
              </Typography>
            </Box>
          }
        />
      </Box>

      {!assignAll && (
        <Box>
          <Typography variant='subtitle2' className='mb-1'>
            Assign Specific Chats
            {selectedCustomerIds.length > 0 && (
              <Chip size='small' label={`${selectedCustomerIds.length} selected`} className='ml-2' />
            )}
          </Typography>
          <TextField
            fullWidth
            size='small'
            placeholder='Search by name or phone...'
            value={customerSearch}
            onChange={e => setCustomerSearch(e.target.value)}
            className='mb-2'
          />
          <Box className='border rounded max-h-48 overflow-y-auto'>
            {filteredCustomers.length === 0 ? (
              <Typography variant='body2' color='text.secondary' className='p-3 text-center'>
                {platforms.length === 0 ? 'Select platforms first' : 'No chats found'}
              </Typography>
            ) : (
              filteredCustomers.map(c => (
                <Box
                  key={c.id}
                  className='flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-action-hover'
                  onClick={() => toggleCustomer(c.id)}
                >
                  <Checkbox size='small' checked={selectedCustomerIds.includes(c.id)} readOnly />
                  <Box className='flex-1 min-w-0'>
                    <Typography variant='body2' noWrap>{c.name || c.phone_number}</Typography>
                    <Typography variant='caption' color='text.secondary'>{c.phone_number}</Typography>
                  </Box>
                  <Chip size='small' label={c.type} variant='outlined' />
                </Box>
              ))
            )}
          </Box>
        </Box>
      )}

      <Box className='flex gap-2 justify-end'>
        <Button variant='tonal' color='secondary' onClick={onCancel} disabled={saving}>Cancel</Button>
        <Button variant='contained' onClick={handleSave} disabled={saving}>
          {saving ? <CircularProgress size={20} color='inherit' /> : team ? 'Update Team' : 'Create Team'}
        </Button>
      </Box>
    </Box>
  )
}

interface InboxTeamDialogProps {
  open: boolean
  onClose: () => void
  customers: Customer[]
}

const InboxTeamDialog = ({ open, onClose, customers }: InboxTeamDialogProps) => {
  const [teams, setTeams] = useState<InboxTeam[]>([])
  const [subUsers, setSubUsers] = useState<SubUser[]>([])
  const [loading, setLoading] = useState(false)
  const [editingTeam, setEditingTeam] = useState<InboxTeam | null | undefined>(undefined)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [teamsData, usersRes] = await Promise.all([
        inboxApi.listTeams(),
        getAllUsers(),
      ])
      setTeams(teamsData)
      // getAllUsers() returns axios response; data is paginated { results: [...] } or plain array
      const raw = usersRes?.data?.results ?? usersRes?.data ?? usersRes?.results ?? usersRes ?? []
      const allUsers: SubUser[] = Array.isArray(raw) ? raw : []
      // sub-users have businessownerId set; owners do not
      setSubUsers(allUsers.filter((u: any) => u.businessownerId != null && u.businessownerId !== ''))
    } catch (err) {
      console.error('Team load error:', err)
      toast.error('Failed to load team data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (open) { load(); setEditingTeam(undefined) }
  }, [open, load])

  const handleSaved = (saved: InboxTeam) => {
    setTeams(prev => {
      const idx = prev.findIndex(t => t.id === saved.id)
      return idx >= 0 ? prev.map(t => t.id === saved.id ? saved : t) : [...prev, saved]
    })
    setEditingTeam(undefined)
  }

  const handleDelete = async (teamId: number) => {
    setDeletingId(teamId)
    try {
      await inboxApi.deleteTeam(teamId)
      setTeams(prev => prev.filter(t => t.id !== teamId))
      toast.success('Team deleted')
    } catch {
      toast.error('Failed to delete team')
    } finally {
      setDeletingId(null)
    }
  }

  const getPlatformColor = (platform: string) =>
    PLATFORMS.find(p => p.key === platform)?.color ?? '#888'

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
      <DialogTitle className='flex items-center justify-between'>
        <Typography variant='h5'>Manage Inbox Teams</Typography>
        <IconButton onClick={onClose} size='small'><i className='tabler-x' /></IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box className='flex justify-center py-8'><CircularProgress /></Box>
        ) : editingTeam !== undefined ? (
          <TeamForm
            team={editingTeam}
            subUsers={subUsers}
            customers={customers}
            onSave={handleSaved}
            onCancel={() => setEditingTeam(undefined)}
          />
        ) : (
          <Box className='flex flex-col gap-3'>
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setEditingTeam(null)}
              className='self-start'
            >
              New Team
            </Button>

            {teams.length === 0 ? (
              <Typography variant='body2' color='text.secondary' className='text-center py-6'>
                No teams yet. Create one to assign users to specific chats.
              </Typography>
            ) : (
              <List disablePadding>
                {teams.map((team, i) => (
                  <Box key={team.id}>
                    {i > 0 && <Divider />}
                    <ListItem disablePadding className='py-2'>
                      <ListItemText
                        primary={
                          <Box className='flex items-center gap-2 flex-wrap'>
                            <Typography variant='body1' fontWeight='medium'>{team.name}</Typography>
                            {team.platforms.map(p => (
                              <Chip
                                key={p}
                                size='small'
                                label={p}
                                sx={{ backgroundColor: getPlatformColor(p), color: '#fff', fontSize: '0.7rem' }}
                              />
                            ))}
                          </Box>
                        }
                        secondary={
                          <Typography variant='caption' color='text.secondary'>
                            {team.members.length} member{team.members.length !== 1 ? 's' : ''} ·{' '}
                            {team.assign_all ? 'All chats' : `${team.assigned_customer_ids.length} specific chat${team.assigned_customer_ids.length !== 1 ? 's' : ''}`}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton size='small' onClick={() => setEditingTeam(team)}>
                          <i className='tabler-edit text-base' />
                        </IconButton>
                        <IconButton
                          size='small'
                          color='error'
                          onClick={() => handleDelete(team.id)}
                          disabled={deletingId === team.id}
                        >
                          {deletingId === team.id
                            ? <CircularProgress size={16} />
                            : <i className='tabler-trash text-base' />}
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Box>
                ))}
              </List>
            )}
          </Box>
        )}
      </DialogContent>

      {editingTeam === undefined && (
        <DialogActions>
          <Button onClick={onClose} variant='tonal' color='secondary'>Close</Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default InboxTeamDialog
