const Loading = ({ size = 24 }) => (
  <div className='w-full text-center my-8'>
    <div className={`inline-block align-middle animate-spin rounded-full border-8 border-t-8 border-gray-200 h-${size} w-${size}`} style={{ borderTopColor: '#1E40AF' }} />
  </div>
)

export default Loading
