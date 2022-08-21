import { NextPage } from "next";
import { Reviews } from "@/components/reviews/Reviews";
import { ProfileLayout } from "@/components/layouts/profileLayout";

const ReviewPage: NextPage = () => (
  <ProfileLayout title="Отзывы" hideTitle={true}>
    <Reviews />
  </ProfileLayout>
);
export default ReviewPage;
