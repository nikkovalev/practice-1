import React from "react";
import { ProfileLayout } from "@/components/layouts/profileLayout";
import { Offers } from "@/components/screens/profile/offers/Offers";

const OffersPage = () => {
  return (
    <ProfileLayout title="Ваши предложения">
      <Offers />
    </ProfileLayout>
  );
};

export default OffersPage;
