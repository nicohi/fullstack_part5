const Notification = ({ message }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const okStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message[1] === null) {
    return null
  }

  if (message[0] === 'error')
    return (
      <div style={errorStyle}>
        {message[1]}
      </div>
    )

  return (
    <div style={okStyle}>
      {message[1]}
    </div>
  )

}

export default Notification
