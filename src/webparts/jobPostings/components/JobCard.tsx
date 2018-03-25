import * as React from 'react'
import styles from './JobPostings.module.scss';
interface JobCardProps {
    name: string,
   }

const Configure: React.SFC = (props) => {
 return (
    <div className = { styles.jobPostings }>
    <div className = { styles.container }>
      <div className = { styles.row }>
        <div className ={ styles.column }>
          <div>
            <span className = { styles.title }>Configure the webpart to get started.</span>
          </div>
        </div>
      </div>
    </div>
  </div>  
 )
}

export default Configure;