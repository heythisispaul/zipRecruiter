import * as React from 'react';
import styles from './JobPostings.module.scss';
import { IJobPostingsProps } from './IJobPostingsProps';
import { IJobPostingsState } from './IJobPostingsState'; 
import parseZipRecruiterHtml from '../parseZipRecruiterHtml';
import axios from 'axios';
import JobCard from './JobCard';
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

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
    axios({
      method: 'GET',
      url: this.props.URL,
    })
    .then((res) => {
      const jobs = parseZipRecruiterHtml(res.data);
      return this.setState({
        jobs,
        diff: jobs.length - this.props.jobsNum,
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

  buttonText(): string {
    return this.state.diff == 1 ? `See ${this.state.diff} More Job >` : `See ${this.state.diff} More Jobs >`
  }

  componentDidMount(): void {
    this.getJobs();
  }

  componentWillReceiveProps(props): void {
    this.getJobs();
  }

  public render(): React.ReactElement<IJobPostingsProps> {
    const { jobs } = this.state;
    const jobsArr = jobs.slice(0, this.props.jobsNum);

    // TODO: Make all these one SFC with one changing text based off conditions:
    if (!this.props.URL) {
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

    if (jobs.length == 0 && !this.state.complete) {
      return <Spinner size={ SpinnerSize.large }/>
    }

    if (jobs.length == 0 && this.state.complete) {
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

    return (
    <div className = { styles.jobPostings }>
      <div className = { styles.container }>
        <div className = { styles.row }>
          <div className ={ styles.column }>
            <div className="jobsList">
              <div>
                <h2 className="ms-font-xxl">{ this.props.description }</h2>
                </div>
                { jobsArr.map((job) => (
                  <JobCard
                  key={ job.link } 
                  title={ job.title }
                  location={ job.location }
                  desc={ job.desc }
                  descriptionBox={ this.props.descriptionBox }
                    link={ job.link } 
                    jobsNum={ this.props.jobsNum }
                  />
                  )) }
                </div>
                <div>
                { this.state.diff > 0 ? <a target="_blank" href={ this.props.moreButtonUrl }><div><DefaultButton primary={ true } text={ this.buttonText() } /></div></a>: null}
             </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
