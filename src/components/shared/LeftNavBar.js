import React from "react";

import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

import NavItems from "./NavItems";
import TabItems from "./TabItems";

const LeftNavBar = (props) => {  
  return (
    <Tab.Container id="left-tabs" defaultActiveKey={props.defaultTab}>
      <Row style={{margin: "0px"}}>
        <Col sm={3} lg={3}>
          <Nav variant="pills" className="flex-column">
            <NavItems items={props.titles} />
          </Nav>
        </Col>
        <Col sm={8} lg={7}>
          <Tab.Content>
            <TabItems titles={props.titles} tabItems={props.tabs} />
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default LeftNavBar;
