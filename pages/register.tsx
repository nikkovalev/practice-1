import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

import { useRegisterUserMutation } from "@/store/auth/authApi";
import { toast } from "react-toastify";

import { Modal, styles as modalStyles, styles } from "@/components/layouts/modalLayout";
import { Button, Checkbox, Text, Input } from "@/components/ui";

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
        <div className={cn(modalStyles.top, modalStyles.top_flex)}>
          <Text as="a" href="/auth" color="primary" size="xl" weight={700}>
            Войти
          </Text>
          <Text
            className="ml-[50px] sm:ml-[25px] xs:ml-0 xs:mb-[10px]"
            as="h1"
            size="xxl"
            weight={700}
          >
            Зарегистрироваться
          </Text>
        </div>
        <div className={modalStyles.registerInputs}>
          <Input
            {...register("login", { required: true })}
            className="mb-5"
            placeholder="Имя учётной записи YaonClub"
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
          {errors.confirm_password && errors.confirm_password?.message && (
            <div className="text-red-100 text-center w-full">{errors.confirm_password.message}</div>
          )}
        </div>
        <Checkbox
          {...register("register_checkbox", { required: true })}
          className={styles.checkbox}
          id="register_checkbox"
          color="gray"
          label={
            <>
              С <a href="#">лицензионным соглашением</a>, включая <a href="#">агентский договор</a>{" "}
              <a href="#">правилами сайта</a> ознакомился, принимаю в полном объеме
            </>
          }
          isError={!!errors?.register_checkbox}
        />
        <Button className={modalStyles.authButton} size="large" isDisabled={isLoading}>
          Зарегистрироваться
        </Button>
      </form>
    </Modal>
  );
};

export default AuthPage;
