import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'JobPostingsWebPartStrings';
import JobPostings from './components/JobPostings';
import { IJobPostingsProps } from './components/IJobPostingsProps';

export interface IJobPostingsWebPartProps {
  description: string;
  URL: string;
  descriptionBox: boolean;
  jobsNum: number;
  moreButtonUrl: string;
}

export default class JobPostingsWebPart extends BaseClientSideWebPart<IJobPostingsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IJobPostingsProps > = React.createElement(
      JobPostings,
      {
        description: this.properties.description,
        URL: this.properties.URL,
        descriptionBox: this.properties.descriptionBox,
        jobsNum: this.properties.jobsNum,
        moreButtonUrl: this.properties.moreButtonUrl,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Title Text"
                }),
                PropertyPaneTextField('URL', {
                  label: "ZipRecruiter Widget URL"
                }),
                PropertyPaneTextField('moreButtonUrl', {
                  label: "ZipRecruiter Company Page URL"
                }),
                PropertyPaneSlider('jobsNum', {
                  label: "Number of Jobs to Display",
                  max: 20,
                  min: 1,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneToggle('descriptionBox', {
                  label: 'Show Descriptions',
                  onText: 'On',
                  offText: 'Off'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
