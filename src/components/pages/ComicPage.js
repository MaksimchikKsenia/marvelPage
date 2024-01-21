import ComicsPage from "../comicsPage/ComicsPage";
import AppBanner from "../appBanner/AppBanner";
import { Helmet } from "react-helmet";

const ComicPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page with comics" />
        <title>Comics Page</title>
      </Helmet>
      <AppBanner />
      <ComicsPage />
    </>
  );
};

export default ComicPage;
