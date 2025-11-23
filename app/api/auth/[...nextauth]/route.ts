import api from "@/lib/api/axios"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                if (!credentials) {
                    console.log("No credentials provided");
                    return null
                }
                const { email, password } = credentials
                const res = await api.post('/login', { email, password })

                // axios responses typically contain data; adapt as needed for your API
                const user = res?.data?.newUser ?? res?.data

                if (res?.status === 200) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        image: user.photoUrl
                    }
                }


                return null
            },


        }),

    ],
    pages: {
        signIn: '/auth/login',
    },

    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 30,
    
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
        async jwt({ token,user }) {
            if (user) {
                token.email = user.email;
                token.id = user.id;
                token.role = user.role;
                token.image = user.image;
            }
            return token;
        },
        async session({ session, token }) {

            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.image = token.image as string;
            }
            return session;
        },
    }




})

export { handler as GET, handler as POST }