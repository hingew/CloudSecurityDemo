/* eslint-disable camelcase */
import Video from '../common/video'

const MEDIA_TYPES = {
  video: 'video',
  gif: 'animated_gif',
  photo: 'photo'
}

const getComponent = ({ type, preview_image_url, url }) => {
  switch (type) {
    case MEDIA_TYPES.video:
      return <Video url={url} preview={preview_image_url} />
    case MEDIA_TYPES.gif:
      return <Video url={url} preview={preview_image_url} loop autoPlay />
    case MEDIA_TYPES.photo:
      return <img className='w-full mb-4' src={url} alt='' />
    default:
      return null
  }
}

const Media = {
  getComponent,
  MEDIA_TYPES
}

export default Media
