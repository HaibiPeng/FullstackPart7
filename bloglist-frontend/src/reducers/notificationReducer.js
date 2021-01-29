const notificationReducer = (state = { message: ``, toShow: false, notitype: '' }, action) => {
    switch (action.type) {
      case 'SUCCESS_NOTIFICATION':
        return { message: `${action.data.content}`, toShow: true,  notitype: true }
      case 'ERROR_NOTIFICATION':
        return { message: `${action.data.content}`, toShow: true, notitype: false }
      case 'REMOVE_NOTIFICATION':
        return { message: ``, toShow: false }
      default:
        return state
    }
  }


function showNotification(type, content) {
  return { type: type, data: { content } }
}

function hideNotification() {
  return { type: 'REMOVE_NOTIFICATION' }
}

let nextTimerId = []
export const setSuccessNotification = (content, time) => {
  return function (dispatch) {
    
    dispatch(
      showNotification('SUCCESS_NOTIFICATION', content)
    )

  nextTimerId = nextTimerId.concat(
    setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  )
    window.clearTimeout(nextTimerId[nextTimerId.length-2])
  }
}

export const setErrorNotification = (content, time) => {
  return function (dispatch) {
    dispatch(
      showNotification('ERROR_NOTIFICATION', content)
    )

    nextTimerId = nextTimerId.concat(
      setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
    )
    
    window.clearTimeout(nextTimerId[nextTimerId.length-2])
  }
}

export default notificationReducer