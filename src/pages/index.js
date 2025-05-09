import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import Heading from "@theme/Heading";
import styles from "./index.module.css";
import HomepageDownload from "../components/HomepageDownload";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className={clsx(
        "hero hero--primary",
        styles.heroBanner,
        styles.imgBackground
      )}
    >
      <div className={clsx("container")}>
        <Heading as="h1" className={clsx(styles.imgHeader, styles.titleLayer)}>
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="FloraPlus Docs"
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageDownload />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
