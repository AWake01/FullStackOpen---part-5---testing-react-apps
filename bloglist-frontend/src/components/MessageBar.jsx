const MessageBar = ({ message, type }) => {
    //Show user messages - type: s = success, f = fail
    let messageTypeClass = "";
    if (type === "s") {
      messageTypeClass = "message-success-div";
    } else if (type === "f") {
      messageTypeClass = "message-fail-div";
    }

    if (message) {
      return (
        <div className={messageTypeClass}>
          <h3 className="message-h3">{message}</h3>
        </div>
      );
    }
  };

export default MessageBar