import * as React from 'react';
import styles from './JobPostings.module.scss';
import { IJobPostingsProps } from './IJobPostingsProps';
import { IJobPostingsState } from './IJobPostingsState'; 
import { escape } from '@microsoft/sp-lodash-subset';
import axios from 'axios';
import JobCard from './JobCard';
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
import * as uuid from 'uuid';

export default class JobPostings extends React.Component<IJobPostingsProps, IJobPostingsState> {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      diff: 0
    }
  }
  public render(): React.ReactElement<IJobPostingsProps> {
    let jobsArr = this.state.jobs;
    if (this.state.jobs.length == 0) {
      return <Spinner size={ SpinnerSize.large }/>
    }

    return (
    <div className = { styles.jobPostings }>
      <div className = { styles.container }>
        <div className = { styles.row }>
          <div className ={ styles.column }>
            <div className="jobsList">
              <div>
                <h2 className="ms-font-xxl">{ this.props.description }</h2>
                </div>
                { jobsArr.map((e, i) => {
                  console.log(jobsArr[i]);
                  return <JobCard
                  key={ i } 
                  title={ jobsArr[i].title }
                  location={ jobsArr[i].location }
                  desc={ jobsArr[i].desc }
                  descriptionBox={ this.props.descriptionBox }
                  link={ jobsArr[i].link } 
                  jobsNum={ this.props.jobsNum }
                  />
                  }) }
                </div>
                <div>
                { this.state.diff > 0 ? <a href={ this.props.URL } className={ styles.linkText }><p className={ styles.moreJobs }>See { this.state.diff } more jobs ></p></a>:  null }
             </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() : void {
    console.log(this.props.jobsNum);
    let id = uuid();
    axios({
      method: 'POST',
      url: 'http://localhost:3000/' + id,
      data: {
        url: this.props.URL
      }
    })
    .then((res) => {
      let jobs = res.data.slice(0, this.props.jobsNum);
      console.log(jobs);
      this.setState({
        jobs: jobs,
        diff: res.data.length - this.props.jobsNum
      })
    })
  }
}
