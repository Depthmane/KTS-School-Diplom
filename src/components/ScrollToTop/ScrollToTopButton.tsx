import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./ScrollToTopButton.module.scss";
import {usePagination} from "hooks/usePagination";

type Props = {
    updateURL: (page: number, search: string, categories: string[]) => void;
}

const ScrollToTopButton = ({ updateURL}: Props) => {

    const { handleScrollToTop } = usePagination(updateURL)

    return (
        <motion.button
            className={styles.scrollButton}
            onClick={handleScrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            <FontAwesomeIcon icon={faArrowUp} />
        </motion.button>
    );
};

export default ScrollToTopButton