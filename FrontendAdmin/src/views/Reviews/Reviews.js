import React from "react";
import Axios from 'axios';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import withStyles from "@material-ui/core/styles/withStyles"
import { endpoint } from "views/util/port";
import {
    Form,
    // Card,
    // Container,
    // Row,
    // Col,
  } from 'react-bootstrap';


  class Reviews extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        allReviews: [],
        inFilter: '',
        search: false,
        filterResult: [],
        action: '',
        id: '',
        status: '',
      };
      this.handleChangeR = this.handleChangeR.bind(this);
      this.handleActions = this.handleActions.bind(this);
    }
  
    componentDidMount() {
      this.allReviews();
    }

    allReviews() {
      const revList = [];
      // Axios.defaults.withCredentials = true;
      Axios.get(endpoint+"/allreviews")
        .then((res) => {
          if (res) {
            console.log(res.data);
            if (res.data.length >= 0) {
              // eslint-disable-next-line no-plusplus
              for (let i = 0; i < res.data.length; i++) {
                revList.push(res.data[i]);
              }
            }
            this.setState({ allReviews: revList });
          }
        }).catch((err) => {
          throw err;
        });
    }
  
    finalSearch = (userData) => {
      console.log(userData);
      // Axios.defaults.withCredentials = true;
      Axios.post(endpoint+'/filterreviews', userData)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            this.setState({ filterResult: res.data });
            this.setState({ search: true });
          } else {
            console.log("Error!")
          }
        });
    } 

    handleActions = (e) => {
      console.log(e.currentTarget.id,  e.currentTarget.value)
      const action = {id: e.currentTarget.id, status: e.currentTarget.value};
      // Axios.defaults.withCredentials = true;
      Axios.post(endpoint+ '/reviewactions', action)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            this.allReviews();
          } else {
            console.log("Error!")
          }
        });
    }
  
    handleChangeR = (e) => {
      this.setState({ inFilter: e.target.value });
    }
  
  
    handleFilter = (e) => {
      e.preventDefault();
      const userData = {
        filter: this.state.inFilter,
      };
      if(this.state.inFilter==="All"){
        this.setState({search: false})
      } else {
      this.finalSearch(userData);
      }
    }
  
    render() {
      if (!this.state.search) {
        return (
        <div>
          <div className="row">
              <Form inline>
                  <GridContainer>
                      <GridItem>
                          <label>
                          Type of Review: &nbsp;
                          <select onChange={this.handleChangeR}>
                            <option value="All">Select</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            </select>
                          </label>
                          &nbsp; &nbsp; &nbsp;
                         
                          &nbsp; &nbsp; &nbsp;
                          <Button color="primary" type="submit" onClick={this.handleFilter} round>Filter</Button>
                        
                      </GridItem>
                      </GridContainer>
                      </Form>
            <Form inline>
              <GridContainer >
                {this.state.allReviews.map((reviews) => <GridItem xs={12} sm={12} md={4}>
                 <Card style={{overflow: "auto"}}>
                  <CardBody>
                    <CardHeader color="info"><b>{reviews.companyName}</b></CardHeader>
                    <CardBody>
                      <b>Applicant</b>: {reviews.applicantName}
                    </CardBody>
                    <CardBody>
                      <b>Review</b>: {reviews.review}
                      <p><b>Status</b>: {reviews.status}</p>
                      <p><b>Rating</b>: {reviews.rating}</p>
                    </CardBody>
                    <CardFooter>
                    <Button color="success" id={reviews._id} value={"Approved"} onClick={this.handleActions}>Approve</Button>
                    <Button color="danger" id={reviews._id} value={"Rejected"} onClick={this.handleActions}>Reject</Button>
                    </CardFooter>
                  </CardBody>
                </Card>
                </GridItem>)}
              </GridContainer>
            </Form>
          </div>
        </div>
        );
      } else {
        return (
          <div>
          <div className="row">
              <Form inline>
                  <GridContainer>
                      <GridItem>
                          <label>
                          Type of Review: &nbsp;
                          <select onChange={this.handleChangeR}>
                            <option value="All">Select</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            </select>
                          </label>
                          &nbsp; &nbsp; &nbsp;
                         
                          &nbsp; &nbsp; &nbsp;
                          <Button color="primary" type="submit" onClick={this.handleFilter} round>Filter</Button>
                        
                      </GridItem>
                      </GridContainer>
                      </Form>
            <Form inline>
              <GridContainer >
                {this.state.filterResult.map((reviews) => <GridItem xs={12} sm={12} md={4}>
                 <Card>
                  <CardBody>
                    <CardHeader color="info"><b>{reviews.companyName}</b></CardHeader>
                    <CardBody>
                      <b>Applicant</b>: {reviews.applicantName}
                    </CardBody>
                    <CardBody>
                      <b>Review</b>: {reviews.review}
                      <p><b>Status</b>: {reviews.status}</p>
                      <p><b>Rating</b>: {reviews.rating}</p>
                    </CardBody>
                    <CardFooter>
                    <Button color="success" id={reviews._id} value={"Approved"} onClick={this.handleActions}>Approve</Button>
                    <Button color="danger" id={reviews._id} value={"Rejected"} onClick={this.handleActions}>Reject</Button>
                    </CardFooter>
                  </CardBody>
                </Card>
                </GridItem>)}
              </GridContainer>
            </Form>
          </div>
        </div>
            );
      }
      
    }
  }
  
  
export default Reviews;
  