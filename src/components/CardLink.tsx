import { Inter } from 'next/font/google';
import styles from '@/styles/CardLink.module.css';

const inter = Inter({ subsets: ['latin'] });

type CardLinkProps = {
  href: string;
  title: string;
  description: string;
};

export default function CardLink({ href, title, description }: CardLinkProps) {
  return (
    <a
      href={href}
      className={styles.card}
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className={inter.className}>
        {title} <span>-&gt;</span>
      </h2>
      <p className={inter.className}>{description}</p>
    </a>
  );
}
