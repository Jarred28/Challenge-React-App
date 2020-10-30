import React, { useEffect } from 'react';
import { notification } from 'antd';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';  

export const openNotification = (data) => {
  const { type, message } = data
  notification[type]({
    message
  });
};

const NotificationManager = ({children}) => {
  const notificationData = useSelector(state=>state.notification)
  useEffect(() => {
    if (!!notificationData.message) 
      openNotification(notificationData)
  }, [notificationData])
  return (
    <>
      {children}
    </>
  )
}

NotificationManager.propTypes = {
  children: PropTypes.element.isRequired,
}

export default NotificationManager;
