import Heading from 'Components/Heading'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import SettingAPIs from '../../APIs/settings';

const RuleList = () => {

  const [rules, setRules] = useState({});
  const getRules = async () => {
    const res = await SettingAPIs.getAudits('Privacy');
    if (res) {
      setRules(res.data)
    }
  }

  useEffect(() => {
    getRules();
  }, [])

  return (
    <Card className="profileCard">
      <Heading title={"Rules & Regulations"} noLink />
      <div style={{color:'white'}}>
        <ol className="rules-list">
          <li>Meme user can post their memes and join the tournament.</li>
          <li>To qualify for coin rewards, you need to judge 25 memes per day.</li>
          <li>The judging of memes resets daily.</li>
          <li>You need to have the highest number of likes to win the tournament.</li>
          <li>Meme Users will have a chance to win Amazon Gift cards or coins when they are the successful winner of the tournament. First, second and third in votes will win Amazon Gift cards, while the 4th to 10th place will get Memee coins.</li>
        </ol>
      </div>
      {/* {rules?.description ? <div style={{ color: 'white' }} dangerouslySetInnerHTML={{ __html: rules?.description }} /> :
        <p style={{ textAlign: 'center', color: 'white' }} >No Rules List to Show</p>} */}

    </Card>
  )
}

export default RuleList