import axios from "axios";
import React, { Component } from "react";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";
import { AiOutlineArrowRight, AiOutlineSearch } from "react-icons/ai";
import { BsArrowRightSquareFill, BsFillHeartFill } from "react-icons/bs";
import arrowImage from "../../../src/images/arrow.jpg";
import moment from "moment/moment";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footArr: [],
      footLength: null,
      searchQuery: "",
      searchArr: [],
      page: 1,
      searchTrigger: false,
    };
    this.handleAll = this.handleAll.bind(this);
  }
  componentDidMount() {
    this.firstCall(this.state.page);
  }
  firstCall = async (page) => {
    let asd = [];
    let revasd = [];
    await axios
      .get(`https://api.npoint.io/20c1afef1661881ddc9c`)
      // .get(`https://hacker-news.firebaseio.com/v0/item/${i + 1}.json`)
      .then(function (response) {
        asd.push(response.data);
        revasd = asd[0].playerList.reverse();
        console.log("rev==>", revasd);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({
      footArr: revasd,
      footLength: asd[0].playerList.length,
    });
    console.log(this.state.footArr);
  };
  search() {
    let search = this.state.searchQuery.toLowerCase();
    let searchLength = search.length;
    const result = this.intenseSearch(search);

    this.setState({
      searchArr: result,
    });
  }
  intenseSearch(searched) {
    debugger;
    let asd = [];
    let searchLength = searched.length;
    for (let i = 0; i < this.state.footLength; i++) {
      debugger;
      if (
        searched ===
          this.state.footArr[i].PFName.substring(
            0,
            searchLength
          ).toLowerCase() ||
        searched ===
          this.state.footArr[i].TName.substring(0, searchLength).toLowerCase()
      ) {
        asd.push(this.state.footArr[i]);
      }
    }
    return asd;
  }

  async handleAll(e) {
    await this.setState({
      searchQuery: e.target.value,
    });
    if (this.state.searchQuery !== "")
      this.setState({
        searchTrigger: true,
      });
    else
      this.setState({
        searchTrigger: false,
      });
    setTimeout(() => {
      this.search();
    }, 1000);
  }
  dateTimeZone(utcDate) {
    debugger;
    const date = new Date(utcDate);
    console.log(date);
    let formated = moment(date).format("DD - MM - YYYY h:mm:ss");
    // var offset = date.getTimezoneOffset();
    return formated;
  }
  render() {
    return (
      <div className="container p-0">
        <h1 className="display-3 my-head">footsal</h1>
        <div className="row">
          <div className="row justify-content-center ">
            <div className="col-lg-6 col-md-6 col-sm-12 my-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search your Favourite Footballer or Team"
                  onChange={this.handleAll}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={(e) => this.search(e)}
                  >
                    <AiOutlineSearch />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row shadow-lg">
          <div className="row justify-content-center">
            <div className="col-lg-12 opaque">
              <div className=" p-2 mt-4">
                {this.state.searchTrigger === false
                  ? this.state.footArr.map((el, index) => {
                      const Images = React.lazy(() =>
                        import(`../../player-images/${el.Id}`)
                      );
                      return (
                        <>
                          <div className="card my-2 shadow " key={index}>
                            <div className="row">
                              <div className="col-1">
                                <div className="wrapper-img">
                                  <img
                                    src={Images}
                                    alt="img"
                                    className="img-fluid  anime-img"
                                  />
                                </div>
                              </div>
                              <div className="col-2 mx-4">
                                <div className="wrap-my-content">
                                  <div className="my-content">
                                    <div className="anime-header">
                                      <p className="anime-title">{el.PFName}</p>
                                    </div>
                                    <div className="anime-btns">
                                      <p className="my-2 me-4 my-btn">
                                        {el.SkillDesc}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="wrap-my-heart h-100 my-3">
                                  <p className="">
                                    <b>Value :</b>
                                    {"$" + el.Value + "M"}
                                  </p>
                                </div>
                              </div>
                              <div className="col-3">
                                <div className="my-arrow h-100">
                                  <div className="d-flex justify-content-end align-items-center h-100">
                                    <p className="">
                                      <b>Upcoming Matches : </b>
                                      {el.UpComingMatchesList[0].CCode === "" ||
                                      null
                                        ? "None"
                                        : el.UpComingMatchesList[0].CCode +
                                          " VS " +
                                          el.UpComingMatchesList[0].CCode}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-3">
                                <div className="my-arrow h-100">
                                  <div className="d-flex justify-content-start align-items-center h-100">
                                    <p className="">
                                      <b>Date and Time : </b>
                                      {el.UpComingMatchesList[0].CCode === "" ||
                                      null
                                        ? "None"
                                        : this.dateTimeZone(
                                            el.UpComingMatchesList[0].MDate
                                          )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  : this.state.searchArr.map((el, index) => {
                      const Images = React.lazy(() =>
                        import(`../../player-images/${el.Id}`)
                      );
                      return (
                        <>
                          <div className="card my-2 shadow " key={index}>
                            <div className="row ">
                              <div className="col-1">
                                <div className="wrapper-img">
                                  <img
                                    src={Images}
                                    alt="img"
                                    className="img-fluid  anime-img"
                                  />
                                </div>
                              </div>
                              <div className="col-4 mx-4">
                                <div className="wrap-my-content">
                                  <div className="my-content">
                                    <div className="anime-header">
                                      <p className="anime-title">{el.PFName}</p>
                                    </div>
                                    <div className="anime-btns">
                                      <p className="my-2 me-4 my-btn">
                                        {el.SkillDesc}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="wrap-my-heart h-100 my-3">
                                  <p className="">
                                    <b>Value :</b>
                                    {"$" + el.Value + "M"}
                                  </p>
                                </div>
                              </div>
                              <div className="col-5">
                                <div className="my-arrow h-100">
                                  <div className="d-flex justify-content-end align-items-center h-100">
                                    <img
                                      src={arrowImage}
                                      alt="arrow"
                                      className="img-fluid my-arrow-img"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}
