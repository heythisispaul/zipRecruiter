const parseJobRow = (rowHtml: HTMLTableRowElement) => {
  const location = rowHtml.querySelector('.job_location').innerHTML;
  const { href: link, innerHTML: title } = rowHtml.getElementsByTagName('a')[0];
  return { location, title, link, desc: '' };
};

const parseZipRecruiterHtml = (htmlString: string) => {
  console.log('its go time mannnn');
  const outerDiv = document.createElement('div');
  outerDiv.innerHTML = htmlString;
  const tableRows = outerDiv.getElementsByTagName('tr');
  // TS wasn't having [...tableRows] even with ignore on?
  const trArray: HTMLTableRowElement[] = []
    .slice
    .call(tableRows)
    // remove the title row
    .filter((tr) => tr.getElementsByTagName('th').length === 0);
  return trArray.map(parseJobRow);
};

export default parseZipRecruiterHtml;
