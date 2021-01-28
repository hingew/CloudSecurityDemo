/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import CardTitle from './CardTitle'
import Metrics from './CardMetrics'
import CardMedia from './CardMedia'
import CardContent from './CardContent'

const Card = ({ author, media, metrics, text, createdAt }) => {
  return (
    <div className='my-2'>
      <div className='relative bg-white rounded-lg shadow-sm'>
        <CardTitle name={author.name} userName={author.username} imgUrl={author.avatarURL} createdAt={createdAt} />
        <CardMedia media={media} />
        <CardContent text={text} />
        <Metrics {...metrics} />
      </div>
    </div>
  )
}

Card.defaultProps = {
  public_metrics: {},
  media: {},
  author: {}
}

Card.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  metrics: PropTypes.object,
  media: PropTypes.object,
  createdAt: PropTypes.string,
  author: PropTypes.object
}

export default Card
