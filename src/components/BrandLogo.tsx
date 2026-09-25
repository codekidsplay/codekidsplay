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
}

/** Logo full Code Kids Play — peste tot, cu colțuri rotunjite */
export default function BrandLogo({
  size = 'md',
  href = '/',
  className = '',
  priority = false,
}: Props) {
  const w = widths[size]

  const img = (
    <Image
      src="/logo-full.jpg"
      alt="Code Kids Play"
      width={w}
      height={w}
      priority={priority}
      unoptimized
      className={`rounded-2xl object-cover shadow-sm ${className}`}
      style={{ width: w, height: w }}
    />
  )

  if (href === null) return img
  return (
    <Link
      href={href}
      className="inline-block flex-shrink-0 leading-none"
      aria-label="Code Kids Play — acasă"
    >
      {img}
    </Link>
  )
}
