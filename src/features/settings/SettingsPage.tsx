import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardHeader, CardTitle } from '@/components/ui'
import { cn } from '@/utils'

const settingsSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  timezone: z.string().min(1, 'Timezone is required'),
})

type SettingsFormValues = z.infer<typeof settingsSchema>

const inputClass = (hasError: boolean) =>
  cn(
    'w-full rounded-lg border px-3 py-2 text-sm bg-background text-text-primary outline-none transition-colors',
    hasError ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-brand',
  )

export const SettingsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { displayName: 'Admin User', email: 'admin@example.com', timezone: 'UTC' },
  })

  const onSubmit = async (_data: SettingsFormValues) => {
    await new Promise((r) => setTimeout(r, 800))
  }

  return (
    <div className="space-y-4 max-w-lg">
      <h1 className="text-xl font-bold text-text-primary">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-secondary">Display Name</label>
            <input {...register('displayName')} className={inputClass(!!errors.displayName)} />
            {errors.displayName && (
              <p className="text-xs text-red-500">{errors.displayName.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-text-secondary">Email</label>
            <input {...register('email')} type="email" className={inputClass(!!errors.email)} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-text-secondary">Timezone</label>
            <select {...register('timezone')} className={inputClass(!!errors.timezone)}>
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">London</option>
              <option value="Asia/Tokyo">Tokyo</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand/90 disabled:opacity-60 transition-colors"
          >
            {isSubmitting ? 'Saving…' : 'Save Changes'}
          </button>

          {isSubmitSuccessful && (
            <p className="text-xs text-emerald-500">Settings saved successfully.</p>
          )}
        </form>
      </Card>
    </div>
  )
}
