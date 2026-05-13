import { PrismaClient, UserRole, SubscriptionTier } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding HAIPPA database...");

  const adminHash = await bcrypt.hash("admin123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@haippa.com" },
    update: {},
    create: {
      email: "admin@haippa.com",
      passwordHash: adminHash,
      role: UserRole.ADMIN,
      profile: {
        create: {
          firstName: "HAIPPA",
          lastName: "Admin",
          country: "GB",
        },
      },
    },
  });

  await prisma.subscriptionPlan.upsert({
    where: { tier: SubscriptionTier.FREE },
    update: {},
    create: {
      tier: SubscriptionTier.FREE,
      name: "Free",
      priceGBP: 0,
      features: { maxListings: 5, analytics: false, featuredEligible: false, prioritySupport: false },
    },
  });

  await prisma.subscriptionPlan.upsert({
    where: { tier: SubscriptionTier.STANDARD },
    update: {},
    create: {
      tier: SubscriptionTier.STANDARD,
      name: "Standard",
      priceGBP: 1500,
      features: { maxListings: 30, analytics: true, featuredEligible: true, prioritySupport: false },
    },
  });

  await prisma.subscriptionPlan.upsert({
    where: { tier: SubscriptionTier.PREMIUM },
    update: {},
    create: {
      tier: SubscriptionTier.PREMIUM,
      name: "Premium",
      priceGBP: 4900,
      features: { maxListings: -1, analytics: true, featuredEligible: true, prioritySupport: true },
    },
  });

  console.log("✅ Seed complete. Admin:", admin.email);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
