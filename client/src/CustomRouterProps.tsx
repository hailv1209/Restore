import React, { PropsWithChildren, useEffect, useState } from "react";
import { BrowserHistory, Action, Location } from "history";
import { Router } from "react-router-dom";

interface CustomRouterProps {
  basename?: string;
  children?: React.ReactNode;
  history: BrowserHistory;
}

interface CustomRouterState {
  action: Action;
  location: Location;
}

export default function CustomBrowserRouter(
  props: PropsWithChildren<CustomRouterProps>
) {
  const [routerState, useRouterState] = useState<CustomRouterState>({
    action: props.history.action,
    location: props.history.location,
  });

  useEffect(() => props.history.listen(useRouterState), [props.history]);

  return (
    <Router
      basename={props.basename}
      children={props.children}
      location={routerState.location}
      navigationType={routerState.action}
      navigator={props.history}
    />
  );
}
