'use client'

import { use } from 'react'
import CursantAbonamentDetail from '@/components/CursantAbonamentDetail'

export default function CursantAbonamentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <CursantAbonamentDetail cursantId={id} />
}
