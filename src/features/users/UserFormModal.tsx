import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Modal } from '@/components/ui/Modal'
import { ActionButton } from '@/components/ui'
import { useUserStore } from '@/store/userStore'
import { cn } from '@/utils'
import type { AppUser, UserPermission } from '@/types'

const PERMISSIONS: { key: UserPermission; label: string }[] = [
  { key: 'view_reports',     label: 'View Reports' },
  { key: 'create_reports',   label: 'Create Reports' },
  { key: 'export_data',      label: 'Export Data' },
  { key: 'manage_campaigns', label: 'Manage Campaigns' },
  { key: 'manage_users',     label: 'Manage Users' },
  { key: 'manage_settings',  label: 'Manage Settings' },
  { key: 'view_billing',     label: 'View Billing' },
]

const schema = z.object({
  name:        z.string().min(2, 'Name must be at least 2 characters'),
  email:       z.string().email('Invalid email address'),
  role:        z.enum(['admin', 'analyst', 'campaign_manager', 'viewer']),
  department:  z.string().min(1, 'Department is required'),
  jobTitle:    z.string().min(1, 'Job title is required'),
  phone:       z.string(),
  permissions: z.array(z.string()),
})

type FormValues = z.infer<typeof schema>

type UserFormModalProps = {
  onAdd: (user: AppUser) => void
  onUpdate: (user: AppUser) => void
}

const inputClass = (hasError: boolean) =>
  cn(
    'w-full rounded-lg border px-3 py-2 text-sm bg-background text-text-primary outline-none transition-colors',
    hasError ? 'border-red-500' : 'border-border focus:border-brand focus:ring-2 focus:ring-brand/20',
  )

const AVATAR_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#f97316', '#14b8a6']

export const UserFormModal = ({ onAdd, onUpdate }: UserFormModalProps) => {
  const { modalMode, editingUser, closeModal } = useUserStore()
  const isEdit = modalMode === 'edit'
  const open = modalMode === 'add' || modalMode === 'edit'

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isEdit && editingUser
      ? {
          name:        editingUser.name,
          email:       editingUser.email,
          role:        editingUser.role,
          department:  editingUser.department,
          jobTitle:    editingUser.jobTitle,
          phone:       editingUser.phone ?? '',
          permissions: editingUser.permissions,
        }
      : { name: '', email: '', role: 'viewer', department: '', jobTitle: '', phone: '', permissions: ['view_reports'] },
  })

  const onSubmit = async (data: FormValues): Promise<void> => {
    await new Promise((r) => setTimeout(r, 400))
    const initials = data.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)] ?? '#6366f1'

    if (isEdit && editingUser) {
      onUpdate({ ...editingUser, ...data, avatarInitials: initials, permissions: data.permissions as UserPermission[] })
    } else {
      onAdd({
        id: `usr-${Date.now()}`,
        ...data,
        status: 'active',
        avatarInitials: initials,
        avatarColor: color,
        lastActive: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        assignedCampaigns: [],
        permissions: data.permissions as UserPermission[],
      })
    }
    reset()
    closeModal()
  }

  return (
    <Modal
      open={open}
      onClose={() => { reset(); closeModal() }}
      title={isEdit ? 'Edit User' : 'Add New User'}
      description={isEdit ? 'Update user details and permissions.' : 'Create a new user account.'}
      size="lg"
      footer={
        <>
          <ActionButton variant="secondary" size="sm" onClick={() => { reset(); closeModal() }}>Cancel</ActionButton>
          <ActionButton
            variant="primary"
            size="sm"
            loading={isSubmitting}
            onClick={() => { void handleSubmit(onSubmit)() }}
          >
            {isEdit ? 'Save Changes' : 'Create User'}
          </ActionButton>
        </>
      }
    >
      <form className="space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-secondary">Full Name *</label>
            <input {...register('name')} className={inputClass(!!errors.name)} placeholder="Jane Smith" />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-secondary">Email *</label>
            <input {...register('email')} type="email" className={inputClass(!!errors.email)} placeholder="jane@example.com" />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-secondary">Role *</label>
            <select {...register('role')} className={inputClass(!!errors.role)}>
              <option value="viewer">Viewer</option>
              <option value="analyst">Analyst</option>
              <option value="campaign_manager">Campaign Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-secondary">Phone</label>
            <input {...register('phone')} className={inputClass(false)} placeholder="+1 (555) 000-0000" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-secondary">Department *</label>
            <input {...register('department')} className={inputClass(!!errors.department)} placeholder="Analytics" />
            {errors.department && <p className="text-xs text-red-500">{errors.department.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-secondary">Job Title *</label>
            <input {...register('jobTitle')} className={inputClass(!!errors.jobTitle)} placeholder="Data Analyst" />
            {errors.jobTitle && <p className="text-xs text-red-500">{errors.jobTitle.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-text-secondary">Permissions</label>
          <Controller
            name="permissions"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-2">
                {PERMISSIONS.map((perm) => {
                  const checked = (field.value as string[]).includes(perm.key)
                  return (
                    <label
                      key={perm.key}
                      className={cn(
                        'flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2 text-xs transition-colors',
                        checked
                          ? 'border-brand/40 bg-brand/5 text-text-primary'
                          : 'border-border text-text-secondary hover:border-brand/30',
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? [...(field.value as string[]), perm.key]
                            : (field.value as string[]).filter((p) => p !== perm.key)
                          field.onChange(next)
                        }}
                        className="h-3.5 w-3.5 rounded accent-brand"
                        aria-label={perm.label}
                      />
                      {perm.label}
                    </label>
                  )
                })}
              </div>
            )}
          />
        </div>
      </form>
    </Modal>
  )
}
