import { SubmitHandler, useForm } from "react-hook-form";

type FormInput = {
  name: string,
  mail: string,
  gender: "male" | "female" | "other"
}

export default function IndexPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInput>()

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data)
  }

  console.log(watch("name"))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input
        defaultValue="test"
        {...register("name", { required: true })}
        aria-invalid={errors.name ? "true" : "false"}
      />
      {errors.name?.type === "required" && (
        <p role="alert">Name is required</p>
      )}

      <label>Mail</label>
      <input
        {...register("mail", { required: "Email is requied" })}
        aria-invalid={errors.mail ? "true" : "false"}
      />
      {errors.mail && (
        <p role="alert">{errors.mail?.message}</p>
      )}

      <label>Gender</label>
      <select {...register("gender")}>
        <option value="male">male</option>
        <option value="female">female</option>
        <option value="other">other</option>
      </select>

      <input type="submit" />
    </form>
  )
}
