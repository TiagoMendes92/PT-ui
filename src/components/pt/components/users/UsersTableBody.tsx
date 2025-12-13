import { usePaginationFragment, usePreloadedQuery } from "react-relay";
import type { UsersTableBodyProps } from "./types";
import type { UsersQuery } from "../../../../__generated__/UsersQuery.graphql";
import { GET_USERS, GET_USERS_LIST } from "./Users.queries";
import type { Users$key } from "../../../../__generated__/Users.graphql";
import EmptyCategory from "../categories/EmptyCategory";
import HighlightText from "../../../shared/highlight_text/HighlightText";
import emailIcon from "../../../../icons/email.svg";
import editIcon from "../../../../icons/edit.svg";
import offIcon from "../../../../icons/off.svg";
import onIcon from "../../../../icons/on.svg";
import Spinner from "../../../shared/loader/Loader";
import { statusMappings } from "./utils";
import deleteIcon from "../../../../icons/delete.svg";
import { ActionButton, Actions } from "../../../shared/styles/Table.styled";
import { StatusPill, UserRow } from "./Users.styled";
import PreviewFile from "../../../shared/preview_file/PreviewFiles";
import useIsMobile from "../../../../hooks/useIsMobile";
import { useNavigate } from "react-router-dom";

const UsersTableBody = ({
  queryRef,
  searchTerm,
  searchStatus,
  setIsModalOpen,
  setIsResendEmailOpen,
  setIsDeleteModalOpen,
}: UsersTableBodyProps) => {
  const isMobile = useIsMobile(576);
  const isTablet = useIsMobile(630);
  const isSmallDesktop = useIsMobile(768);
  const isDesktop = useIsMobile(920);
  const isBigDesktop = useIsMobile(1044);
  const navigate = useNavigate();

  const cols = isMobile
    ? 2
    : isTablet
    ? 3
    : isSmallDesktop
    ? 4
    : isDesktop
    ? 2
    : isBigDesktop
    ? 3
    : 4;
  const query = usePreloadedQuery<UsersQuery>(GET_USERS, queryRef);

  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment<
    UsersQuery,
    Users$key
  >(GET_USERS_LIST, query);

  return (
    <>
      <tbody>
        {!data.adminUsers.edges.length ? (
          <EmptyCategory nrOfCols={cols} />
        ) : (
          data.adminUsers.edges.map((user) => {
            if (!user.node) return null;

            return (
              <UserRow
                key={user.node.id}
                onClick={() => navigate(`/pt/users/${user.node.id}`)}
              >
                <td className="foto">
                  <PreviewFile
                    width={50}
                    height={"auto"}
                    file={user.node.photo?.url || null}
                    fallbackSrc="/placeholder.png"
                  />
                </td>
                <td className="name">
                  <HighlightText
                    text={user.node.name}
                    searchTerm={searchTerm}
                  />
                  <div style={{ fontSize: "12px" }}>
                    <HighlightText
                      text={user.node.email}
                      searchTerm={searchTerm}
                    />
                  </div>
                </td>
                <td className="status">
                  <StatusPill status={user.node.status}>
                    <HighlightText
                      text={statusMappings(user.node.status.toLowerCase())}
                      searchTerm={statusMappings(searchStatus)}
                    />
                  </StatusPill>
                </td>
                <td className="actions">
                  <Actions>
                    {user.node.status === "PENDING" &&
                    !user.node.deactivatedAt ? (
                      <ActionButton
                        action="edit"
                        onClick={() => setIsResendEmailOpen(user.node)}
                      >
                        <img src={emailIcon} alt="" />
                      </ActionButton>
                    ) : null}
                    {user.node.status === "DEACTIVATED" && (
                      <ActionButton
                        action="edit"
                        onClick={() =>
                          setIsDeleteModalOpen({
                            user: user.node,
                            action: "activate",
                          })
                        }
                      >
                        <img src={onIcon} alt="" />
                      </ActionButton>
                    )}
                    {user.node.status === "ACTIVE" && (
                      <ActionButton
                        action="delete"
                        onClick={() => {
                          setIsDeleteModalOpen({
                            user: user.node,
                            action: "deactivate",
                          });
                        }}
                      >
                        <img src={offIcon} alt="" />
                      </ActionButton>
                    )}
                    <ActionButton
                      action="edit"
                      onClick={() => setIsModalOpen({ user: user.node })}
                    >
                      <img src={editIcon} alt="" />
                    </ActionButton>
                    <ActionButton
                      action="delete"
                      onClick={() =>
                        setIsDeleteModalOpen({
                          user: user.node,
                          action: "archive",
                        })
                      }
                    >
                      <img src={deleteIcon} alt="" />
                    </ActionButton>
                  </Actions>
                </td>
              </UserRow>
            );
          })
        )}
      </tbody>
      {isLoadingNext ? <Spinner size={25} color="white" /> : null}
      {hasNext && !isLoadingNext ? (
        <button onClick={() => loadNext(10)}>Load more</button>
      ) : null}
    </>
  );
};

export default UsersTableBody;
