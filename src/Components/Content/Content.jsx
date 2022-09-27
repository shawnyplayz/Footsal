import moment from 'moment';
import React from 'react';

const Content = (props) => {
  let dateTimeZone = (utcDate) => {
    const date = new Date(utcDate);
    console.log(date);
    let formated = moment(date).format("DD - MM - YYYY h:mm:ss");
    // var offset = date.getTimezoneOffset();
    return formated;
  }
  return (
    <div class="col mb-4">
      <div class="card h-100">
        <img
          src={props.img}
          class="card-img-top h-75"
          alt="No Img"
        />
        <div class="card-body">
          <h5 class="card-title">{props.item.PFName}</h5>
          <p class="card-text">
            <div className="row">
              <div className="col-6">
                <b>Value :</b>
              </div>
              <div className="col-6">
                {"$" + props.item.Value + "M"}
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <h6>Upcoming Matches :</h6>
              </div>
              <div className="col-6">
                <h6>
                  {props.item.UpComingMatchesList[0].CCode === "" ||
                    null
                    ? "None"
                    : props.item.UpComingMatchesList[0].CCode +
                    " VS " +
                    props.item.UpComingMatchesList[0].CCode}
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <h6>Date and Time : </h6>
              </div>
              <div className="col-7">
                {props.item.UpComingMatchesList[0].CCode === "" || null
                  ? "None"
                  : dateTimeZone(
                    props.item.UpComingMatchesList[0].MDate
                  )}
              </div>
            </div>
          </p>
          <div className="anime-btns">
            <p className="my-2 me-4 my-btn">{props.item.SkillDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
