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
import Content from "../Content/Content";

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
      imgs: null,
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
    let asd = [];
    let searchLength = searched.length;
    for (let i = 0; i < this.state.footLength; i++) {
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
    const date = new Date(utcDate);
    console.log(date);
    let formated = moment(date).format("DD - MM - YYYY h:mm:ss");
    // var offset = date.getTimezoneOffset();
    return formated;
  }
  importAll(r) {
    return r.keys().map(r);
  }
  imageRender(id) {
    this.state.imgs = this.importAll(
      require.context(`../../player-images/`, false, /\.(png|jpe?g|svg)$/)
    );
    for (let j = 0; j < this.state.imgs.length; j++) {
      if (this.state.imgs[j].includes(id)) {
        debugger;
        return this.state.imgs[j];
      }
    }
    console.log("Images=>", this.state.imgs);
  }
  render() {
    return (
      <div className="container p-0">
        <h1 className="display-3 my-head">Footsal</h1>
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
        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {this.state.searchTrigger === false
              ? this.state.footArr.map((el, index) => {
                  let imigur = this.imageRender(el.Id);
                  return <Content img={imigur} item={el} />;
                })
              : this.state.searchArr.map((el, index) => {
                  let imigur = this.imageRender(el.Id);

                  return <Content img={imigur} item={el} />;
                })}
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}
