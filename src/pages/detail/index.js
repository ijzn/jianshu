import React, { Component } from 'react'
import { connect } from 'react-redux';
import { actionCreator } from './store';
import { DetailWrapper, Header, Content } from './style';


class Detail extends Component {
  render() {
    const {title, content} = this.props;
    return (
      <DetailWrapper>
				<Header>{title}</Header>
				<Content 
					dangerouslySetInnerHTML={{__html: content}}
        />
			</DetailWrapper>
    )
  }
  
  componentDidMount() {
    alert(`文章编号：${this.props.match.params.id}`)
    console.log(this.props.match.params.id);
    this.props.initDetail()
  }
  
}
const mapStateToProps = (state, ownProps) => {
  return {
    title: state.getIn(['detail','title']),
    content: state.getIn(['detail','content'])
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initDetail: () => {
      dispatch(actionCreator.getDetailData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)