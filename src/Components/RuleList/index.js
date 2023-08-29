import Heading from 'Components/Heading'
import React from 'react'
import { Card } from 'react-bootstrap'

const RuleList = () => {
  return (
    <Card className="profileCard">
        <Heading title={"Rules & Regulations"} />
        <ul className={`ruleList mb-4`}>
    <li>Meme user can post their memes and join the tournament.</li>
    <li>To qualify for coin rewards, you need to judge 100 memes per day.</li>
    <li>The judging of memes resets daily.</li>
    <li>You need to have the highest number of likes to win the tournament.</li>
    <li>Meme Users will have a chance to win Amazon Gift cards or coins when they are the successful winner of the tournament. First, second and third in votes will win Amazon Gift cards, while the 4th to 10th place will get Memee coins.</li>
</ul>
    </Card>
  )
}

export default RuleList