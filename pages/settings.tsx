import React from "react";
import { NextPage } from "next";

import { ProfileLayout } from "@/components/layouts/profileLayout/ProfileLayout";
import { Settings } from "@/components/screens/profile/settings/Settings";

const SettingsPage: NextPage = () => {
  return (
    <ProfileLayout title="Настройки" pageName="Настройки">
      <Settings />
    </ProfileLayout>
  );
};

export default SettingsPage;
