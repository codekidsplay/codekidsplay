import Image from 'next/image'
import Link from 'next/link'

type Size = 'sm' | 'md' | 'nav' | 'lg' | 'hero'

const widths: Record<Size, number> = {
  sm: 48,
  md: 72,
  nav: 112,
  lg: 140,
  hero: 220,
}

interface Props {
  size?: Size
  href?: string | null
  className?: string
  priority?: boolean
  /** Implicit cerc — brand mark Code Maker Club */
  shape?: 'rounded' | 'circle'
  /** Implicit mov din logo; `null` = fără inel */
  ring?: string | null
  /** păstrat pentru compatibilitate (logo e imagine) */
  tone?: 'ink' | 'light'
}

/** Logo full Code Maker Club — cerc + inel mov */
export default function BrandLogo({
  size = 'md',
  href = '/',
  className = '',
  priority = false,
  shape = 'circle',
  ring = 'var(--ckp-purple)',
}: Props) {
  const w = widths[size]
  const isCircle = shape === 'circle'
  const radius = isCircle ? 'rounded-full' : 'rounded-2xl'
  const ringW = size === 'sm' ? 2 : 3

  const img = (
    <Image
      src="/logo-full.png"
      alt="Code Maker Club"
      width={w}
      height={w}
      priority={priority}
      unoptimized
      className={`${radius} object-cover shadow-sm ${className}`}
      style={{
        width: w,
        height: w,
        boxShadow: ring ? `0 0 0 ${ringW}px ${ring}` : undefined,
      }}
    />
  )

  if (href === null) return img
  return (
    <Link
      href={href}
      className="inline-block flex-shrink-0 leading-none"
      aria-label="Code Maker Club — acasă"
    >
      {img}
    </Link>
  )
}
