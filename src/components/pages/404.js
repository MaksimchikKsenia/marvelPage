import ErrorMessage from "../errorMessage/errorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  const styles = {
    container: {
      textAlign: "center",
      marginTop: "50px",
    },
    paragraph: {
      fontSize: "18px",
      color: "#333",
      marginBottom: "20px",
    },
    link: {
      textDecoration: "none",
      color: "#007bff",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <ErrorMessage />
      <p style={styles.paragraph}>Страница не существует</p>
      <Link to="/" style={styles.link}>
        Вернуться на главную
      </Link>
    </div>
  );
};

export default Page404;
