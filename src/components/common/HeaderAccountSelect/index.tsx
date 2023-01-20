import React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../const/routeNames";
import HeaderBg from "../../layouts/HeaderBg";
import backIcon from "../../../public/assets/back-icon.png";
import homeIcon from "../../../public/assets/home-icon.svg";
import notiIcon from "../../../public/assets/notification.svg";
import settingsIcon from "../../../public/assets/settings.svg";
import SelectAccountBtn from "../../SelectAccountBtn";
import { NotificationBadge, Badge } from "./style";
import { useGetUnreadNotificationsAmount } from "../../../hooks/api/notifications";
interface Props {
  noBack?: boolean;
}

const HeaderAccountSelect = ({ noBack }: Props) => {
  const { notificationAmount, isLoading } = useGetUnreadNotificationsAmount();

  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  const handleGoToHome = () => {
    navigate(ROUTES.DASHBOARD.url);
  };

  const handleGoToNotifications = () => {
    navigate(ROUTES.NOTIFICATION.url);
  };

  const handleGoToSettings = () => {
    navigate(ROUTES.SETTINGS.url);
  };

  return (
    <>
      <HeaderBg>
        <header className="header-dash">
          {!noBack ? (
            <a onClick={back}>
              <img src={backIcon} alt="" />
            </a>
          ) : (
            ""
          )}

          <a onClick={handleGoToHome}>
            <img src={homeIcon} alt="" width={21} />
          </a>
          <SelectAccountBtn />
          <div>
            <NotificationBadge onClick={handleGoToNotifications}>
              <img src={notiIcon} alt=""  width={18}/>
              {!isLoading && notificationAmount?.count > 0 && (
                <Badge>{notificationAmount?.count}</Badge>
              )}
            </NotificationBadge>
            <a onClick={handleGoToSettings}>
              <img src={settingsIcon} alt="" width={22} />
            </a>
          </div>
        </header>
      </HeaderBg>
    </>
  );
};

export default HeaderAccountSelect;
