import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'JobPostingsWebPartStrings';
import JobPostings from './components/JobPostings';
import { IJobPostingsProps } from './components/IJobPostingsProps';

export interface IJobPostingsWebPartProps {
  description: string;
  URL: string;
}

export default class JobPostingsWebPart extends BaseClientSideWebPart<IJobPostingsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IJobPostingsProps > = React.createElement(
      JobPostings,
      {
        description: this.properties.description,
        URL: this.properties.URL
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
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('URL', {
                  label: "ZipRecruiter URL"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
