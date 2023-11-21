import React, { useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Axios from 'axios';
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { endpoint } from "views/util/port";

import { bugs, website, server } from "variables/general.js";

import {
  noOfReviews,
  mostRev,
  avgRatingsChart,
  jobSeekersReviews,
  topCEO,
  topCompanies
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


// const useStyles = makeStyles(styles);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noOfReviews: [],
      data1: {},
      mostRevComp: [],
      data2: {},
      avgRating: [],
      data3: {},
      topJobS: [],
      data4: {},
      topCeoR: [],
      data5: {},
      dViews: [],
      data6: {},
    };
  }

  componentDidMount() {
    const noOfRev = [];
    const mostRevCom = [];
    const avgR = [];
    const topJob = [];
    const topCEO = [];
    const views = [];
    // Axios.defaults.withCredentials = true;
    Axios.get(endpoint+'/reviewsperday')
      .then((res) => {
        if (res) {
          console.log(res.data);
          if (res.data.length >= 0) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.data.length; i++) {
              noOfRev.push(res.data[i]);
            }
          }
          this.setState({ noOfReviews: noOfRev });
          this.noOfReviews();
        }
      }).catch((err) => {
        throw err;
      });

    // Axios.defaults.withCredentials = true;
    Axios.get(endpoint+'/mostreviewedcompanies')
      .then((res) => {
        if (res) {
          console.log(res.data);
          if (res.data.length >= 0) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.data.length; i++) {
              mostRevCom.push(res.data[i]);
            }
          }
          this.setState({ mostRevComp: mostRevCom });
          this.mostRevCompanies();
        }
      }).catch((err) => {
        throw err;
      });

    // Axios.defaults.withCredentials = true;
    Axios.get(endpoint+'/avgratings')
      .then((res) => {
        if (res) {
          console.log(res.data);
          if (res.data.length >= 0) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.data.length; i++) {
              avgR.push(res.data[i]);
            }
          }
          this.setState({ avgRating: avgR });
          this.avgRatings();
          }
      }).catch((err) => {
        throw err;
      });

    // Axios.defaults.withCredentials = true;
    Axios.get(endpoint+'/jobseekerreviews')
      .then((res) => {
        if (res) {
          console.log(res.data);
          if (res.data.length >= 0) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.data.length; i++) {
              topJob.push(res.data[i]);
            }
          }
          this.setState({ topJobS: topJob });
          this.topJobSeek();
        }
      }).catch((err) => {
        throw err;
      });

    // Axios.defaults.withCredentials = true;
    Axios.get(endpoint+'/topceos')
      .then((res) => {
        if (res) {
          console.log(res.data);
          if (res.data.length >= 0) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.data.length; i++) {
              topCEO.push(res.data[i]);
            }
          }
          this.setState({ topCeoR: topCEO });
          this.topCeoRev();
        }
      }).catch((err) => {
        throw err;
      });

    // Axios.defaults.withCredentials = true;
    Axios.get(endpoint+'/dailyviews')
      .then((res) => {
        if (res) {
          console.log(res.data);
          if (res.data.length >= 0) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.data.length; i++) {
              views.push(res.data[i]);
            }
          }
          this.setState({ dViews: views });
          this.dailyViews();
        }
      }).catch((err) => {
        throw err;
      });
  }


  noOfReviews = () =>{
    const labels= [];
    const seriesTemp= [];
    // console.log(labels);
    console.log(seriesTemp);
    const series = [seriesTemp];
    console.log(series);
    for(var i=0;i<this.state.noOfReviews.length;i++){
      labels.push(this.state.noOfReviews[i].createdAt);
      seriesTemp.push(this.state.noOfReviews[i].count);
    }
    const data1 = { labels: labels, series: series};
    this.setState({ data1: data1});
    
  }

   mostRevCompanies = () =>{
    const labels= [];
    const seriesTemp= [];
    // console.log(labels);
    console.log(seriesTemp);
    const series = [seriesTemp];
    console.log(series);
    for(var i=0;i<this.state.mostRevComp.length;i++){
      labels.push(this.state.mostRevComp[i].companyName);
      seriesTemp.push(this.state.mostRevComp[i].count);
    }
    const data2 = { labels: labels, series: series};
    this.setState({ data2: data2});
    
  }

  avgRatings = () =>{
    const labels= [];
    const seriesTemp= [];
    // console.log(labels);
    console.log(seriesTemp);
    const series = [seriesTemp];
    console.log(series);
    for(var i=0;i<this.state.avgRating.length;i++){
      labels.push(this.state.avgRating[i].companyName);
      seriesTemp.push(this.state.avgRating[i].avgrating);
    }
    const data3 = { labels: labels, series: series};
    this.setState({ data3: data3});
    
  }

  topJobSeek = () =>{
    const labels= [];
    const seriesTemp= [];
    // console.log(labels);
    console.log(seriesTemp);
    const series = [seriesTemp];
    console.log(series);
    for(var i=0;i<this.state.topJobS.length;i++){
      labels.push(this.state.topJobS[i].applicantName);
      seriesTemp.push(this.state.topJobS[i].count);
    }
    const data4 = { labels: labels, series: series};
    this.setState({ data4: data4});
    
  }

  topCeoRev = () => {
    const labels= [];
    const seriesTemp= [];
    // console.log(labels);
    console.log(seriesTemp);
    const series = [seriesTemp];
    console.log(series);
    for(var i=0;i<this.state.topCeoR.length;i++){
      labels.push(this.state.topCeoR[i].ceoName);
      seriesTemp.push(this.state.topCeoR[i].ceoRating);
    }
    const data5 = { labels: labels, series: series};
    this.setState({ data5: data5 });  
  }

  dailyViews = () => {
    const labels= [];
    const seriesTemp= [];
    // console.log(labels);
    console.log(seriesTemp);
    const series = [seriesTemp];
    console.log(series);
    for(var i=0;i<this.state.dViews.length;i++){
      labels.push(this.state.dViews[i].employerName);
      seriesTemp.push(this.state.dViews[i].dailyViews);
    }
    const data6 = { labels: labels, series: series};
    this.setState({ data6: data6 });  
  }

  render() {
    let useStyles = makeStyles(styles);
    return (
      <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="primary">
              <ChartistGraph
                className="ct-chart"
                data={this.state.data1}
                type="Line"
                options={noOfReviews.options}
                listener={noOfReviews.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={useStyles.cardTitle}>Number of Reviews Per Day</h4>
              <p className={useStyles.cardCategory}>
                {/* <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "} */}
                Last 7 days.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={useStyles.stats}>
                <AccessTime /> updated right now
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={this.state.data2}
                type="Bar"
                options={mostRev.options}
                responsiveOptions={mostRev.responsiveOptions}
                listener={mostRev.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={useStyles.cardTitle}>Most Reviewed Companies</h4>
              <p className={useStyles.cardCategory}>Top 5 Companies Based on Most Reviews.</p>
            </CardBody>
            <CardFooter chart>
              <div className={useStyles.stats}>
                <AccessTime /> Based on all reviews
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={this.state.data3}
                type="Line"
                options={avgRatingsChart.options}
                listener={avgRatingsChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={useStyles.cardTitle}>Average Ratings</h4>
              <p className={useStyles.cardCategory}>Top 5 Companies based on Avg Ratings.</p>
            </CardBody>
            <CardFooter chart>
              <div className={useStyles.stats}>
                <AccessTime /> refreshed now
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
      <GridItem xs={12} sm={12} md={5}>
          <Card chart>
            <CardHeader color="info">
              <ChartistGraph
                className="ct-chart"
                data={this.state.data4}
                type="Bar"
                options={jobSeekersReviews.options}
                listener={jobSeekersReviews.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={useStyles.cardTitle}>Top Job Seeker Reviewers</h4>
              <p className={useStyles.cardCategory}>Top 5 Job Seekers based on Accepted Reviews.</p>
            </CardBody>
            <CardFooter chart>
              <div className={useStyles.stats}>
                <AccessTime /> refreshed now
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={7}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={this.state.data5}
                type="Bar"
                options={topCEO.options}
                listener={topCEO.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={useStyles.cardTitle}>Top CEOs</h4>
              <p className={useStyles.cardCategory}>Top 10 CEOs based on ratings. </p>
            </CardBody>
            <CardFooter chart>
              <div className={useStyles.stats}>
                <AccessTime /> refreshed just now
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
      <GridItem xs={12} sm={12} md={8}>
          <Card chart>
            <CardHeader color="primary">
              <ChartistGraph
                className="ct-chart"
                data={this.state.data6}
                type="Bar"
                options={topCompanies.options}
                listener={topCompanies.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={useStyles.cardTitle}>Top Company Views</h4>
              <p className={useStyles.cardCategory}>
                {/* <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "} */}
                Top 10 Companies based on Views per day.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={useStyles.stats}>
                <AccessTime /> updated right now
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
    );
  }
}


export default Dashboard;

