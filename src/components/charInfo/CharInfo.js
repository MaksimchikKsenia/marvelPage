import { Component } from "react";
import PropTypes from "prop-types";
import "./charInfo.scss";
import thor from "../../resources/img/thor.jpeg";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }
    this.onCharLoading();
    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const { char, loading, error } = this.state;
    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  //здесь char из пропсов

  let imgStyle = { objectFit: "cover" };
  if (
    char.thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }
  return (
    <>
      <div className="char__basics">
        <img src={char.thumbnail} alt={char.name} style={imgStyle} />
        <div>
          <div className="char__info-name">{char.name}</div>
          <div className="char__btns">
            <a href={char.homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={char.wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{char.descption}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {char.comics.length > 0 ? null : "There is no comics yet"}
        {char.comics.map((item, i) => {
          if (i > 9) return;
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};
export default CharInfo;
