import React, { useEffect } from 'react';
import cn from 'classnames'
import { useParams } from 'react-router';

import useInitGate from 'state/useInitGate'
import useAuth from 'data/auth/useAuth';
import useObjectDb from 'data/objectDb/useObjectDb';
import { buildSelfMember } from 'data/objectCreator';

import Card from 'atoms/Card'

import Page from 'components/Page'
import ItemSelector from 'components/ItemSelector'

import Relationship from 'molocules/Relationship'
import ItemMini from 'molocules/ItemMini'

import './wishlist-view.scss'

const baseCn = 'wishlist-view'

function WishlistView(props) {

  const gate = useInitGate()
  const auth = useAuth()

  const {uid: userId, displayName} = auth.isInitialized ? auth.user : {}

  const {
    clubId = userId, 
    memberId = userId, 
    itemId,
  } = useParams()

  const member = useObjectDb({
    path: ['member', memberId],
    enabled: !!userId,
    createFunction: buildSelfMember,
    createParams: [userId, displayName]
  })


  if(gate) return gate

  const handleAddClick = console.log

  return (
    <Page className={baseCn}>
      <Relationship view="Wishlist" member={member} />
      <ItemSelector onSelect={handleAddClick} />

      {member.wishlist.map(item => (
        <Card key={item.id}>
          <ItemMini item={item} member={member} />
        </Card>
      ))}
    </Page>
  );
}

export default WishlistView