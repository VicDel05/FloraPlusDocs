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
            to="/docs/getting-started/Instalacion"
          >
            Descarga la App
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs"
          >
            Documentación
          </Link>
        </div>
      </div>
    </section>
  );
}
