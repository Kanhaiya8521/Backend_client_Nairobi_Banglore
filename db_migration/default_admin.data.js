require("dotenv").config({ path: "../.env" });
const bcrypt = require("bcrypt");
// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");

// import { AppError } from "./../utility/app_error";
// import { AppError } from "./../utility/app_error";
const prisma = new PrismaClient();

const default_admin_migration = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const generateSalt = () => {
        try {
          return bcrypt.genSalt(10);
        } catch (error) {
          throw error;
        }
      };

      const generateHashPassword = (plainPassword, salt) => {
        try {
          return bcrypt.hash(plainPassword, salt);
        } catch (error) {
          throw error;
        }
      };

      const salt = await generateSalt();
      const hash_password = await generateHashPassword(
        process.env.DEFAULT_ADMIN_PASSWORD.trim(),
        salt
      );

      const admin_info = {
        first_name: "Admin",
        last_name: "Admin",
        email: process.env.DEFAULT_ADMIN_EMAIL.toLowerCase().trim(),
        username: "admin_123",
        password: hash_password,
        // phone: "9898989898",
        avatar: "",
        status: false,
        role: "SUPER_ADMIN",
        // terms_and_conditions: true
      };

      let admin = await prisma.admin.findFirst({ where: { role: "SUPER_ADMIN" } });
      if (admin) {
        admin = await prisma.admin.update({
          where: { id: admin.id },
          data: admin_info,
        });
      } else {
        admin = await prisma.admin.create({ data: admin_info });
      }

      if (admin) {
        console.log(
          "------------------- Admin migrated successfully !!---------------------"
        );
      } else {
        console.log(
          "---------------- Unable to migrate admin !!---------------------"
        );
      }
    } catch (err) {
      return reject(err);
    }
  });
};

default_admin_migration();
