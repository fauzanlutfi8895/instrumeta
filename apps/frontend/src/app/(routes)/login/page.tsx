"use client";

import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { AuthContainer } from "@/components/AuthContainer";
import { FormInput } from "@/components/FormInput";
import { useLogin } from "@/hooks/useAuthMutations";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate: login, isPending, isError, error } = useLogin();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => {
        toast.success(`Selamat datang! Login berhasil.`);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      },
      onError: error => {
        toast.error(error.message || "Terjadi kesalahan saat login");
      },
    });
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
    <AuthContainer title="Masuk" subtitle="Akses akun Instrumeta Anda" linkText="Daftar" linkHref="/signup" linkQuestion="Belum punya akun?">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Username"
          placeholder="Masukkan username"
          type="text"
          {...register("username", {
            required: "Username wajib diisi",
          })}
          error={errors.username}
        />

        <FormInput
          label="Password"
          placeholder="Masukkan password"
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

        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">{error?.message || "Terjadi kesalahan saat login"}</p>
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
              <span>Masuk</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>
    </AuthContainer>
  );
}
