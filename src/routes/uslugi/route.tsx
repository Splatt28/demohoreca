import { Filters } from '@/components/Filters'
import { Form } from '@/components/ui/form'
import { createFileRoute, Outlet, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/uslugi')({
  component: ServicesLayout,
})

export default function ServicesLayout() {
  const { watch, ...form } = useForm()
  const { getValues, setValue } = form
  const search = useSearch({
    from: Route.fullPath,
  })

  useEffect(() => {
    const currentValues = getValues()
    Object.entries(currentValues).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        setValue(key, []) // reset each field to empty string
        return
      }
      setValue(key, '')
    })
    Object.entries(search).forEach(([key, value]) => {
      setValue(key, value)
    })
  }, [getValues, search, setValue])

  return (
    <section className="container py-8">
      <div className="grid grid-flow-col grid-cols-[auto_1fr] gap-30">
        <Form watch={watch} {...form}>
          <Filters type="SERVICE" />
          <Outlet />
        </Form>
      </div>
    </section>
  )
}
