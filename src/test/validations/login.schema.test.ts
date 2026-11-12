import { describe, it, expect } from "vitest";
import { loginSchema } from "@/validations/login.schema";

describe("loginSchema", () => {
  it("should accept valid email and password", async () => {
    const result = await loginSchema.validate({
      email: "test@example.com",
      password: "Password123!",
    });

    expect(result.email).toBe("test@example.com");
  });

  it("should reject an empty email", async () => {
    await expect(
      loginSchema.validate({
        email: "",
        password: "Password123!",
      }),
    ).rejects.toThrow("Email is required");
  });

  it("should reject an invalid email", async () => {
    await expect(
      loginSchema.validate({
        email: "invalid-email",
        password: "Password123!",
      }),
    ).rejects.toThrow("Please enter a valid email address");
  });

  it("should reject a password shorter than 8 characters", async () => {
    await expect(
      loginSchema.validate({
        email: "test@example.com",
        password: "Pass1!",
      }),
    ).rejects.toThrow("Password must be at least 8 characters");
  });

  it("should reject a password without uppercase letters", async () => {
    await expect(
      loginSchema.validate({
        email: "test@example.com",
        password: "password123!",
      }),
    ).rejects.toThrow("Must contain at least one uppercase letter");
  });

  it("should reject a password without lowercase letters", async () => {
    await expect(
      loginSchema.validate({
        email: "test@example.com",
        password: "PASSWORD123!",
      }),
    ).rejects.toThrow("Must contain at least one lowercase letter");
  });

  it("should reject a password without numbers", async () => {
    await expect(
      loginSchema.validate({
        email: "test@example.com",
        password: "PasswordABC!",
      }),
    ).rejects.toThrow("Must contain at least one number");
  });

  it("should reject a password without special characters", async () => {
    await expect(
      loginSchema.validate({
        email: "test@example.com",
        password: "Password123",
      }),
    ).rejects.toThrow(
      "Must contain at least one special character (@$!%*?&#)",
    );
  });
});