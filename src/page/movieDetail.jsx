import React, { Component } from "react";
import GridLoader from "react-spinners/GridLoader";
import Amovie from "./../components/amovieInfo";
import { getaMovie, getaTv, clearStateMovie } from "../actions";
import { connect } from "react-redux";
import { css } from "@emotion/core";

const override = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 50%;
  height: 30%;
  margin: auto;
`;

class MovieDetail extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      if (this.props.match.params.status === 'movie'){
        this.props.getaMovie(nextProps.match.params.id);
      }else{
        this.props.getaTv(nextProps.match.params.id);
      }
        
    }
  }
  componentDidMount() {
    if (this.props.match.params.status === "movie") {
      this.props.getaMovie(this.props.match.params.id);
    } else {
      this.props.getaTv(this.props.match.params.id);
    }
  }

  render() {
    window.scrollTo(null, null);
    if (this.props.error !== null) {
      this.props.history.push("/not-found");
    }
    if (this.props.movieinfo !== null) {
      const { genres, movieinfo } = this.props;
      return (
        <div style={{paddingBottom: "100px"}}>
          <Amovie genres={genres} movieinfo={movieinfo} />
        </div>
      );
    } else return <GridLoader css={override} size={25} color={"white"} />;
  }
}

const mapStateToProps = ({ movieid, error, movies, genres, movieinfo }) => ({
  movieid,
  error,
  movies,
  genres,
  movieinfo
});
const mapDispatchToProps = (dispatch) => ({
  // loadRecMovies: id => dispatch(loadRecMovies(id)),
  getaMovie: (id) => dispatch(getaMovie(id)),
  getaTv: (id) => dispatch(getaTv(id)),
  clearStateMovie: () => dispatch(clearStateMovie()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetail);
