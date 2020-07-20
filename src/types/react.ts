import { RouteComponentProps } from 'react-router-dom';
import * as History from 'history';
import { StaticContext } from 'react-router';

export type WithRouter<
  State = History.LocationState,
  Params extends { [K in keyof Params]?: string } = {},
  Context extends StaticContext = StaticContext
> = RouteComponentProps<Params, Context, State>;
