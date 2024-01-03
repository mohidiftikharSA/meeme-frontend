import React from 'react';
import { Modal } from 'react-bootstrap';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import classes from './index.module.scss';
import menu from '../../Images/menu-01.png';
import icon1 from '../../Images/badge1.png';
import icon2 from '../../Images/2nd.png';
import icon3 from '../../Images/badge3.png';
import icon4 from '../../Images/badge4.png';
import icon5 from '../../Images/badge6.png';
import icon6 from '../../Images/badge7.png';

const ItemTypes = {
  BADGE: 'badge',
};

const BadgeItem = ({ title, img, user, index, moveItem }) => {
  const [, ref] = useDrag({
    type: ItemTypes.BADGE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.BADGE,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li ref={(node) => ref(drop(node))}>
      <img src={img} alt='menu' />
      <div className={classes.iconBox}>
        <img src={user} alt='icon' />
      </div>
      <p className={classes.subtitle}>{title}</p>
    </li>
  );
};

const data = [
  {
    title: '1st Place',
    img: menu,
    user: icon1,
  },
  {
    title: '2nd Place',
    img: menu,
    user: icon2,
  },
  {
    title: '3rd Place',
    img: menu,
    user: icon3,
  },
  {
    title: '100 hours spent',
    img: menu,
    user: icon4,
  },
  {
    title: 'Most Wins',
    img: menu,
    user: icon5,
  },
  {
    title: 'Top Shot',
    img: menu,
    user: icon6,
  },
];

const OrganizeBadges = (props) => {
  const [badgeData, setBadgeData] = React.useState(data);

  const moveItem = (fromIndex, toIndex) => {
    const updatedData = [...badgeData];
    const [movedItem] = updatedData.splice(fromIndex, 1);
    updatedData.splice(toIndex, 0, movedItem);
    setBadgeData(updatedData);
  };

  return (
    <Modal
      className='orginizeBadges'
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title>
          <i className='fa fa-angle-left' aria-hidden='true' onClick={props.onHide}></i>
          <h4 className='title mb-0'>Organize Badges</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='organize'>
        <ul>
          {badgeData.map((item, ind) => (
            <BadgeItem
              key={ind}
              title={item.title}
              img={item.img}
              user={item.user}
              index={ind}
              moveItem={moveItem}
            />
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

const OrganizeBadgesWithDnD = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <OrganizeBadges {...props} />
    </DndProvider>
  );
};

export default OrganizeBadgesWithDnD;
