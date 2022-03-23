import Head from "next/head";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Test.js!</a>
        </h1>
        <p>
          Get started by editing <code>pages/index.tsx</code>
        </p>
      </main>
    </div>
  );
}
