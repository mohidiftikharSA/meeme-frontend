import Heading from 'Components/Heading'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import classes from "./index.module.scss"
import SetttingAPIs from '../../APIs/settings';

const FAQ = () => {

  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    getFaqs()
  }, [])

  const getFaqs = async () => {
    const res = await SetttingAPIs.getAudits('Faq');
    if (res) {
      setFaqs(res.data);
    }
  }

  return (
    <Card className="profileCard">
      <Heading title={"FAQ"} linkPath={"home"} />
      <div className={classes.modalContant}>
        {faqs[0] ? faqs?.map((item) => {
          return (
            <>
              <h5 className="faqTitle">{item?.title}</h5>
              <p dangerouslySetInnerHTML={{ __html: item?.description }} />
            </>
          )
        }) :
          <p style={{ textAlign: 'center' }} >No FAQs to Show</p>
        }
      </div>
    </Card>
  )
}

export default FAQ