import React from 'react'

function GroupList(props) {

  return (
    <>
      <div
        style={props.id == props.selectedGroup ? { background: "#2F2F2F2B", width: "100%" } : { background: "white" }}
        className='individualGroup'
        onClick={() => { props.setSelectedGroup(props.id) }}>

        <div
          style={{ background: props.groupIconColor }}
          className='groupIcon'>

          {props.name.slice(0, 2).toUpperCase()}
        </div>
        
        <div className='groupName'>
          {props.name}
        </div>

      </div>
    </>
  )
}

export default GroupList