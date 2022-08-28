import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

import { useRegisterUserMutation } from "@/store/auth/authApi";
import { toast } from "react-toastify";

import { Modal, styles } from "@/components/layouts/modalLayout";
import { Button, Checkbox, Text, Input, PasswordInput } from "@/components/ui";

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
    if (watch("password") !== value) {
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
    // eslint-disable-next-line
  }, [isLoading, data]);

  useEffect(() => {
    if (isAuth) {
      toast.warning("Вы уже авторизованы", { toastId: "register_warning" });
      handleClose();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Modal title="Зарегистрироваться" handleClose={handleClose}>
      <form className={styles.form} onSubmit={handleSubmit(onRegister)}>
        <div className={cn(styles.top, styles.top_flex)}>
          <Text as="a" href="/auth" color="primary" size="xl" weight={700} hover="s" leading="130">
            Войти
          </Text>
          <Text className={styles.registerTitle} as="h1" leading="120">
            Зарегистрироваться
          </Text>
        </div>
        <div className={styles.registerInputs}>
          <Input
            {...register("login", { required: true })}
            placeholder="Имя учётной записи YaonClub"
            isError={!!errors.login}
          />
          <Input
            {...register("email", { required: true })}
            placeholder="Электронная почта"
            isError={!!errors.email}
          />
          <PasswordInput
            {...register("password", { required: true })}
            placeholder="Пароль"
            isError={!!errors.password}
          />
          <PasswordInput
            {...register("confirm_password", {
              required: true,
              validate: validatePassword,
            })}
            placeholder="Подтвердить пароль"
            isError={!!errors.confirm_password}
          />
          {errors.confirm_password && errors.confirm_password?.message && (
            <div className={styles.errorText}>{errors.confirm_password.message}</div>
          )}
        </div>
        <Checkbox
          {...register("register_checkbox", { required: true })}
          id="register_checkbox"
          className={styles.checkbox}
          label={
            <>
              С <a href="#">лицензионным соглашением</a>, включая <a href="#">агентский договор</a>{" "}
              <a href="#">правилами сайта</a> ознакомился, принимаю в полном объеме
            </>
          }
          isError={!!errors?.register_checkbox}
        />
        <Button
          className={styles.authButton}
          size="large"
          theme="primary_contained"
          disabled={isLoading}
        >
          Зарегистрироваться
        </Button>
      </form>
    </Modal>
  );
};

export default AuthPage;
