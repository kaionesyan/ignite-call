import { Adapter } from 'next-auth/adapters'
import { prisma } from '../prisma'

export function PrismaAdapter(): Adapter {
  return {
    async createUser(user) {},

    async getUser(id) {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id },
      })

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUniqueOrThrow({
        where: { email },
      })

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const { user } = await prisma.account.findUniqueOrThrow({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      }
    },

    async updateUser(user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      }
    },

    async deleteUser(userId) {},

    async linkAccount(account) {},

    async unlinkAccount({ providerAccountId, provider }) {},

    async createSession({ sessionToken, userId, expires }) {},

    async getSessionAndUser(sessionToken) {},

    async updateSession({ sessionToken }) {},

    async deleteSession(sessionToken) {},

    async createVerificationToken({ identifier, expires, token }) {},

    async useVerificationToken({ identifier, token }) {},
  }
}
