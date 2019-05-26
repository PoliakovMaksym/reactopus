import React from 'react';

import { Navigation } from 'services';
import { Router, ROUTES } from 'router';

export class RootModule extends React.Component {
  goToPage2 = () => {
    Navigation.goTo(ROUTES.page2, { urlParams: { jobId: 15 } });
  };

  goToPage3 = () => {
    Navigation.goTo(ROUTES.page3);
  };

  goToPage5 = () => {
    Navigation.goTo(ROUTES.page5);
  };

  // RENDER

  render() {
    return (
      <React.Fragment>
        <div>Root module</div>
        <div>
          <button onClick={this.goToPage2}>Page 2</button>
          <button onClick={this.goToPage3}>Page 3</button>
          <button onClick={this.goToPage5}>Page 5</button>
        </div>

        <Router />
      </React.Fragment>
    );
  }
}
