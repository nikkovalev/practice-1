import React, { useEffect } from "react";
import cn from "classnames";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/hooks/useTypedSelector";

import { useGet2faCodeMutation, useUpdateProfileEmailMutation } from "@/store/auth/authApi";

import { ProfileLayout } from "@/components/layouts";
import { Button, Input, Text } from "@/components/ui";
import { Loader } from "@/components/loader/Loader";

import styles from "./Settings.module.scss";

export const Settings = () => {
  const { user } = useAppSelector((state) => state.auth);
  // Forms
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();
  // Requests
  const [get2faCode, { isLoading: isCodeLoading, data: code }] = useGet2faCodeMutation();
  const [updateProfileEmail, { isLoading: isEmailLoading, data: newEmail }] =
    useUpdateProfileEmailMutation();

  const validatePassword = (value: string) => {
    if (watch("new_password") != value) {
      return "Пароли не совпадают";
    }
    if (
      value.length < 6 ||
      value.length > 30 ||
      watch("new_password").length < 6 ||
      watch("new_password").length > 30
    ) {
      return "Минимальная длина пароля: 6, максимальная: 30";
    }
  };

  const handleConfirm = () => get2faCode("");
  const handleChangePassword = (data: { [key: string]: string }) => console.log(data);
  const handleBindEmail = (data: { [key: string]: string }) => updateProfileEmail(data.email);

  useEffect(() => {
    if (newEmail) {
      toast.success("На вашу почту отправлено письмо с подтверждением");
    }
  }, [newEmail, isEmailLoading]);

  return (
    <ProfileLayout title="Настройки">
      <div className={cn(styles.item, styles.item_password)}>
        <Text className={styles.name} as="h2" color="gray" size="xl" leading="130">
          Изменить пароль
        </Text>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <Input
            {...register("old_password", { required: true })}
            placeholder="Старый пароль"
            isError={errors.old_password}
            isSupportLight={true}
          />
          <Input
            {...register("new_password", { required: true })}
            placeholder="Новый пароль"
            isError={errors.new_password}
            isSupportLight={true}
          />
          <Input
            {...register("confirm_password", { required: true, validate: validatePassword })}
            placeholder="Подтвердите пароль"
            isError={errors.confirm_password}
            isSupportLight={true}
          />
          <Button className={styles.button} size="large" theme="primary_outlined">
            Изменить
          </Button>
        </form>
        {errors.confirm_password && (
          <div className="text-red-100 mt-4 text-center w-full">
            {errors.confirm_password.message}
          </div>
        )}
      </div>
      <div className={styles.item}>
        <Text className={styles.name} as="h2" color="gray" size="xl" leading="130">
          Привязать почту
        </Text>
        <form onSubmit={handleSubmit2(handleBindEmail)}>
          <Input
            {...register2("email", { required: true })}
            placeholder="Электронная почта"
            isError={errors2.email}
            isSupportLight={true}
          />
          <Button
            className={styles.button}
            size="large"
            theme="primary_outlined"
            disabled={isEmailLoading}
          >
            Привязать
          </Button>
        </form>
      </div>
      {!user?.telegramId && (
        <>
          <Text className={styles.name} as="h2" color="gray" size="xl" leading="130">
            Подтвердить аккаунт
          </Text>
          <Button
            className={styles.button}
            size="large"
            theme="primary_outlined"
            onClick={handleConfirm}
            disabled={isCodeLoading || !!code}
          >
            Подтвердить аккаунт
          </Button>
          {(isCodeLoading || code) && (
            <div className={styles.code}>
              {isCodeLoading ? (
                <Loader />
              ) : (
                code?.token.split("").map((l, idx) => <span key={`${l}_${idx}`}>{l}</span>)
              )}
            </div>
          )}
        </>
      )}
    </ProfileLayout>
  );
};
