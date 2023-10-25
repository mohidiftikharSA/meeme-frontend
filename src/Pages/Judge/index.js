import Heading from "Components/Heading";
import React from "react";
import { Button, Container } from "react-bootstrap";
import judge1 from "../../Images/judge1.png";
import judge2 from "../../Images/judge2.png";
import classes from "./index.module.scss";
import { AiFillHeart } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';

const judgeData = [
  {
    img: judge1,
  },
  {
    img: judge2,
  },
];

const JudgePage = () => {
  return (
    <section>
      <Container>
        <div className="sectionHolder">
          <Heading title={"Judge"} judge linkPath={"tornament"} />
          {judgeData.map((item, ind) => {
            return (
              <div className={classes.postHolder}>
                <div className="imgBox">
                  <img
                    style={{ borderRadius: "30px" }}
                    src={item.img}
                    alt="icon"
                  />
                </div>
                <div className={classes.btnGroup}>
                    <Button><AiFillHeart/></Button>
                    <Button><FaTimes/></Button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default JudgePage;
