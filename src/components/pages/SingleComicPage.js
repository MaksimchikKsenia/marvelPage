import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

import "./singleComic.scss";
import xMen from "../../resources/img/x-men.png";

const SingleComicPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const { error, loading, getComic, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const onComicLoaded = (char) => {
    setComic(char);
  };

  const updateComic = () => {
    clearError();
    getComic(comicId).then(onComicLoaded);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  const { fullTitle, descption, thumbnail, price, language, pageCount } = comic;

  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={`${fullTitle} comics book`} />
        <title>{fullTitle}</title>
      </Helmet>
      <img src={thumbnail} alt="x-men" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{fullTitle} </h2>
        <p className="single-comic__descr">{descption}</p>
        <p className="single-comic__descr">{pageCount} pages</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
