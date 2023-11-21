import React, { useState, useEffect } from "react";
import MainHeader from "./mainHeader";
import { NODE_HOST, NODE_PORT } from "../../envConfig";
import { Grid, Autocomplete, TextField, Button, Divider } from "@mui/material";
import axios from "axios";
import StarIcon from "../../Images/star.jpeg";

const CompanyReviews = (props) => {
  const [searchFlag, setSearchFlag] = useState(false);
  const [companies, setCompanies] = useState(null);
  const [jobFilterWhat, setJobFilterWhat] = useState("");
  const [jobFilterWhere, setJobFilterWhere] = useState("");
  const [jobWhatTypeaheadList, setWhatTypeaheadList] = useState([]);
  const [jobWhereTypeaheadList, setWhereTypeaheadList] = useState([]);
  const [jobWhatTypeaheadValue, setJobWhatTypeaheadValue] = useState("");
  const [jobWhereTypeaheadValue, setJobWhereTypeaheadValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchFlag(true);
    let data = {};
    data.what = jobFilterWhat;
    data.where = jobFilterWhere;
    axios
      .post(`http://${NODE_HOST}:${NODE_PORT}/findCompanyReviews`, data)
      .then((res) => {
        if (res.data.length) setCompanies(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getWhatTypeAheadList = async () => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getWhatTypeAheadList?what=${jobFilterWhat}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setWhatTypeaheadList(data);
  };

  const getWhereTypeAheadList = async () => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getWhereTypeAheadList?where=${jobFilterWhere}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setWhereTypeaheadList(data);
  };

  useEffect(() => {
    getWhatTypeAheadList();
  }, [jobFilterWhat]);

  useEffect(() => {
    getWhereTypeAheadList();
  }, [jobFilterWhere]);

  return (
    <div>
      <MainHeader currentTab="companyReviews" />
      <Grid
        container
        direction="column"
        xs={12}
        style={{ marginLeft: "225px" }}
      >
        {!searchFlag ? (
          <>
            <Grid
              item
              style={{
                marginTop: "80px",
                marginBottom: "16px",
                fontSize: "2.75rem",
                lineHeight: "1.25",
                letterSpacing: "-.0625rem",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Find great places to work
            </Grid>
            <Grid
              item
              style={{
                marginBottom: "24px",
                fontSize: "20px",
                color: "#595959",
                lineHeight: 1.5,
                textAlign: "left",
              }}
            >
              Get access to millions of company reviews
            </Grid>
          </>
        ) : null}
        <Grid
          item
          container
          direction="row"
          style={{ marginTop: searchFlag ? "25px" : null }}
        >
          <Grid
            item
            style={{
              marginRight: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              width: "326px",
              textAlign: "left",
              marginBottom: "5px",
            }}
          >
            Company name
          </Grid>
          <Grid
            item
            style={{
              marginRight: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              width: "326px",
              textAlign: "left",
              marginBottom: "5px",
            }}
          >
            City, state or zip (optional)
          </Grid>
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid item container direction="row">
            <Grid item style={{ marginRight: "8px" }}>
              <Autocomplete
                sx={{ width: "326px", height: "42px" }}
                freeSolo
                size="small"
                id="free-solo-2-demo"
                disableClearable
                options={jobWhatTypeaheadList}
                value={jobWhatTypeaheadValue}
                onChange={(event, newValue) => {
                  setJobWhatTypeaheadValue(newValue);
                }}
                inputValue={jobFilterWhat}
                onInputChange={(event, newInputValue) => {
                  setJobFilterWhat(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item style={{ marginRight: "8px" }}>
              <Autocomplete
                sx={{ width: "326px", height: "42px" }}
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                size="small"
                options={jobWhereTypeaheadList}
                value={jobWhereTypeaheadValue}
                onChange={(event, newValue) => {
                  setJobWhereTypeaheadValue(newValue);
                }}
                inputValue={jobFilterWhere}
                onInputChange={(event, newInputValue) => {
                  setJobFilterWhere(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Button
                sx={{ width: "288px", height: "39px" }}
                variant="contained"
                style={{
                  textTransform: "none",
                  fontWeight: "bold",
                  backgroundColor: "#2557A7",
                  color: "#FFF",
                }}
                type="submit"
              >
                Find Companies
              </Button>
            </Grid>
          </Grid>
        </form>
        {!searchFlag ? (
          <Grid
            item
            style={{
              textAlign: "left",
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
              marginTop: "24px",
            }}
            onClick={() => {
              window.location.href = "/findSalaries";
            }}
          >
            Do you want to search for salaries?
          </Grid>
        ) : (
          <>
            <Grid
              item
              style={{
                marginRight: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                width: "326px",
                textAlign: "left",
                marginBottom: "5px",
                marginTop: "50px",
              }}
            >
              Popular companies
            </Grid>
            <Grid
              item
              style={{
                fontSize: "16px",
                textAlign: "left",
                marginBottom: "5px",
                color: "#595959",
              }}
            >
              Based on reviews and recent job openings on Indeed
            </Grid>
            {companies &&
              companies.length > 0 &&
              companies.map((company) => (
                <>
                  <Grid
                    item
                    container
                    direction="row"
                    style={{ marginTop: "24px", width: "960px" }}
                  >
                    <Grid item xs={1}>
                      <div
                        style={{
                          height: "3rem",
                          width: "3rem",
                          minWidth: "3rem",
                          border: "2px solid #ececec",
                          borderRadius: "8px",
                          marginRight: "1rem",
                          backgroundColor: "white",
                        }}
                      >
                        <img
                          src={
                            company.companyLogo
                              ? company.companyLogo
                              : "https://forcebrands.com/assets/fallback/company-default-4549373b79625823b56e48c7918608f77be903ad2fd38cfc9b6929d095994013.png"
                          }
                          style={{ width: "3rem", height: "3rem" }}
                        />
                      </div>
                    </Grid>
                    <Grid
                      item
                      container
                      direction="column"
                      xs={3}
                      style={{ textAlign: "left" }}
                    >
                      <Grid
                        item
                        style={{
                          fontSize: "1rem",
                          lineHeight: 1.5,
                          color: "#2557a7",
                          fontWeight: 700,
                          overflow: "hidden",
                          maxHeight: "48px",
                          textOverflow: "ellipsis",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          window.location.href = "/company?id=" + company.id;
                        }}
                      >
                        {company.companyName}
                      </Grid>
                      <Grid
                        item
                        style={{
                          fontFamily:
                            "Noto Sans,Helvetica Neue,Helvetica,Arial,Liberation Sans,Roboto,Noto,sans-serif",
                          fontWeight: "inherit",
                          color: "#595959",
                          fontSize: "1rem",
                          lineHeight: "1.5",
                          fontWeight: 700,
                          marginRight: "0.25rem",
                          color: "#2d2d2d",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          window.location.href =
                            "/company?id=" + company.id + "&tab=reviews";
                        }}
                      >
                        {company.averageRating}
                        <img
                          src={StarIcon}
                          style={{
                            width: "15px",
                            height: "15px",
                            marginLeft: "5px",
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      style={{
                        textAlign: "left",
                        fontFamily:
                          "Noto Sans,Helvetica Neue,Helvetica,Arial,Liberation Sans,Roboto,Noto,sans-serif",
                        fontWeight: "inherit",
                        color: "#595959",
                        fontSize: ".75rem",
                        lineHeight: "1.5",
                        color: "#767676",
                        margin: 0,
                      }}
                    >
                      {company.missionAndVision}
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      style={{
                        textAlign: "left",
                        color: "#2557A7",
                        cursor: "pointer",
                        textDecoration: "underline",
                        marginTop: "8px",
                      }}
                      onClick={() => {
                        window.location.href =
                          "/company?id=" + company.id + "&tab=reviews";
                      }}
                    >
                      Reviews
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      style={{
                        textAlign: "center",
                        color: "#2557A7",
                        cursor: "pointer",
                        textDecoration: "underline",
                        marginTop: "8px",
                      }}
                      onClick={() => {
                        window.location.href =
                          "/company?id=" + company.id + "&tab=salaries";
                      }}
                    >
                      Salaries
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      style={{
                        textAlign: "center",
                        color: "#2557A7",
                        cursor: "pointer",
                        textDecoration: "underline",
                        marginTop: "8px",
                      }}
                      onClick={() => {
                        window.location.href =
                          "/company?id=" + company.id + "&tab=jobs";
                      }}
                    >
                      Jobs
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginTop: "15px", width: "960px" }}>
                    <Divider />
                  </Grid>
                </>
              ))}
          </>
        )}
      </Grid>
    </div>
  );
};

export default CompanyReviews;
