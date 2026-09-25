import { avatarColors, avatarInitials } from '@/lib/avatar'

interface Props {
  nume: string
  prenume: string
  id?: string
  size?: 'sm' | 'md'
}

export default function CursantAvatar({ nume, prenume, id, size = 'md' }: Props) {
  const colors = avatarColors(id ?? `${nume}-${prenume}`)
  const sizeClass = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-9 h-9 text-sm'

  return (
    <div
      className={`${sizeClass} ${colors.bg} ${colors.text} rounded-full flex items-center justify-center font-semibold flex-shrink-0`}
    >
      {avatarInitials(nume, prenume)}
    </div>
  )
}
