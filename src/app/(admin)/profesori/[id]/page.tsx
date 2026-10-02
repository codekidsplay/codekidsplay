import ActivitateProfesor from '@/components/ActivitateProfesor'

export default async function ProfesorActivitatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ActivitateProfesor profesorId={id} />
}
