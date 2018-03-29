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
      diff: 0,
      complete: false,
      errorCaught: false
    }
  }

  getJobs() {
    let id = uuid();
    axios({
      method: 'POST',
      url: 'https://blooming-beyond-65689.herokuapp.com/' + id,
      data: {
        url: this.props.URL
      }
    })
    .then((res) => {
      let jobs = res.data.slice(0, this.props.jobsNum);
      this.setState({
        jobs: jobs,
        diff: res.data.length - this.props.jobsNum,
        complete: true
      })
    })
    .catch((err) => {
      console.log(err);
      this.setState({
        errorCaught: true
      })
    })
  }

  public render(): React.ReactElement<IJobPostingsProps> {
    let jobsArr = this.state.jobs;

    // TODO: Make all these one SFC with one changing text based off conditions:
    if (this.props.URL == "") {
      return (
        <div className = { styles.jobPostings }>
          <div className = { styles.container }>
            <div className = { styles.row }>
              <div className ={ styles.column }>
                <div id="noJobs">
                  <h2 className="ms-font-xxl">Configure the webpart to get started.</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
    }

    if (jobsArr.length == 0 && !this.state.complete) {
      return <Spinner size={ SpinnerSize.large }/>
    }

    if (jobsArr.length == 0 && this.state.complete) {
      return (
        <div className = { styles.jobPostings }>
          <div className = { styles.container }>
            <div className = { styles.row }>
              <div className ={ styles.column }>
                <div id="noJobs">
                  <h2 className="ms-font-xxl">Sorry, no jobs available at this time</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
    }

    if (this.state.errorCaught) {
      return (
        <div className = { styles.jobPostings }>
          <div className = { styles.container }>
            <div className = { styles.row }>
              <div className ={ styles.column }>
                <div id="noJobs">
                  <h2 className="ms-font-xxl">Unfortunately we could not get any job information at this time.</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
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
                { this.state.diff > 0 ? <a href={ this.props.URL } className={ styles.linkText }><p className={ styles.moreJobs }>See { this.state.diff } more job{ this.state.diff == 1 ? null : 's' } ></p></a>:  null }
             </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount(): void {
    this.getJobs();
  }

  componentWillReceiveProps(props): void {
    this.getJobs();
  }
}
