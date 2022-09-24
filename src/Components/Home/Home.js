import axios from "axios";
import React, { Component } from "react";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";
import { AiOutlineArrowRight, AiOutlineSearch } from "react-icons/ai";
import { BsArrowRightSquareFill, BsFillHeartFill } from "react-icons/bs";
import arrowImage from "../../../src/images/arrow.jpg";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animeArr: [],
      animeLength: null,
      searchQuery: "",
      page: 1,
    };
    this.handleAll = this.handleAll.bind(this);
    this.clickNextButton = this.clickNextButton.bind(this);
    this.clickPrevButton = this.clickPrevButton.bind(this);
  }
  componentDidMount() {
    this.firstCall(this.state.page);
  }
  firstCall = async (page) => {
    debugger;
    let asd = [];
    await axios
      .get(
        `https://api.jikan.moe/v4/characters?page=${page}&limit=15&q&order_by=fav
orites&sort=desc`
      )
      // .get(`https://hacker-news.firebaseio.com/v0/item/${i + 1}.json`)
      .then(function (response) {
        asd.push(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    debugger;
    this.setState({
      animeArr: asd[0].data,
      animeLength: asd[0].pagination.items.total,
    });
  };
  async search(page) {
    debugger;
    let asd = [];
    if (this.state.searchQuery === "") {
      this.firstCall(page);
    } else {
      let urlSearch = this.state.searchQuery;
      console.log(urlSearch);
      await axios
        .get(
          `https://api.jikan.moe/v4/characters?page=${page}&limit=15&q=${urlSearch}&order_by=fav
orites&sort=desc`
        )
        .then(function (response) {
          asd.push(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      // if ((asd[0].data).length === 0) {
      //   this.setState({
      //     animeArr: null
      //   })
      // }
      this.setState({
        animeArr: asd[0].data ? asd[0].data : [],
        animeLength: asd[0].pagination.items.total,
      });
    }
  }

  async handleAll(e) {
    debugger;
    await this.setState({
      searchQuery: e.target.value,
      page: 1,
    });
    setTimeout(() => {
      this.search(this.state.page);
    }, 1000);
  }
  async clickNextButton() {
    debugger;
    await this.setState({
      page: this.state.page + 1,
    });
    this.search(this.state.page);
  }
  async clickPrevButton() {
    await this.setState({
      page: this.state.page - 1,
    });
    this.search(this.state.page);
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
                  placeholder="Search your Character"
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
        {/* <div className="row justify-content-center ">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <h5>
              Total {this.state.animeLength} matching anime Characters found
            </h5>
          </div>
        </div> */}
        <div className="row  shadow-lg">
          <div className="row justify-content-center">
            <div className="col-lg-12 opaque">
              <div className=" p-2 mt-4">
                {this.state.animeLength !== 0 ? (
                  this.state.animeArr.map((el, index) => {
                    return (
                      <>
                        <div className="card my-2 shadow " key={index}>
                          <div className="row ">
                            <div className="col-1">
                              <div className="wrapper-img">
                                <img
                                  src={el.images.jpg.image_url}
                                  alt="img"
                                  className="img-fluid  anime-img"
                                />
                              </div>
                            </div>
                            <div className="col-6 mx-4">
                              <div className="wrap-my-content">
                                <div className="my-content">
                                  <div className="anime-header">
                                    <p className="anime-title">{el.name}</p>
                                  </div>
                                  <div className="anime-btns">
                                    {el.nicknames.map((item) => (
                                      <p className="my-2 me-4 my-btn">{item}</p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-2">
                              <div className="wrap-my-heart h-100 my-3">
                                <p className="">
                                  <BsFillHeartFill className="mx-2 text-danger" />
                                  {el.favorites}
                                </p>
                              </div>
                            </div>
                            <div className="col-2">
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
                  })
                ) : (
                  <>
                    <h2>No Results Found!</h2>
                  </>
                )}
              </div>
            </div>
            <div className="container d-flex justify-content-between my-3">
              <button
                disabled={this.state.page <= 1}
                type="button"
                className="btn btn-dark mr-4"
                onClick={this.clickPrevButton}
              >
                &larr; Prev
              </button>
              <button
                disabled={
                  this.state.page + 1 > Math.ceil(this.state.animeLength / 15)
                }
                type="button"
                className="btn btn-dark mr-4"
                onClick={this.clickNextButton}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}
