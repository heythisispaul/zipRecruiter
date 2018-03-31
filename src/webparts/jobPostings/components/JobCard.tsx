import * as React from 'react'
import styles from './JobPostings.module.scss';
import { IJobCardProps } from './IJobCardProps';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import {
    ActionButton,
    IButtonProps
  } from 'office-ui-fabric-react/lib/Button';

const JobCard: React.SFC<IJobCardProps> = (props) => {
 return (
    <div className = { styles.jobPostings }>
        <div className = { styles.jobCards }>
            <div className = { styles.row }>
                <div className={ styles.padder }>
                    <span className = "ms-font-m ms-fontWeight-semibold">{ props.title }<br></br></span>
                    <span className = "ms-font-s-plus"> { props.location }</span>
                    <div id="desc">
                        { props.descriptionBox == true ? <p className = "ms-font-xs">{ props.desc }</p> : null }
                    </div>
                    <a href={props.link} className={ styles.linkText }>
                    <div className={ styles.callToAction }>
                        <ActionButton
                            data-automation-id='test'
                            iconProps={ { iconName: 'ChevronRight' } }
                            text="Learn More"
                        />
                    </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
 );
};

export default JobCard;