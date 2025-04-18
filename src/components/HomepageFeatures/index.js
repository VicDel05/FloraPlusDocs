import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

import lighting from '../../../static/img/lighting.png'
import ux from '../../../static/img/ux.png'
import unity from '../../../static/img/unity.png'

const FeatureList = [
  {
    title: 'Intuitiva y rápida',
    image: lighting,
    description: (
      <>
        FloraPlus emplea una interfaz limpia y minimalista, permite al usuario concentrarse en su entorno con realidad aumentada.
      </>
    ),
  },
  {
    title: 'Experiencia inmersiva',
    image: ux,
    description: (
      <>
        Ver a través de un plano virtual brinda la posibilidad de liberar la creatividad para darle vida a sus espacios.
      </>
    ),
  },
  {
    title: 'Desarrollado con Unity y C#',
    image: unity,
    description: (
      <>
        Aprovechamos las características que ofrece Unity en conjunto con C# para brindar una experiencia fluida y adaptable a los dispositivos móviles.
      </>
    ),
  },
];

function Feature({image, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={image} className={styles.featureSvg} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
