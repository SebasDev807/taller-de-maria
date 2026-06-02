import mongoose from "mongoose";
import { env } from "@/config/env";
import { User } from "@/models";
import { mockUsers } from "@/models/user/user.seed";
import { hashPassword } from "@/helpers";

const seedUsers = async (): Promise<void> => {
  console.log("🌱 Iniciando seed de usuarios...\n");

  await mongoose.connect(env.MONGODB_URI);
  console.log("✅ Conectado a MongoDB\n");

  let inserted = 0;
  let skipped = 0;

  for (const mockUser of mockUsers) {
    const existing = await User.findOne({
      email: mockUser.email.toLowerCase(),
    });

    if (existing) {
      console.log(`⏭️  Omitido: ${mockUser.email} (ya existe)`);
      skipped++;
      continue;
    }

    const hashedPassword = await hashPassword(mockUser.password);

    const created = await User.create({
      ...mockUser,
      password: hashedPassword,
    });

    console.log(
      `✅ Creado: ${created.email} | rol: ${created.role} | id: ${created._id}`
    );
    inserted++;
  }

  console.log(`\n📊 Resumen:`);
  console.log(`   - Insertados : ${inserted}`);
  console.log(`   - Omitidos   : ${skipped}`);

  await mongoose.disconnect();
  console.log("\n🔌 Desconectado de MongoDB");
};

seedUsers().catch((error: unknown) => {
  console.error("❌ Error durante el seed:", error);
  process.exit(1);
});
