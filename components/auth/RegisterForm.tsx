"use client";

import { useForm } from "react-hook-form";
import { useRegister } from "@/hooks";
import { CreateUserInput } from "@/actions/types";

interface RegisterFields extends CreateUserInput {
    confirmPassword?: string;
};

export const RegisterForm = () => {

    const {
        registerUserFn,
        setServerError,
        serverError,
        showPassword,
        togglePassword,
        emailSent,
        sentToEmail,
    } = useRegister();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFields>({ mode: "onTouched" });

    const passwordValue = watch("password");

    const onSubmit = async (data: RegisterFields) => {
        setServerError(null);

        // Omit confirmPassword when sending to the server
        const { confirmPassword, ...submitData } = data;

        const error = await registerUserFn(submitData);
        if (error) {
            setServerError(error);
        }
    };

    return (
        <>
        {/* ── Estado: email enviado ── */}
        {emailSent ? (
            <div className="flex flex-col items-center gap-md text-center py-sm">
                <span
                    className="material-symbols-outlined text-secondary"
                    style={{ fontSize: "48px", fontVariationSettings: "'FILL' 1" }}
                >
                    mark_email_read
                </span>
                <h2 className="font-headline-sm text-headline-sm text-primary">
                    ¡Revisa tu correo!
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                    Enviamos un enlace de confirmación a{" "}
                    <strong className="text-secondary">{sentToEmail}</strong>.
                    <br />
                    Haz clic en el enlace para activar tu cuenta.
                </p>
                <p className="font-label-sm text-label-sm text-outline mt-sm">
                    El enlace expira en 24 horas. Revisa también tu carpeta de spam.
                </p>
            </div>
        ) : (
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
                    htmlFor="register-email"
                >
                    Correo Electrónico
                </label>

                <input
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    placeholder="jhondoe@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "register-email-error" : undefined}
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
                        id="register-email-error"
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

            {/* ── Name ── */}
            <div className="flex flex-col gap-xs">
                <label
                    className="font-label-md text-label-md text-primary"
                    htmlFor="register-name"
                >
                    Nombre Completo
                </label>

                <input
                    id="register-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jhon Doe"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "register-name-error" : undefined}
                    {...register("name", {
                        required: "El nombre es obligatorio",
                        minLength: {
                            value: 5,
                            message: "El nombre debe tener al menos 5 caracteres",
                        },
                    })}
                    className={[
                        "w-full bg-transparent border-0 border-b px-0 py-sm",
                        "font-body-md text-body-md text-on-surface placeholder:text-outline",
                        "transition-colors outline-none",
                        errors.name
                            ? "border-error focus:border-error"
                            : "border-outline-variant focus:border-secondary",
                    ].join(" ")}
                />

                {errors.name && (
                    <p
                        id="register-name-error"
                        role="alert"
                        className="flex items-center gap-1 font-label-sm text-label-sm text-error mt-xs animate-field-error"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}
                        >
                            error
                        </span>
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* ── Phone Number ── */}
            <div className="flex flex-col gap-xs">
                <label
                    className="font-label-md text-label-md text-primary"
                    htmlFor="register-phone"
                >
                    Número de Teléfono
                </label>

                <input
                    id="register-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="3001234567"
                    aria-invalid={!!errors.phoneNumber}
                    aria-describedby={errors.phoneNumber ? "register-phone-error" : undefined}
                    {...register("phoneNumber", {
                        required: "El número de teléfono es obligatorio",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "El número de teléfono debe contener solo números",
                        },
                        minLength: {
                            value: 10,
                            message: "El número de teléfono debe tener al menos 10 caracteres",
                        },
                    })}
                    className={[
                        "w-full bg-transparent border-0 border-b px-0 py-sm",
                        "font-body-md text-body-md text-on-surface placeholder:text-outline",
                        "transition-colors outline-none",
                        errors.phoneNumber
                            ? "border-error focus:border-error"
                            : "border-outline-variant focus:border-secondary",
                    ].join(" ")}
                />

                {errors.phoneNumber && (
                    <p
                        id="register-phone-error"
                        role="alert"
                        className="flex items-center gap-1 font-label-sm text-label-sm text-error mt-xs animate-field-error"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}
                        >
                            error
                        </span>
                        {errors.phoneNumber.message}
                    </p>
                )}
            </div>

            {/* ── Password ── */}
            <div className="flex flex-col gap-xs">
                <label
                    className="font-label-md text-label-md text-primary"
                    htmlFor="register-password"
                >
                    Contraseña
                </label>

                <div className="relative flex items-center">
                    <input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? "register-password-error" : undefined}
                        {...register("password", { 
                            required: "La contraseña es obligatoria",
                            minLength: {
                                value: 8,
                                message: "La contraseña debe tener al menos 8 caracteres"
                            }
                        })}
                        className={[
                            "w-full bg-transparent border-0 border-b px-0 py-sm pr-9",
                            "font-body-md text-body-md text-on-surface placeholder:text-outline",
                            "transition-colors outline-none",
                            "[&::-ms-reveal]:hidden [&::-ms-clear]:hidden",
                            errors.password
                                ? "border-error focus:border-error"
                                : "border-outline-variant focus:border-secondary",
                        ].join(" ")}
                    />

                    {/* Visibility toggle */}
                    <button
                        type="button"
                        id="toggle-register-password-visibility"
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        onClick={togglePassword}
                        className="absolute right-0 bottom-2.5 text-outline hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-secondary focus-visible:rounded cursor-pointer"
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
                        id="register-password-error"
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

            {/* ── Confirm Password ── */}
            <div className="flex flex-col gap-xs">
                <label
                    className="font-label-md text-label-md text-primary"
                    htmlFor="register-confirm-password"
                >
                    Repetir Contraseña
                </label>

                <div className="relative flex items-center">
                    <input
                        id="register-confirm-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        aria-invalid={!!errors.confirmPassword}
                        aria-describedby={errors.confirmPassword ? "register-confirm-password-error" : undefined}
                        {...register("confirmPassword", { 
                            required: "Debes repetir la contraseña",
                            validate: (value) => 
                                value === passwordValue || "Las contraseñas no coinciden"
                        })}
                        className={[
                            "w-full bg-transparent border-0 border-b px-0 py-sm pr-9",
                            "font-body-md text-body-md text-on-surface placeholder:text-outline",
                            "transition-colors outline-none",
                            "[&::-ms-reveal]:hidden [&::-ms-clear]:hidden",
                            errors.confirmPassword
                                ? "border-error focus:border-error"
                                : "border-outline-variant focus:border-secondary",
                        ].join(" ")}
                    />
                </div>

                {errors.confirmPassword && (
                    <p
                        id="register-confirm-password-error"
                        role="alert"
                        className="flex items-center gap-1 font-label-sm text-label-sm text-error mt-xs animate-field-error"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}
                        >
                            error
                        </span>
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>

            {/* ── Submit ── */}
            <div className="pt-sm">
                <button
                    id="register-submit"
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
                            <span>Creando cuenta...</span>
                        </>
                    ) : (
                        <>
                            <span>Crear Cuenta</span>
                            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                                person_add
                            </span>
                        </>
                    )}
                </button>
            </div>
        </form>
        )}
        </>
    );
};
