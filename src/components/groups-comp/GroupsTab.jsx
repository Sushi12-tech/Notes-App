import React from 'react'
import './groups.css'
import GroupList from './GroupList';


function GroupsTab(props) {
  return (
    <>
      <section className='leftSection'>
        {/*Top Heading */}
        <div className='leftTopSection'>
          <h2 className='heading'>Pocket Notes</h2>
        </div>
        {/*Map through every group*/}
        <div className='leftBottomSection'>
          {
            props.everyGroup.map((group) => (
              <GroupList
                key={group.id}
                id={group.id}
                name={group.name}
                groupIconColor={group.color}
                selectedGroup={props.selectedGroup}
                setSelectedGroup={props.setSelectedGroup} />
            ))
          }
          {/*Create New Group Button */}
          <button
            onClick={() => {
              props.setOpenGroupPopUp(true);
            }}
            className='btn-style addGroupBtn'>
            <span className='plus'>+</span>
          </button>
        </div>

      </section>
    </>
  )
}

export default GroupsTab