import React from "react";
import NotificationAlert from "react-notification-alert";

// This function takes a component...
export default function withNotifications(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.notify = this.notify.bind(this);
      this.notifRef = React.createRef();
    }

    componentDidMount() {
      // ... that takes care of the subscription...
    }

    componentWillUnmount() {}

    notify = ({ type, message }) => {
      let options = {
        place: "tc",
        message: (
          <div className="alert-text">
            <strong data-notify="message">{message}</strong>
          </div>
        ),
        type: type,
        icon: "",
        autoDismiss: 7,
      };
      this.notifRef.current.notificationAlert(options);
    };

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <React.Fragment>
          <NotificationAlert ref={this.notifRef} />
          <WrappedComponent {...this.props} notify={this.notify} />
        </React.Fragment>
      );
    }
  };
}
