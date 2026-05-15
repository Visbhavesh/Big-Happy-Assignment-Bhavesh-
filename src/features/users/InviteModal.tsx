import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Modal } from '@/components/ui/Modal'
import { ActionButton } from '@/components/ui'
import { useUserStore } from '@/store/userStore'
import { cn } from '@/utils'

const schema = z.object({
  email:   z.string().email('Invalid email address'),
  role:    z.enum(['admin', 'analyst', 'campaign_manager', 'viewer']),
  message: z.string(),
})

type FormValues = z.infer<typeof schema>

const inputClass = (hasError: boolean) =>
  cn(
    'w-full rounded-lg border px-3 py-2 text-sm bg-background text-text-primary outline-none transition-colors',
    hasError ? 'border-red-500' : 'border-border focus:border-brand focus:ring-2 focus:ring-brand/20',
  )

export const InviteModal = () => {
  const { modalMode, closeModal } = useUserStore()
  const open = modalMode === 'invite'

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', role: 'viewer', message: '' },
  })

  const onSubmit = async (_data: FormValues): Promise<void> => {
    await new Promise((r) => setTimeout(r, 600))
  }

  return (
    <Modal
      open={open}
      onClose={() => { reset(); closeModal() }}
      title="Invite User"
      description="Send an invitation email to a new team member."
      size="sm"
      footer={
        <>
          <ActionButton variant="secondary" size="sm" onClick={() => { reset(); closeModal() }}>Cancel</ActionButton>
          <ActionButton
            variant="primary"
            size="sm"
            loading={isSubmitting}
            onClick={() => { void handleSubmit(onSubmit)() }}
          >
            Send Invite
          </ActionButton>
        </>
      }
    >
      {isSubmitSuccessful ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <span className="text-2xl">✓</span>
          </div>
          <p className="text-sm font-semibold text-text-primary">Invitation sent!</p>
          <p className="text-xs text-text-secondary">The user will receive an email with instructions to join.</p>
          <ActionButton variant="secondary" size="sm" onClick={() => { reset(); closeModal() }}>Done</ActionButton>
        </div>
      ) : (
        <form className="space-y-4" noValidate>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-secondary">Email address *</label>
            <input {...register('email')} type="email" className={inputClass(!!errors.email)} placeholder="colleague@example.com" />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-secondary">Role *</label>
            <select {...register('role')} className={inputClass(false)}>
              <option value="viewer">Viewer</option>
              <option value="analyst">Analyst</option>
              <option value="campaign_manager">Campaign Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-secondary">Personal message (optional)</label>
            <textarea
              {...register('message')}
              rows={3}
              className={cn(inputClass(false), 'resize-none')}
              placeholder="Add a personal note to the invitation…"
            />
          </div>
        </form>
      )}
    </Modal>
  )
}
