import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'primereact/message'

const PageNotFound = () => {
  return (
    <div className="p-grid p-justify-center p-mt-2">
      <div className="p-col-12">
        <Message severity="error" 
          text={"This is not the page you're looking for. Move along!"} />
      </div>
    </div>
  )
}

export default connect()(PageNotFound)