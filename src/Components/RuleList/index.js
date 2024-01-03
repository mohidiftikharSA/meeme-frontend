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
      {rules?.description ? <div style={{ color: 'white' }} dangerouslySetInnerHTML={{ __html: rules?.description }} /> :
        <p style={{ textAlign: 'center', color: 'white' }} >No Rules List to Show</p>}

    </Card>
  )
}

export default RuleList