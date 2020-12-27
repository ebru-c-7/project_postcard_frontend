import React from "react";

import Tab from "react-bootstrap/Tab";

const TabItems = (props) => {
  return props.tabItems.map((t, i) => {
    let eventTitle = props.titles[i].toLowerCase().split(" ").join("-");
    return (
      <Tab.Pane key={i} eventKey={eventTitle}>
        {t}
      </Tab.Pane>
    );
  });
};

export default TabItems;
