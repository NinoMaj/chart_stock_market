// @flow

import React from 'react'

import Button from '../component/button'

class AddStock extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      value: '',
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
  }

  handleOnChange(e) {
      this.setState({
        value: e.target.value
      })
  } 

  handleEnter(e) {
    if (e.key === 'Enter' && e.target.value) {
      this.handleClick()
    }
  } 

  handleClick() {
    this.props.getStock(this.state.value)
    this.setState({
      value: ''
    })
  }  

  render() {
    return(
      <div className="row justify-content-center">
        <div className="col-6">
          <input type="text" className="form-control" placeholder="Enter stock..." value={this.state.value} onChange={this.handleOnChange} onKeyPress={this.handleEnter}/>
          <span className="input-group-btn">
            <Button label="Add stock" handleClick={this.handleClick} />
        </span>
        </div>
      </div>
    )
  }
}

export default AddStock
