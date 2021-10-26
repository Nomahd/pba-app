import Head from "next/head";

const Home = () => {
  return (
    <div>
      <Head>
        <title>PBAアプリマネージャ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

Home.auth = true;
export default Home;
