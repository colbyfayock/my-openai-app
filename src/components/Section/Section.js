import styles from './Section.module.scss';

const Section = ({ children, ...rest}) => {
  return (
    <section className={styles.section} {...rest}>
      {children}
    </section>
  );
};

export default Section;
