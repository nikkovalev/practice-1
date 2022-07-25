import React, { useEffect } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

import { useRegisterUserMutation } from "@/store/auth/authApi";
import { toast } from "react-toastify";

import { Modal, styles as modalStyles } from "@/components/modal/Modal";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui/Input/Input";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";

const AuthPage: NextPage = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registerUser, { isLoading, data }] = useRegisterUserMutation();
  const { saveUserId } = useActions();
  const { isAuth } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const validatePassword = (value: string) => {
    if (watch("password") != value) {
      return "Пароли не совпадают";
    }
    if (
      value.length < 6 ||
      value.length > 30 ||
      watch("password").length < 6 ||
      watch("password").length > 30
    ) {
      return "Минимальная длина пароля: 6, максимальная: 30";
    }
  };

  const handleClose = () => router.push("/auth");
  const onRegister = (data: { [key: string]: any }) => {
    registerUser({
      username: data.login,
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (!isLoading && data) {
      saveUserId(data.id);
      toast.success("Успешная регистрация");
      router.push("/auth");
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (isAuth) {
      toast.warning("Вы уже авторизованы", { toastId: "register_warning" });
      handleClose();
    }
  }, []);

  return (
    <Modal title="Зарегистрироваться" handleClose={handleClose}>
      <form className="flex flex-col items-center" onSubmit={handleSubmit(onRegister)}>
        <div className={modalStyles.modalTop}>
          <Link href="/auth">
            <a>
              <h3 className="text-primary-400 font-bold">Войти</h3>
            </a>
          </Link>
          <h1 className="ml-[50px] sm:ml-[25px]">Зарегистрироваться</h1>
        </div>
        <div className={modalStyles.registerInputs}>
          <Input
            {...register("login", { required: true })}
            className="mb-5"
            placeholder="Имя учётной записи YaonPay"
            isError={!!errors.login}
          />
          <Input
            {...register("email", { required: true })}
            className="mb-5"
            placeholder="Электронная почта"
            isError={!!errors.email}
          />
          <Input
            {...register("password", { required: true })}
            type="password"
            placeholder="Пароль"
            isError={!!errors.password}
          />
          <Input
            {...register("confirm_password", {
              required: true,
              validate: validatePassword,
            })}
            type="password"
            placeholder="Подтвердить пароль"
            isError={!!errors.confirm_password}
          />
          {errors.confirm_password && (
            <div className="text-red-100 mt-4 text-center w-full">
              {errors.confirm_password.message}
            </div>
          )}
        </div>
        <div
          className={cn(modalStyles.checkbox, {
            [modalStyles.checkboxError]: errors.register_checkbox,
          })}
        >
          <input
            {...register("register_checkbox", { required: true })}
            id="register_checkbox"
            type="checkbox"
          />
          <label htmlFor="register_checkbox">
            С<a href="#"> лицензионным соглашением</a>, включая
            <a href="#"> агентский договор правилами сайта </a>
            ознакомился, принимаю в полном объеме
          </label>
        </div>
        <Button className={modalStyles.authButton} size="large" isDisabled={isLoading}>
          Зарегистрироваться
        </Button>
      </form>
    </Modal>
  );
};

export default AuthPage;
