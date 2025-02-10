import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Inform a task'),
  minutesAmount: zod
    .number()
    .min(5, 'Cycle needs to have at least 5min')
    .max(60, 'Cycle cant have more than 60min'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  return (
    <FormContainer>
      <label htmlFor="task">I will work on</label>
      <TaskInput
        id="task"
        list="list-sugestions"
        placeholder="Give a name for your nice project"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="list-sugestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Foco Total" />
      </datalist>
      <label htmlFor="minutesAmount">during</label>
      <MinutesAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutes.</span>
    </FormContainer>
  )
}
