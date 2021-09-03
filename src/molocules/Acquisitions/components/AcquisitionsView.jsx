import React from 'react'
import cn from 'classnames'

import Button from 'atoms/Button'
import ItemMini from 'molocules/ItemMini'
import ListTitle from 'molocules/ListTitle'

const baseCn = 'acquisitions'

function AcquisitionsView(props) {
  const {
    item,
    ownership,
    acquisitions,
    modifiable,
    noHeader = false,
    onAdd,
    onEdit,
    onDelete,
  } = props

  return (
    <div className={cn(baseCn)}>
      {!noHeader && (
        <ItemMini item={item} details={false} ownership={ownership} />
      )}
      <ListTitle button={{children: "+ Add", onClick: onAdd, primary: true}}>
        Acquisitions
      </ListTitle>
      {acquisitions.length === 0 && (
        <div className={`${baseCn}__not-owned`}>
          Not yet acquired.
        </div>
      )}
      {acquisitions.length > 0 && (
        <ol>
          {acquisitions.map(acquisition => (
            <li key={acquisition.date}>
              <div className={cn(`${baseCn}__acquisition`)}>
                <div className="acquisitions__piece">
                  <div className="acquisitions__label">Date:</div>
                  <div className="acquisitions__value">
                    {acquisition.date}
                  </div>
                </div>
                <div className="acquisitions__piece">
                  <div className="acquisitions__label">Price</div>
                  <div className="acquisitions__value">
                    {acquisition.price}
                  </div>
                </div>
                {modifiable && onEdit && (
                  <div className="acquisitions__control">
                    <Button minimal onClick={onEdit}>Edit</Button>
                  </div>
                )}
                {modifiable && onDelete && (
                  <div className="acquisitions__control">
                    <Button minimal onClick={onDelete}>Delete</Button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default AcquisitionsView