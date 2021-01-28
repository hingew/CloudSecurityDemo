import PropTypes from 'prop-types'

const Video = ({ url, preview, loop, autoPlay, muted, controls }) => (
  <video className='w-full mb-4' poster={preview} autoPlay={autoPlay} loop={loop} muted={muted} controls={controls}>
    <source type='video/mp4' src={url} />
  </video>
)

Video.defaultProps = {
  loop: false,
  autoPlay: false,
  muted: false,
  controls: true
}

Video.propTypes = {
  url: PropTypes.string,
  preview: PropTypes.string
}

export default Video
