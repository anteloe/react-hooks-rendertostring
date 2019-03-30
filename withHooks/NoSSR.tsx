import { FunctionComponent, useState, useEffect, ReactElement } from "react";

export const NoSSR: FunctionComponent = props => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return mounted ? (props.children as ReactElement) : null;
};
