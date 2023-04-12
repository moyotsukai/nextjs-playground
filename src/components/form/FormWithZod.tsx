import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const userSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  age: z.number().min(10)
})

type User = z.infer<typeof userSchema>

export default function FormWithZod() {
  const { register, handleSubmit, formState: { errors } } = useForm<User>({ resolver: zodResolver(userSchema) })

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && (
        <p>{errors.name?.message}</p>
      )}

      <input type="number" {...register("age", { valueAsNumber: true })} />
      {errors.age &&
        <p>{errors.age?.message}</p>
      }

      <input type="submit" />
    </form>
  )
}
