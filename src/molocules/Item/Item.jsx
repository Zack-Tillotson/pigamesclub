import React from 'react'
import cn from 'classnames'

import Image from 'atoms/Image'
import SharpToggle from 'atoms/SharpToggle'

import ListTitle from 'molocules/ListTitle'
import Acquisitions from 'molocules/Acquisitions'
import SessionMini from 'molocules/SessionMini'
import AttributeList from 'molocules/AttributeList'

import './component.scss'

const baseCn = 'item'

function Item(props) {
  const {
    item,
    ownership,
    acquisitions,
    sessions,
    
    modifiable,

    onToggleFavorite,
    onToggleCollection,
    onToggleWishlist,
    onAddSession,
    onAddAquisition,
    onEditAcquisition,
    onDeleteAcquisition,
  } = props

  return (
    <div className={cn(baseCn)}>
      <section className={cn(`${baseCn}__quick-actions`)}>
        <SharpToggle color="red" onClick={onToggleFavorite} active={ownership.favorite}>Favorite</SharpToggle>
        <SharpToggle color="blue" onClick={onToggleCollection} active={ownership.favorite}>Collection</SharpToggle>
        <SharpToggle color="green" onClick={onToggleWishlist} active={ownership.favorite}>Wishlist</SharpToggle>
      </section>
      <section className={cn(`${baseCn}__image`)}>
        <Image className={cn(`${baseCn}__hero`)} src={item.canonicalImage} />
      </section>
      <section>
        <h1>{item.name}</h1>
        <div className={cn(`${baseCn}__year`)}>
          <span className={cn(`${baseCn}__label`)}>Year: </span> {item.releaseDate}
        </div>
      </section>
      <section className={cn(`${baseCn}__section`)}>
        <ListTitle button={{children: "+ Add", onClick: onAddSession, primary: true}}>
          Plays
        </ListTitle>
        {sessions.map(session => (
          <div key={session.id} className="item__list-item">
            <SessionMini noHeader session={session} />
          </div>
        ))}
      </section>
      <section className={cn(`${baseCn}__section`)}>
        <Acquisitions 
          noHeader 
          acquisitions={acquisitions} 
          modifiable={modifiable} 
          onAdd={onAddAquisition}
          onEdit={onEditAcquisition} 
          onDelete={onDeleteAcquisition} />
      </section>
      <section className={cn(`${baseCn}__section`)}>
        <ListTitle>
          Attributes
        </ListTitle>
        <AttributeList object="item" values={item} />
      </section>
    </div>
  );
}

export default Item;