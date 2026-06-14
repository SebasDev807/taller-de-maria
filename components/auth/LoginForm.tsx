"use client";

import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks";

interface LoginFields {
    email: string;
    password: string;
};

export const LoginForm = () => {

    const {
        login,
        setServerError,
        serverError,
        showPassword,
        togglePassword
    } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFields>({ mode: "onTouched" });

    const onSubmit = async (data: LoginFields) => {
        setServerError(null);

        const formData = new FormData();
        formData.set("email", data.email);
        formData.set("password", data.password);

        const error = await login(formData);
        if (error) {
            setServerError(error);
        }
    };

    return (
        <form
            className="flex flex-col gap-md"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            {/* ── Server error banner ── */}
            {serverError && (
                <div
                    role="alert"
                    className="flex items-center gap-2 bg-error-container text-on-error-container font-label-sm text-label-sm px-4 py-3 rounded-lg animate-field-error"
                >
                    <span
                        className="material-symbols-outlined shrink-0"
                        style={{ fontSize: "18px", fontVariationSettings: "'FILL' 1" }}
                    >
                        error
                    </span>
                    <span>{serverError}</span>
                </div>
            )}

            {/* ── Email ── */}
            <div className="flex flex-col gap-xs">
                <label
                    className="font-label-md text-label-md text-primary"
                    htmlFor="login-email"
                >
                    Correo Electrónico
                </label>

                <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="jhondoe@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "login-email-error" : undefined}
                    {...register("email", {
                        required: "El correo es obligatorio",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ingresa un correo válido",
                        },
                    })}
                    className={[
                        "w-full bg-transparent border-0 border-b px-0 py-sm",
                        "font-body-md text-body-md text-on-surface placeholder:text-outline",
                        "transition-colors outline-none",
                        errors.email
                            ? "border-error focus:border-error"
                            : "border-outline-variant focus:border-secondary",
                    ].join(" ")}
                />

                {errors.email && (
                    <p
                        id="login-email-error"
                        role="alert"
                        className="flex items-center gap-1 font-label-sm text-label-sm text-error mt-xs animate-field-error"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}
                        >
                            error
                        </span>
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* ── Password ── */}
            <div className="flex flex-col gap-xs">
                <div className="flex justify-between items-baseline">
                    <label
                        className="font-label-md text-label-md text-primary"
                        htmlFor="login-password"
                    >
                        Contraseña
                    </label>
                    <a
                        href="#"
                        tabIndex={-1}
                        className="font-label-sm text-label-sm text-secondary hover:underline underline-offset-4 transition-all"
                    >
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>

                <div className="relative flex items-center">
                    <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? "login-password-error" : undefined}
                        {...register("password", { required: "La contraseña es obligatoria" })}
                        className={[
                            "w-full bg-transparent border-0 border-b px-0 py-sm pr-9",
                            "font-body-md text-body-md text-on-surface placeholder:text-outline",
                            "transition-colors outline-none",
                            // Hide the native browser password-reveal button (Edge/IE)
                            "[&::-ms-reveal]:hidden [&::-ms-clear]:hidden",
                            errors.password
                                ? "border-error focus:border-error"
                                : "border-outline-variant focus:border-secondary",
                        ].join(" ")}
                    />

                    {/* Visibility toggle */}
                    <button
                        type="button"
                        id="toggle-password-visibility"
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        onClick={togglePassword}
                        className="absolute right-0 bottom-2.5 text-outline hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-secondary focus-visible:rounded"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{
                                fontSize: "20px",
                                fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20",
                            }}
                        >
                            {showPassword ? "visibility_off" : "visibility"}
                        </span>
                    </button>
                </div>

                {errors.password && (
                    <p
                        id="login-password-error"
                        role="alert"
                        className="flex items-center gap-1 font-label-sm text-label-sm text-error mt-xs animate-field-error"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}
                        >
                            error
                        </span>
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* ── Submit ── */}
            <div className="pt-sm">
                <button
                    id="admin-login-submit"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-secondary-container text-primary-container font-label-md text-label-md py-sm px-md rounded-lg flex items-center justify-center gap-sm hover:scale-[0.98] active:scale-95 transition-transform duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                    style={{ boxShadow: "0 4px 14px -2px rgba(126, 87, 0, 0.22)" }}
                >
                    {isSubmitting ? (
                        <>
                            <span
                                className="material-symbols-outlined animate-spin"
                                style={{ fontSize: "18px" }}
                            >
                                progress_activity
                            </span>
                            <span>Verificando...</span>
                        </>
                    ) : (
                        <>
                            <span>Ingresar</span>
                            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                                login
                            </span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};