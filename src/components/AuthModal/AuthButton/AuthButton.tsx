import * as React from 'react';
import clsx from "clsx";
import styles from './AuthButton.module.scss';
import Loader from 'components/Loader';
import Text from "components/Text";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    children: React.ReactNode;
    loaderSize?: 's' | 'm' | 'l';
    loaderColor?: string;
};

const AuthButton: React.FC<ButtonProps> = ({
                                               loading,
                                               children,
                                               className,
                                               loaderSize = 's',
                                               loaderColor = 'var(--text-accent)',
                                               ...props
                                           }) => {
    return (
        <button className={clsx(styles.btn, loading && styles.btnLoading, className)}>
  <span className={styles.content}>
    {loading && <Loader size={loaderSize} color={loaderColor} />}
      <Text view="button" color="inherit" className={clsx(loading && styles.textLoading)}>
      {children}
    </Text>
  </span>
        </button>
    );
};

export default AuthButton;
