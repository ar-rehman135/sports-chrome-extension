import React, { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import clsx from "classnames";
import api from "../../services/apps";
import { COLORS } from "../../constants/colors";
import HeaderAccountSelect from "../../components/common/HeaderAccountSelect";
import { useGetAppActivity, useGetAppById, useGetCategoryById } from "../../hooks/api/apps";
import { ROUTES } from "../../const/routeNames";
import Loader from "../../components/core/Loader";
import SnackBar, {
  SnackBarType,
} from "../../components/core/SnackBar/SnackBar";
import "./styles.scss";

export default function DetailApp() {
  const { id } = useParams();
  const { app, isSearching } = useGetAppById(id || "");
  const {data: categoryResponse, isLoading} = useGetCategoryById(app?.categoryId)
  const {data: activityResponse, isLoading: isActivityApiLoading} = useGetAppActivity(id);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [accordionIsOpen, setAccordionIsOpen] = useState(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastStatus, setToastStatus] = useState<SnackBarType | null>(null);
  const [toastContent, setToastContent] = useState<string>("");
  const connectApp = async () => {
    //Todo:
    // Need in api response to check either app is already connected or not
    // if (!app.connected) { }
    // Need in api response to open app in browser new tab
    // if (app.appUrl) {
    // window.open(app.appurl)
    // }
    const resp = await api.connectAppToUser(id);
    if (resp.message) {
      setShowToast(true);
      setToastStatus(SnackBarType.SUCCESS);
      setToastContent("App connected successfully");
    } else if (resp.error) {
      setShowToast(true);
      setToastStatus(SnackBarType.ERROR);
      setToastContent("Failed to connecting App");
    }
  };

  return (
    <div className="detailApp">
      {showToast && toastStatus && toastContent && (
        <SnackBar
          type={toastStatus}
          visible={showToast}
          setVisible={setShowToast}
          content={toastContent}
        />
      )}
      <HeaderAccountSelect />
      {isSearching ? (
        <Loader style={{ color: COLORS.BLUE_900, height: 20, width: 20 }} />
      ) : (
        <>
          <div className="detailApp__header">
            <div className="detailApp__header__top" />
            <div className="detailApp__header__bottom">
              <img className="detailApp__header__logo" src={app?.appIcon} />
              <a className="detailApp__header__shareBtn" href={app?.app_url}>
                <img src="/assets/svg/share-icon.svg" alt="share" />
                <span>Share</span>
              </a>
            </div>
          </div>
          <div className="detailApp__content">
            <h1 className="detailApp__title">{app?.appName}</h1>
            <div className="detailApp__description">{app?.description}</div>
            <a
              className="detailApp__link"
              onClick={() =>
                navigate(ROUTES.CATEGORY.url.replace(":id", app?.categoryId))
              }
            >
              {!isLoading && categoryResponse?.data?.name || ""}
            </a>
            <div className="detailApp__footer">
              <a className="detailApp__openBtn" onClick={connectApp}>
                <span>Open</span>
                <img src="/assets/svg/icon-send.svg" alt="send" />
              </a>
              <div className="detailApp__subscribers">
                <img src="/assets/svg/icon-people.svg" alt="subscribers" />
                <span>{app?.connectedUsers?.toLocaleString()}+ users</span>
              </div>
            </div>
            <div className="detailApp__tabPanel">
              <div
                className={clsx("detailApp__tabPanel__tab", {
                  "detailApp__tabPanel__tab--active": activeTab === 0,
                })}
                onClick={() => setActiveTab(0)}
              >
                Details
              </div>
              <div
                className={clsx("detailApp__tabPanel__tab", {
                  "detailApp__tabPanel__tab--active": activeTab === 1,
                })}
                onClick={() => setActiveTab(1)}
              >
                Activities
              </div>
            </div>
            <div className="detailApp__tabContent">
              {!activeTab && (
                <div className="detailApp__tabContent__tab">
                  <div
                    className="detailApp__accordion"
                    onClick={() =>
                      setAccordionIsOpen((prevState) => !prevState)
                    }
                  >
                    <div className="detailApp__accordion__summary">
                      <h2 className="detailApp__tabContent__tab__title">
                        Overview
                      </h2>
                      <img
                        className={clsx("detailApp__accordion__arrow", {
                          "detailApp__accordion__arrow--rotated":
                            accordionIsOpen,
                        })}
                        src="/assets/chevron-r-black.svg"
                        alt="chevron"
                      />
                    </div>
                    {accordionIsOpen && (
                      <div className="detailApp__accordion_details">
                        <span className="detailApp__tabContent__tab__details">
                          {app?.details}
                        </span>
                        <a
                          className="detailApp__tabContent__tab__appUrl"
                          href={app.app_url}
                          target="_blank"
                        >
                          <img src="/assets/svg/world-icon.svg" alt="world" />
                          <span>{app.app_url}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {!!activeTab && (
                <div className="detailApp__tabContent__tab">
                  <div className="detailApp__badge">
                    {app?.activities?.length} activity found
                  </div>
                  {app?.activities?.map((item: any) => (
                    <div className="detailApp__activity">
                      <img src={item.user.avatar} alt="avatar" />
                      <div className="detailApp__activity__details">
                        <div>
                          <span>{item.user.account}</span> {item.activity}
                        </div>
                        <div className="detailApp__activity__details__date">
                          {item.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
