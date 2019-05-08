import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { AnyObject } from './common';

export type AnyComponent = React.ComponentType<any>;

export type WithRouter<RouterState = AnyObject> = RouteComponentProps<RouterState>;
