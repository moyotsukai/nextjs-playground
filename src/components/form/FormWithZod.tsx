import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const userSchema = z
  .object({
    firstName: z.string().min(1, { message: "Required" }),
    familyName: z.string().min(1, { message: "Required" }),
    age: z.number().min(10)
  })
  .transform((data) => {
    const fullName = `${data.firstName} ${data.familyName}`

    return {
      ...data,
      fullName
    }
  })

type User = z.infer<typeof userSchema>

export default function FormWithZod() {
  const { register, handleSubmit, formState: { errors } } = useForm<User>({ resolver: zodResolver(userSchema) })

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First name</label>
      <input {...register("firstName")} />
      {errors.firstName && (
        <p>{errors.firstName?.message}</p>
      )}

      <label>Family name</label>
      <input {...register("familyName")} />
      {errors.familyName && (
        <p>{errors.familyName?.message}</p>
      )}

      <label>Age</label>
      <input type="number" {...register("age", { valueAsNumber: true })} />
      {errors.age &&
        <p>{errors.age?.message}</p>
      }

      <input type="submit" />
    </form>
  )
}
