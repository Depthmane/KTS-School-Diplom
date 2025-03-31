import * as React from "react";
import { Link } from "react-router-dom";
import Text from "components/Text/Text";
import styles from "./NotFoundPage.module.scss"

const NotFoundPage: React.FC = () => {
    return (
        <div className={styles.missingPage}>
            <Text view="title">404</Text>
            <Text color="secondary" view="p-18">Страница не найдена</Text>
            <Link to="/">
                <Text view="p-20"> Вернуться на главную </Text>
            </Link>
        </div>
    );
};

export default NotFoundPage;
