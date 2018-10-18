import React, { Component } from 'react'
import { ListItem, ListInfo, LoadMore } from '../style';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class List extends Component {
  render() {
    const { list } = this.props;
    console.log(list);
    return (
      <div>
        {
          list.map((item,index) => {
            return(
              <ListItem key={item.get('id')}>
                <Link to={`/detail/${item.get('id')}`}>
                  <img className='pic' alt=''  src={item.get('imgUrl')} />
                  <ListInfo>
                    <h3 className='title'>{item.get('title')}</h3>
                    <p className='desc'>{item.get('desc')}</p>
                  </ListInfo>
                </Link>
              </ListItem>
            )
          })
        }
      </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    list: state.getIn(['home', 'articleList'])
  }
}

export default connect(mapStateToProps, null)(List)
