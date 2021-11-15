import 'antd/dist/antd.css';
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Layout} from "antd";
import Head from 'next/head';
import {useEffect, useState} from "react";
import {TopHeader} from "../components/top-header";
import Link from 'next/link';

function MyApp({Component, pageProps}: AppProps) {
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);


  return (
      <>
        <Head>
          <title>Funny Movies</title>

          {/* eslint-disable-next-line @next/next/no-css-tags */}
          <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet"/>
        </Head>

        <Layout className="layout">
          <Layout.Header>
            <div className={"d-flex justify-content-between"}>
              <div className="logo text-white">
                <Link href="/">Funny Movies</Link>
              </div>
              <TopHeader/>
            </div>
          </Layout.Header>
          <Layout.Content style={{padding: '50px 50px', minHeight: '80vh'}}>
            <div className="container">
              <Component {...pageProps} />
            </div>
          </Layout.Content>
          <Layout.Footer style={{textAlign: 'center'}}>Funny Movies</Layout.Footer>
        </Layout>
      </>
  );
}

export default MyApp
