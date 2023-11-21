import { semiEndpoint } from "../utils/ApiEndpoint";
import axios from "axios";

export function getSavedJobsByJobseekerId(userId) {
  return axios.get(semiEndpoint + "/savedJobs/get/" + userId);
}

export function getAppliedJobsByJobseekerId(userId) {
  return axios.get(semiEndpoint + "/appliedJobs/get/" + userId);
}

export function deleteSavedJob(jobId, dataJson) {
  return axios.post(semiEndpoint + "/savedJobs/delete/" + jobId, dataJson);
}

export function applyJob(dataJson) {
  return axios.post(semiEndpoint + "/applyJob", dataJson);
}
