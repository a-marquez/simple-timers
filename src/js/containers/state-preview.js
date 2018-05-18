import {connect} from 'react-redux'
import ValuePre from 'value-pre'

const StatePreview = connect(
  state => ({value: state})
)(ValuePre)

export default StatePreview
