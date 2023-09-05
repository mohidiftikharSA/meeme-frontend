import Heading from "Components/Heading";
import Search from "Components/Search";
import React from "react";
import { Card, Col, Container, Dropdown, Row } from "react-bootstrap";
import classes from "./index.module.scss";
import img from "../../Images/badge1.png";

const badgeListData = [
  {
    img: img,
    title: "1st Place",
  },
  {
    img: img,
    title: "1st Place",
  },
  {
    img: img,
    title: "1st Place",
  },
  {
    img: img,
    title: "1st Place",
  },
  {
    img: img,
    title: "1st Place",
  },
  {
    img: img,
    title: "1st Place",
  },
  {
    img: img,
    title: "1st Place",
  },
  {
    img: img,
    title: "1st Place",
  },
  {
    img: img,
    title: "1st Place",
  },
  {
    img: img,
    title: "1st Place",
  },
  {
    img: img,
    title: "1st Place",
  },
  {
    img: img,
    title: "1st Place",
  },
];
const BadgeList = () => {
  return (
    <section>
      <Container>
        <Heading title={"Badge List"} badge />
        <Row>
          <Col md={5}>
            <Search badgeList text={"Search"} />
          </Col>
        </Row>
        <Row>
          {badgeListData.map((item, ind) => {
            return (
              <Col md={2} className="mb-4">
                <Card className={classes.card}>
                  <div className={classes.header}>
                  <Dropdown className={classes.dropdown}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <i className="fas fa-ellipsis-v"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#"><i class="fas fa-edit"></i>Edit</Dropdown.Item>
                  <Dropdown.Item href="#"><i class="fas fa-trash"></i>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
                  </div>
                  <div className="text-center">
                    <div className={`${classes.iconBox}`}>
                      <img src={item.img} alt="icon" />
                    </div>
                    <p className="mb-0">{item.title}</p>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default BadgeList;
