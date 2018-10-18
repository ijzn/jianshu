import React, { Component } from 'react'
import { connect } from 'react-redux';
import { TopicWrapper, TopicItem } from '../style';

class Topic extends Component {
  render() {
    const { list } = this.props;
    return (
      <div>
        <TopicWrapper>
          {
            list.map((item, index) => {
              return (
                <TopicItem key={item.get('id')}>
                  <img
                    className='topic-pic'
                    src={item.get('imgUrl')}
                    alt=''
                  />
                  {item.get('title')}
                </TopicItem>
              )
            })
          }


        </TopicWrapper>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    list: state.getIn(['home', 'topicList'])
  }
}

export default connect(mapStateToProps, null)(Topic)
