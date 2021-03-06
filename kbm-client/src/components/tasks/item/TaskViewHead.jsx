import React, { Component } from 'react';
import UpdateTaskButton from '../buttons/UpdateTaskButton';
import DeleteTaskButton from '../buttons/DeleteTaskButton';
import AssignUserButton from '../buttons/AssignUserButton';

export default class TaskViewHeader extends Component {
  render() {
    const { projectID, sequence, history } = this.props;
    return (
      <div className='card-header banner mb-2'>
        <div className='w-100 d-flex align-items-center justify-content-around'>
          <strong>Details for Ticket #{sequence}</strong>
          <UpdateTaskButton
            banner={true}
            projectID={projectID}
            sequence={sequence}
          />
          <AssignUserButton projectID={projectID} sequence={sequence} />
          <DeleteTaskButton
            projectID={projectID}
            sequence={sequence}
            callback={() => history.push('/mytasks')}
          />
        </div>
      </div>
    );
  }
}
