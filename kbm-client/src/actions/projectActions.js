import axios from 'axios';
import swal from 'sweetalert2';
import {
  GET_PROJECTS,
  GET_PROJECT,
  GET_ERRORS,
  DELETE_PROJECT,
  ASSIGN_USER_TO_PROJECT,
  REMOVE_USER_FROM_PROJECT,
  GET_USERS_BY_PROJECT
} from './types';

export const getAllProjects = () => async dispatch => {
  const res = await axios.get('/api/project/all');
  dispatch({ type: GET_PROJECTS, payload: res.data });
};

export const getProjects = () => async dispatch => {
  const res = await axios.get('/api/project');
  dispatch({ type: GET_PROJECTS, payload: res.data });
};

export const getProject = (projectID, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/project/${projectID}`);
    dispatch({ type: GET_PROJECT, payload: res.data });
  } catch (err) {
    history.push('/dashboard');
  }
};

export const createProject = (project, history) => async dispatch => {
  try {
    await axios.post('/api/project', project);
    history.push(`/project/${project.projectID}`);
    dispatch({ type: GET_ERRORS, payload: {} });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const deleteProject = (projectID, history) => async dispatch => {
  const { isConfirmed } = await swal.fire({
    text: `You sure you want to delete ${projectID}?`,
    icon: 'warning',
    showCancelButton: true,
    backdrop: true,
    confirmButtonColor: '#FF7851',
    confirmButtonText: 'Yes, delete it!'
  });

  if (isConfirmed) {
    try {
      await axios.delete(`/api/project/${projectID}`);
      dispatch({ type: DELETE_PROJECT, projectID });
    } catch (err) {
      history.push('/dashboard');
    }
  }
};

export const getUsersByProject = projectID => async dispatch => {
  const res = await axios.get(`/api/project/users/${projectID}`);
  dispatch({ type: GET_USERS_BY_PROJECT, payload: res.data });
};

export const assignUserToProject = (
  projectID,
  user,
  callback
) => async dispatch => {
  try {
    await axios.post(`/api/project/${projectID}/${user.username}`);
    dispatch({ type: GET_ERRORS, payload: {} });
    dispatch({ type: ASSIGN_USER_TO_PROJECT, payload: user });
    if (callback) {
      callback();
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const removeUserFromProject = (
  projectID,
  user,
  callback
) => async dispatch => {
  try {
    console.log(user);
    await axios.delete(`/api/project/${projectID}/${user.username}`);
    dispatch({ type: GET_ERRORS, payload: {} });
    dispatch({ type: REMOVE_USER_FROM_PROJECT, payload: user });
    if (callback) {
      callback();
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};
