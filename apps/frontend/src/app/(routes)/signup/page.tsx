"use client";

import { useRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { AuthContainer } from "@/components/AuthContainer";
import { FormInput } from "@/components/FormInput";
import { ToggleRole } from "@/components/ToggleRole";
import { useSignup } from "@/hooks/useAuthMutations";

interface SignupFormData {
  username: string;
  password: string;
  confirmPassword: string;
  role: "USER" | "ADMIN";
}

export default function SignupPage() {
  const router = useRouter();
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      role: "USER",
    },
  });

  const { mutate: signup, isPending, isError, error } = useSignup();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const onSubmit = (data: SignupFormData) => {
    // Client-side validation
    if (data.password !== data.confirmPassword) {
      setPasswordMatchError("Password tidak cocok");
      toast.error("Password tidak cocok");
      return;
    }

    setPasswordMatchError("");

    signup(
      {
        username: data.username,
        password: data.password,
        role: data.role,
      },
      {
        onSuccess: response => {
          toast.success(`Selamat! Akun berhasil dibuat. Silakan login.`);
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        },
        onError: error => {
          toast.error(error.message || "Terjadi kesalahan saat mendaftar");
        },
      }
    );
  };

  // Handle Enter key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !isPending) {
        handleSubmit(onSubmit)();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleSubmit, onSubmit, isPending]);

  return (
    <AuthContainer title="Daftar" subtitle="Buat akun Instrumeta baru" linkText="Masuk" linkHref="/login" linkQuestion="Sudah punya akun?">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Username"
          placeholder="Pilih username unik"
          type="text"
          {...register("username", {
            required: "Username wajib diisi",
            minLength: {
              value: 3,
              message: "Username minimal 3 karakter",
            },
          })}
          error={errors.username}
        />

        <FormInput
          label="Password"
          placeholder="Minimal 6 karakter"
          type="password"
          showPasswordToggle
          {...register("password", {
            required: "Password wajib diisi",
            minLength: {
              value: 6,
              message: "Password minimal 6 karakter",
            },
          })}
          error={errors.password}
        />

        <FormInput
          label="Konfirmasi Password"
          placeholder="Ulangi password"
          type="password"
          showPasswordToggle
          {...register("confirmPassword", {
            required: "Konfirmasi password wajib diisi",
          })}
          error={errors.confirmPassword}
        />

        {passwordMatchError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
            <AlertCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-red-700 text-sm">{passwordMatchError}</p>
          </div>
        )}

        <div className="pt-2">
          <Controller name="role" control={control} render={({ field }) => <ToggleRole value={field.value} onChange={field.onChange} disabled={isPending} />} />
        </div>

        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
            <AlertCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error?.message || "Terjadi kesalahan saat mendaftar"}</p>
          </div>
        )}

        <button
          ref={submitButtonRef}
          type="submit"
          disabled={isPending}
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-blue-400 disabled:to-blue-400 text-white font-semibold py-2.5 rounded-lg transition-all shadow-lg shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-600/40 disabled:shadow-lg disabled:shadow-blue-400/20 flex items-center justify-center gap-2 active:scale-95 transform duration-100"
        >
          {isPending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <span>Daftar</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>
    </AuthContainer>
  );
}
