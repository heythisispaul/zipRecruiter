import * as React from 'react';
import styles from './JobPostings.module.scss';
import { IJobPostingsProps } from './IJobPostingsProps';
import { IJobPostingsState } from './IJobPostingsState'; 
import { escape } from '@microsoft/sp-lodash-subset';
import axios from 'axios';
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';

export default class JobPostings extends React.Component<IJobPostingsProps, IJobPostingsState> {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    }
  }
  public render(): React.ReactElement<IJobPostingsProps> {
    if (this.state.jobs.length <= 0) {
      return <Spinner size={ SpinnerSize.large }/>
    }

    return (
      <p>Hi { this.state.jobs[0].title }</p>
    )
      // <div className={ styles.jobPostings }>
      //   <div className={ styles.container }>
      //     <div className={ styles.row }>
      //       <div className={ styles.column }>
      //         <span className={ styles.title }>Welcome to SharePoint!</span>
      //         <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
      //         <p className={ styles.description }>{escape(this.props.description)}</p>
      //         <a href="https://aka.ms/spfx" className={ styles.button }>
      //           <span className={ styles.label }>Learn more</span>
      //         </a>
      //       </div>
      //     </div>
      //   </div>
      // </div>
  }

  componentDidMount() : void {
    axios({
      method: 'POST',
      url: 'http://localhost:3000/',
      data: {
        url: this.props.URL
      }
    })
    .then((res) => {
      this.setState({
        jobs: res.data
      })
      console.log(this.state.jobs[0].title);
    })
  }
}
