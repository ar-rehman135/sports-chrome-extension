import React, { useEffect, useState } from "react";

import { ContextMain } from "../../context/store";
import { ReducerTypes } from "../../context/reducer";
import { ROUTES } from "../../const/routeNames";

import Modal from "../../components/Modal";
import HeaderAccountSelect from "../../components/common/HeaderAccountSelect";
import { useGetApps } from "../../hooks/api/apps";

import { useGetConnectedApps } from "../../hooks/api/apps";

// as of now we removed category related functionality, will use in future
// import { useGetAllCategories } from "../../hooks/api/categories";
// import CategoryFilter from "./CategoryFilter";
// import { useGetAllCategories } from "../../hooks/api/categories";
// import rightArrow from "../../public/assets/experience/arrow-right-blue.svg";
// import Category from "./Category";

import SearchInput from "./SearchInput";

import "./styles.scss";

import ExperienceItem from "./Experience";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "react-query";
import Application from "./Application";
import { ConnectedApp } from "../../services/apps";
import api from "../../services";
import Loader from "../../components/core/Loader";
import { COLORS } from "../../constants/colors";
import { useNavigate } from "react-router";

const ExperiencesDashboard = () => {
  const { apps, isSearching } = useGetApps();
  const [searchedApps, setSearchApps] = useState([]);
  const { connectedApps, isSearchingConnectedApp, totalConnectedApps } =
    useGetConnectedApps();
  // as of now we removed category related functionality, will use in future
  //   const { categories, isSearching: isCategorySearching } =
  //     useGetAllCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeTab, setActive] = useState(0);
  const [, dispatch] = React.useContext(ContextMain);

  const [searchResult] = useState([]);
  const debounceSearch = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    ["appsresults", debounceSearch],
    () => api.searchApps(searchQuery),
    { enabled: Boolean(debounceSearch) && searchQuery?.length > 3 }
  );
  useEffect(() => {
    if (data) {
      setSearchApps(data);
    }
  }, [isLoading, data]);

  const search = (value: string) => {
    setSearchQuery(value);
  };

  const toggleModal = () => setModalIsOpen((prev) => !prev);

  // as of now we removed category related functionality, will use in future
  // const { categories, isSearching: isCategorySearching } = useGetAllCategories();
  // const [filteredCategories, setFilteredCategories] = useState(categories?.map((item) => ({ ...item, disabled: false })));

  // useEffect(() => {
  //     if (categories && !filteredCategories) {
  //         setFilteredCategories(categories.map((item) => ({ ...item, disabled: false })));
  //     }
  // }, [categories, filteredCategories]);

  useEffect(() => {
    dispatch({
      type: "SET_UI",
      payload: ROUTES.DASHBOARD.url,
      reducer: ReducerTypes.Main,
    });
  }, []);

  return (
    <>
      <HeaderAccountSelect />
      <Modal open={modalIsOpen} setOpen={setModalIsOpen} closeBtn>
        {/* as of now we removed category related functionality, will use in future
                    <CategoryFilter categories={filteredCategories} setCategories={setFilteredCategories} />
                */}
      </Modal>

      <section className="root content">
        <SearchInput search={search} toggleFilterModal={toggleModal} />

        {searchQuery.length > 0 ? (
          <div className="searchResults">
            <div className="trending_container">
              <div className="categories_header">
                <span className="title">
                  {searchResult && searchResult.length} experience found
                </span>
              </div>
              <div className="experiences_wrapper">
                {isLoading ? "Searching..." : ""}
                {!isLoading &&
                  searchedApps &&
                  searchedApps?.map((experience: any, index: any) => (
                    <ExperienceItem item={experience} key={index} />
                  ))}
              </div>
            </div>

            <div className="trending_container">
              <div className="categories_header">
                <span className="title">Recent experiences</span>
              </div>
              <div className="experiences_wrapper">
                {isSearching ? "Searching..." : ""}
                {!isSearching &&
                  apps &&
                  apps.map((app: any, index: any) => (
                    <ExperienceItem item={app} key={index} />
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="options">
              <button
                className={`options__btn ${activeTab == 0 ? "options__btn-dark" : "options__btn-white"
                  }`}
                onClick={() => {
                  setActive(0);
                }}
              >
                Discover
              </button>
              <button
                className={`options__btn ${activeTab == 1 ? "options__btn-dark" : "options__btn-white"
                  }`}
                onClick={() => {
                  setActive(1);
                }}
              >
                My apps
              </button>
            </div>
            {activeTab === 0 && (
              <div className="my_app_body_wrapper">
                {isSearching && (
                  <Loader
                    style={{ color: COLORS.BLUE_900, height: 20, width: 20 }}
                  />
                )}
                {!isSearching && apps?.length === 0 && (
                  <p className="my_app_label">No data found.</p>
                )}
                {!isSearching &&
                  apps?.map((app: any, index: number) => (
                    <Application
                      key={index}
                      application={{
                        name: app.appName,
                        description: app.description,
                        users: app.connectedUsers,
                        icon: app.appIcon,
                        onClick: () => {
                          navigate(
                            ROUTES.DETAIL_APP.url.replace(":id", app.appId)
                          );
                        },
                      }}
                    />
                  ))}
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <div className="my_app_container">
                  <div className="my_app_header">
                    <span className="title">Connected Experiences</span>
                  </div>
                  <div className="my_app_body_wrapper">
                    {isSearchingConnectedApp && (
                      <p className="my_app_label">Searching...</p>
                    )}
                    {!isSearchingConnectedApp && totalConnectedApps === 0 && (
                      <p className="my_app_label">No data found.</p>
                    )}
                    {!isSearchingConnectedApp &&
                      connectedApps &&
                      connectedApps?.map((app: ConnectedApp, index: number) => (
                        <Application
                          application={{
                            name: app.appName,
                            description: app.description,
                            users: app?.connectedUsers || 0,
                            icon: app?.appIcon || '',
                            onClick: () => {
                              navigate(
                                ROUTES.DETAIL_APP.url.replace(":id", app.appId)
                              );
                            },
                          }}
                        />
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default ExperiencesDashboard;
