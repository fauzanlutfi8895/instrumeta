import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Hapus datasource dan tambahkan dotenv supaya tidak menimpa .env yang ada
export default defineConfig({
  schema: "prisma/schema.prisma",
});
