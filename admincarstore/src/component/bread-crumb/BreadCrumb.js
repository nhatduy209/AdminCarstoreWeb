/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import * as React from 'react';
import {Link, useLocation, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

const BreadCrumb = () => {
  const dispatch = useDispatch();
  const breadcrumb = useSelector(state => state.globalReducer.breadcrumb);
  const renderBreadcrumb = () => {
    breadcrumb.map( (item, index) => {
        return (
          <Link to={item.path} key={index}
          className="bread-crumb-item">
            {item.label}
          </Link>
        )
    })
  }
  return (
    <div className="bread-crumb">
      {renderBreadcrumb()}
    </div>
  );
}

export default BreadCrumb;
