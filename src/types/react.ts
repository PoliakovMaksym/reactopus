import { RouteComponentProps } from 'react-router-dom';
import * as H from 'history';
import { StaticContext } from 'react-router';

export type WithRouter<
  State = H.LocationState,
  Params extends { [K in keyof Params]?: string } = {},
  Context extends StaticContext = StaticContext
> = RouteComponentProps<Params, Context, State>;
