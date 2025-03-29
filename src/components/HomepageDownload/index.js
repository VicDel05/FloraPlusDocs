import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export default function HomepageDownload() {
  return (
    <section>
      <div>
        <div className={clsx(styles.btnlayer)}>
          <Link
            className="button button--secondary button--lg"
            to="/download-page"
          >
            Descarga la App
          </Link>
        </div>
      </div>
    </section>
  );
}
