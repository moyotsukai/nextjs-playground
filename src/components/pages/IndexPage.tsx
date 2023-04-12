import { z } from "zod"

const User = z.object({
  username: z.string(),
})

type User = z.infer<typeof User>

export default function IndexPage() {
  const parsed = User.parse({ username: "Ludwig" })
  console.log(parsed)

  return (
    <div>
      Hello!
    </div>
  )
}