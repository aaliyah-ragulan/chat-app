import React from 'react'
import PropTypes from 'prop-types'
import { formatRelative } from 'date-fns'

// Date Component being passed to Message Component
// slice makes a copy
// + formattedDate.slice(1)

const formatDate = (date) => {
  let formattedDate = ''
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date())
    // Uppercase the first letter
    formattedDate = formattedDate.charAt(0).toUpperCase()
  }
  // return formattedDate
  console.log(formattedDate)
}

// 1. Message Component
// deconstructed props
const Message = ({
  createdAt = null,
  text = '',
  displayName = '',
  photoURL = '',
}) => {
  if (!text) return null

  // 2.
  // displaying the name, pic, text and date
  return (
    <div>
      {photoURL ? <img src={photoURL} /> : null}
      <div>
        <div>
          {displayName ? <p>{displayName}</p> : null}
          {createdAt?.seconds ? (
            <span>{formatDate(new Date(createdAt.seconds * 1000))}</span>
          ) : null}
        </div>
        <p>{text}</p>
      </div>
    </div>
  )
}

// 3.
// setting the default to specific type
// defining the props we are expecting
// not sure what shape is

Message.propTypes = {
  text: PropTypes.string,
  createdAt: PropTypes.shape({
    seconds: PropTypes.number,
  }),
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
}

export default Message
