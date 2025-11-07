import { useSession } from 'next-auth/react'

export const useAuth = () => {
    const { data: session } = useSession();
    const user = session?.user ?? null
  return { user, session }
}
