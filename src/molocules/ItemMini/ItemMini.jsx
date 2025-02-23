import React from 'react'
import cn from 'classnames'

import SharpToggle from 'atoms/SharpToggle'
import Image from 'atoms/Image'

import AttributeList from 'molocules/AttributeList'

import './component.scss'

const baseCn = 'item-mini'

function ItemMini(props) {
  const {
    item,
    ownership,
    sessions,
    showDetails = true,
    showImage = true,
    imageClassName,
    onClick = () => {},
  } = props

  let dateAcquired = null, isFavorite = false
  try {
    isFavorite = ownership.attributes.favorite
  } catch (e) {}
  try {
    dateAcquired = ownership.acquisitions[0].attributes.dateAcquired
  } catch (e) {}

  return (
    <div className={cn(baseCn)} onClick={onClick}>
      {isFavorite && (
        <SharpToggle color="red" active={true} className={cn(`${baseCn}__favorite`)}>Favorite</SharpToggle>
      )}
      {showImage && (
        <div className={cn(`${baseCn}__image`)}>
          <Image className={cn(`${baseCn}__image-wrapper`, imageClassName, {[`${baseCn}__image-wrapper--small`]: !showDetails})} src={item.attributes.canonicalImage} />
        </div>
      )}
      <div className={cn(`${baseCn}__primary-attrs`)}>
        <div className={cn(`${baseCn}__year`)}>
          {item.attributes.releaseDate}
        </div>
        <h3 className={cn(`${baseCn}__name`)}>
          {item.attributes.name}
        </h3>
      </div>
      {showDetails && (
        <div className={cn(`${baseCn}__attrs`)}>
          <AttributeList object="item" values={item.attributes} position="secondary" additionalAttrs={(item.attributes.minPlayers || item.attributes.maxPlayers) ? [{
              label: 'Player Count', 
              value: [item.attributes.minPlayers, item.attributes.maxPlayers].filter(val => !!val).join('-'),
            }] : []} />
        </div>
      )}
      {showDetails && (
        <div className={cn(`${baseCn}__ownership`)}>
          <div className={cn(`${baseCn}__ownership-wrapper`)}>
            {dateAcquired && (
              <div key="ownIt" className={cn('item-mini__icon', 'item-mini__owned', {['item-mini__owned--own-it']: dateAcquired})}>
                <span className="item-mini__ownership-icon item-mini__ownership-icon--own">$</span> Owned {dateAcquired && `(${dateAcquired})`}
              </div>
            )}
            
            {dateAcquired && !!sessions && (
              <div key="playedIt" className={cn('item-mini__icon', 'item-mini__played')}>
                <span className="item-mini__ownership-icon item-mini__ownership-icon--play">♙</span> Played {sessions.length} time{sessions.length > 1 && 's'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemMini;