'use client'

import { use } from 'react'
import EditeazaCursantForm from '@/components/EditeazaCursantForm'

export default function EditeazaCursantPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  return <EditeazaCursantForm cursantId={id} />
}
