import { PureComponent, ReactNode } from "react";

interface NoSSRState {
  mounted: boolean;
}

export class NoSSR extends PureComponent<{}, NoSSRState> {
  public readonly state: NoSSRState = {
    mounted: false
  };

  public componentDidMount(): void {
    this.setState({ mounted: true });
  }

  public render(): ReactNode {
    const { mounted } = this.state;

    if (!mounted) {
      return null;
    }

    return this.props.children;
  }
}
