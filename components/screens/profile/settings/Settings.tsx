import React from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/hooks/useTypedSelector";

import { useGet2faCodeMutation } from "@/store/auth/authApi";

import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui";
import { Loader } from "@/components/loader/Loader";

import styles from "./Settings.module.scss";

export const Settings = () => {
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
  const { user } = useAppSelector((state) => state.auth);
  const [get2faCode, { isLoading: is2faCodeLoading, data: dataCode }] = useGet2faCodeMutation();

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
  const handleBindEmail = (data: { [key: string]: string }) => console.log(data);

  return (
    <div className={styles.settings}>
      <h3>Изменить пароль</h3>
      <div className={styles.settingsItem}>
        <form className="justify-between" onSubmit={handleSubmit(handleChangePassword)}>
          <Input
            {...register("old_password", { required: true })}
            placeholder="Старый пароль"
            isError={errors.old_password}
          />
          <Input
            {...register("new_password", { required: true })}
            placeholder="Новый пароль"
            isError={errors.new_password}
          />
          <Input
            {...register("confirm_password", { required: true, validate: validatePassword })}
            placeholder="Подтвердите пароль"
            isError={errors.confirm_password}
          />
          <Button size="large" variant="outlined">
            Изменить
          </Button>
        </form>
        {errors.confirm_password && (
          <div className="text-red-100 mt-4 text-center w-full">
            {errors.confirm_password.message}
          </div>
        )}
      </div>
      <h3>Привязать почту</h3>
      <div className={styles.settingsItem}>
        <form onSubmit={handleSubmit2(handleBindEmail)}>
          <Input
            {...register2("email", { required: true })}
            placeholder="Электронная почта"
            isError={errors2.email}
          />
          <Button size="large" variant="outlined">
            Привязать
          </Button>
        </form>
      </div>
      <h3>Подтвердить аккаунт</h3>
      <Button
        size="large"
        variant="outlined"
        onClick={handleConfirm}
        isDisabled={is2faCodeLoading || !!dataCode}
      >
        Подтвердить аккаунт
      </Button>
      {(is2faCodeLoading || dataCode) && (
        <div className={styles.code}>{is2faCodeLoading ? <Loader /> : dataCode?.token}</div>
      )}
    </div>
  );
};
