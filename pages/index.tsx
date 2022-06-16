import type { NextPage } from "next";
import { Layout } from "@/components/layouts/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="container">{process.env.API_BASE_URL}</div>
    </Layout>
  );
};

export default Home;
