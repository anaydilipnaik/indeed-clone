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
    Modal,
    // Card,
    // Container,
    // Row,
    // Col,
  } from 'react-bootstrap';


  class CompanyProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        allCompanies: [],
        inSearch: '',
        search: false,
        searchResult: [],
        companyReview: [],
        companyName: '',
        reviewPage: false,
        jobStats: [],
        // action: '',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleActions = this.handleActions.bind(this);
      this.handleHome = this.handleHome.bind(this);
    }
  
    componentDidMount() {
      const compList = [];
      // Axios.defaults.withCredentials = true;
      Axios.get(endpoint+'/allcompanies')
        .then((res) => {
          if (res) {
            console.log(res.data);
            if (res.data.length >= 0) {
              // eslint-disable-next-line no-plusplus
              for (let i = 0; i < res.data.length; i++) {
                compList.push(res.data[i]);
              }
            }
            this.setState({ allCompanies: compList });
          }
        }).catch((err) => {
          throw err;
        });
    }
  

    handleActions = (e) => {
      console.log(e.currentTarget.id);
      const action = {companyName: e.currentTarget.id};
      // Axios.defaults.withCredentials = true;
      Axios.post(endpoint+'/viewcompanyreview', action)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            this.setState({ companyReview: res.data });
            
          } else {
            console.log("Error!")
          }
        });
      // Axios.defaults.withCredentials = true;
      Axios.post(endpoint+'/viewjobstats', action)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            this.setState({ jobStats: res.data });
            this.setState({ reviewPage: true });
          } else {
            console.log("Error!")
          }
        });
    }

    
  
    handleChange = (e) => {
    //   console.log(e.target.value);
      this.setState({ inSearch: e.target.value });
    }

    handleHome = (e) => {
    //   console.log(e.target.value);
    console.log(this.state.search);
        this.setState({ search: false });
        this.setState({ reviewPage: false});
    }
  
  
    handleSearch = (e) => {
      e.preventDefault();
      console.log(this.state.inSearch);
      const search = {search: this.state.inSearch}
      // Axios.defaults.withCredentials = true;
      Axios.post(endpoint+'/companysearch', search)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            this.setState({ searchResult: res.data });
            this.setState({ search: true });
            this.setState({ reviewPage: false});
          } else {
            console.log("Error!")
          }
        });
    }

    render() {
      console.log(this.state.jobStats)
      if (!this.state.search && !this.state.reviewPage) {
        return (
        <div>
          <div className="row">
              <Form inline>
                  <GridContainer>
                      <GridItem>
                      <input type="text" name="inSearch" placeholder=" Search Companies " style={{ width: '350px', height: '35px' }} onChange={this.handleChange}  required />
                          &nbsp; &nbsp; &nbsp;
                          <Button color="primary" onClick={this.handleSearch} >Search</Button>
                      </GridItem>
                      </GridContainer>
                      </Form>
            <Form inline>
              <GridContainer >
                {this.state.allCompanies.map((companies) => <GridItem xs={12} sm={12} md={4}>
                 <Card>
                  <CardBody>
                    <CardHeader color="info">{companies.companyName}</CardHeader>
                    <CardBody>
                    <p><b>Address</b>: {companies.address}</p>
                    <p><b>Headquarters</b>: {companies.headquarters}</p>
                    <p><b>Industry</b>: {companies.industry}</p>
                    </CardBody>
                    <CardFooter>
                    <Button color="success" id={companies.companyName} onClick={this.handleActions} >View Reviews</Button>
                    </CardFooter>
                  </CardBody>
                </Card>
                </GridItem>)}
              </GridContainer>
            </Form>
          </div>
        </div>
        );
      } else if(this.state.reviewPage){
        return (
            <div>
            <div className="row">
                <Form inline>
                    <GridContainer>
                        <GridItem>
                        <input type="text" name="inSearch" placeholder=" Search a Different Company " style={{ width: '350px', height: '35px' }} onChange={this.handleChange}  required />
                            &nbsp; &nbsp; &nbsp;
                            <Button color="primary" type="submit" onClick={this.handleSearch} >Search</Button>
                            <Button color="warning" type="submit" onClick={this.handleHome}>All Companies</Button>
                        </GridItem>
                        </GridContainer>
                        <h6>Job Applications: {this.state.jobStats[0].applications} &nbsp;&nbsp;&nbsp; Hired: {this.state.jobStats[0].hired} &nbsp;&nbsp;&nbsp; Rejected: {this.state.jobStats[0].rejected}</h6>
                        </Form>
              <Form inline>
                <GridContainer >
                  {this.state.companyReview.map((companies) => <GridItem xs={12} sm={12} md={4}>
                   <Card>
                    <CardBody>
                      <CardHeader color="info">{companies.companyName}</CardHeader>
                      <CardBody>
                      <b>Applicant</b>: {companies.applicantName}
                      <p><b>Review</b>: {companies.review}</p>
                      <p><b>Rating</b>: {companies.rating}</p>
                      <p><b>Status</b>: {companies.status}</p>
                      </CardBody>
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
                        <input type="text" name="inSearch" placeholder=" Search a different company " style={{ width: '350px', height: '35px' }} onChange={this.handleChange}  required />
                            &nbsp; &nbsp; &nbsp;
                            <Button color="primary" type="submit" onClick={this.handleSearch} >Search</Button>
                            <Button color="warning" type="submit" onClick={this.handleHome}>All Companies</Button>
                        </GridItem>
                        </GridContainer>
                        </Form>
              <Form inline>
                <GridContainer >
                  {this.state.searchResult.map((companies) => <GridItem xs={12} sm={12} md={4}>
                   <Card>
                    <CardBody>
                      <CardHeader color="info">{companies.companyName}</CardHeader>
                      <CardBody>
                      <p><b>Address</b>: {companies.address}</p>
                      <p><b>Headquarters</b>: {companies.headquarters}</p>
                      <p><b>Industry</b>: {companies.industry}</p>
                      </CardBody>
                      <CardFooter>
                      <Button color="success" id={companies.companyName} onClick={this.handleActions} >View Reviews</Button>
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
  
  
export default CompanyProfile;
  