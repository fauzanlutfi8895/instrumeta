"use client";

import Link from "next/link";

interface AuthContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  linkQuestion: string;
}

export const AuthContainer = ({ children, title, subtitle, linkText, linkHref, linkQuestion }: AuthContainerProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-8 md:p-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 text-sm mt-2">{subtitle}</p>
          </div>

          {/* Form */}
          {children}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {linkQuestion}{" "}
              <Link href={linkHref} className="font-semibold text-blue-500 hover:text-blue-600 transition-colors">
                {linkText}
              </Link>
            </p>
          </div>
        </div>

        {/* Branding */}
        <div className="mt-6 text-center text-gray-500 text-xs">
          <p>Instrumeta © 2025</p>
        </div>
      </div>
    </div>
  );
};
