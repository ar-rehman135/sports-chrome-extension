import React from "react";
import HeaderAccountSelect from "../../components/common/HeaderAccountSelect";
import {
  useGetAllNotifications,
  useMarkAllNotificationsAsRead,
} from "../../hooks/api/notifications";
import moment from 'moment';

import transferImg from "../../public/assets/transfer.png"
import offerImg from "../../public/assets/offer.png"
import inviteImg from "../../public/assets/invite.png"

import {
  BodyNotification,
  BodyTextNotification,
  BodyTimeNotification,
  Header,
  ImgNotification,
  ItemNotification,
  HeaderNotification
} from "./styles";

const Notifications = () => {
  const { notifications, isLoading } = useGetAllNotifications();
  const { markAllAsRead } = useMarkAllNotificationsAsRead();
  let img = '';
  let header = '';
  let description = '';

  const configNotification = (notification: any) => {
    switch (notification.type) {
      case "OfferRevoked":
        // img = offerRevokedImg;
        description = `The offer was revoked`;
        break;
      case "OfferSent":
        header = 'New Offer!!'
        img = offerImg;
        description = `${notification.data.sender_wallet_name} made an offer of ${notification.data.amount} for ${notification.data.nft_title}`;
        break;
      case "AppInvite":
        header = 'App Invite';
        img = inviteImg;
        description = `${notification.data.sender_wallet_name} invited you to try docusign experience`;
        break;
      case "Transfer":
        header = 'Transferd Successful!';
        img = transferImg;
        description = `${notification.data.nft_title} succesfully transfered to ${notification.data.sender_wallet_name}`;
        break;
    }
  }

  return (
    <>
      <HeaderAccountSelect />
      <Header>
        Notifications
        <a onClick={() => markAllAsRead()}>Mark All Read</a>
      </Header>
      {!isLoading &&
        notifications?.map((notification) => (
          <ItemNotification key={notification.id}>
            {configNotification(notification)}
            <ImgNotification src={img} alt="" />
            <BodyNotification>
              <HeaderNotification>
                <div>
                  {header}
                </div>
                <BodyTimeNotification>
                  {moment(notification.updatedAt).fromNow(true) + ' ago'}
                </BodyTimeNotification>
              </HeaderNotification>
              <BodyTextNotification>
                {description}
              </BodyTextNotification>
            </BodyNotification>

          </ItemNotification>
        ))}
    </>
  );
};

export default Notifications;
