import React from 'react'
import cn from 'classnames'

import ItemFavorite from 'components/ItemFavorite'

import './component.scss'

const baseCn = 'item-mini'

function ItemMini(props) {
  const {
    item,
    ownership,
    sessions,
  } = props

  let dateAcquired = null
  try {
    dateAcquired = ownership.acquisitions[0].dateAcquired
  } catch (e) {}

  return (
    <div className={cn(baseCn)}>
      {ownership.favorite && (
        <ItemFavorite isFavorite={true} className={cn(`${baseCn}__favorite`)} />
      )}
      <div className={cn(`${baseCn}__image`)}>
        <div className={cn(`${baseCn}__image-wrapper`)}>
          <div className={cn(`${baseCn}__image-inner`)} style={{backgroundImage: `url("${item.canonicalImage}")`}} />
        </div>
      </div>
      <div className={cn(`${baseCn}__primary-attrs`)}>
        <div className={cn(`${baseCn}__year`)}>
          {item.releaseDate}
        </div>
        <h3 className={cn(`${baseCn}__name`)}>
          {item.name}
        </h3>
        <div className={cn(`${baseCn}__attrs`)}>
          <div className={cn(`${baseCn}__label`)}>Designer</div>
          <div className={cn(`${baseCn}__publisher`)}>
            <span className={cn(`${baseCn}__inner`)}>
              {item.designer}
            </span>
          </div>
          <div className={cn(`${baseCn}__label`)}>Publisher:</div>
          <div className={cn(`${baseCn}__publisher`)}>
            <span className={cn(`${baseCn}__inner`)}>
              {item.publisher}
            </span>
          </div>
          {item.price && [
            <div key="label" className={cn(`${baseCn}__label`)}>MSRP:</div>
            ,
            <div key="value" className={cn(`${baseCn}__publisher`)}>
              <span className={cn(`${baseCn}__inner`)}>
                {item.price}
              </span>
            </div>
          ]}
          {(item.minPlayers || item.maxPlayers) && ([
            <div key="label" className={cn(`${baseCn}__label`)}>Player Count:</div>
            ,
            <div key="value" className={cn(`${baseCn}__players`)}>
              <span className={cn(`${baseCn}__inner`)}>
                {[item.minPlayers, item.maxPlayers].filter(val => !!val).join('-')}
              </span>
            </div>
          ])}
        </div>
      </div>
      <div className={cn(`${baseCn}__ownership`)}>
        <div className={cn(`${baseCn}__ownership-wrapper`)}>
          {ownership.acquisitions.length > 0 && (
            <div key="ownIt" className={cn('item-card__icon', 'item-card__owned', {['item-card__owned--own-it']: ownership.acquisitions.length > 0})}>
              <span className="ownership-icon ownership-icon--own">$</span> Owned {dateAcquired && `(${dateAcquired})`}
            </div>
          )}
          
          {ownership.acquisitions.length > 0 && (
            <div key="playedIt" className={cn('item-card__icon', 'item-card__played')}>
              <span className="ownership-icon ownership-icon--play">♙</span> Played {sessions.length} time{sessions.length > 1 && 's'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemMini;