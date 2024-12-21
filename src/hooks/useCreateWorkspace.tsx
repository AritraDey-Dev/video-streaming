import { createWorkspaces } from '@/actions/workspace'
import { useMutationData } from './useMutationData'
import useZodForm from './useZodForm'
import { WorkSpaceSchema } from '@/components/form/workspace-form/schema'

export const useCreateWorkspace = () => {
  const { mutate, isPending } = useMutationData(
    ['create-workspace'],
    (data: { name: string }) => createWorkspaces(data.name),
     true,
    'user-workspaces'
  )

  const { errors, onFormSubmit, register } = useZodForm(WorkSpaceSchema, mutate)
  return { errors, onFormSubmit, register, isPending };
}