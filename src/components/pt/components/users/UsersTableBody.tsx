import { usePaginationFragment, usePreloadedQuery } from "react-relay";
import type { UsersTableBodyProps } from "./types";
import type { UsersQuery } from "../../../../__generated__/UsersQuery.graphql";
import { GET_USERS, GET_USERS_LIST } from "./Users.queries";
import type { Users$key } from "../../../../__generated__/Users.graphql";
import EmptyCategory from "../categories/EmptyCategory";
import HighlightText from "../../../shared/highlight_text/HighlightText";
import { ActionButton, Actions } from "../categories/Categories.styles";
import emailIcon from "../../../../icons/email.svg";
import editIcon from "../../../../icons/edit.svg";
import offIcon from "../../../../icons/off.svg";
import onIcon from "../../../../icons/on.svg";
import Spinner from "../../../shared/loader/Loader";
import { statusMappings } from "./utils";
import deleteIcon from "../../../../icons/delete.svg";

const UsersTableBody = ({
  queryRef,
  searchTerm,
  searchStatus,
  setIsModalOpen,
  setIsResendEmailOpen,
  setIsDeleteModalOpen,
}: UsersTableBodyProps) => {
  "use memo";

  const query = usePreloadedQuery<UsersQuery>(GET_USERS, queryRef);

  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment<
    UsersQuery,
    Users$key
  >(GET_USERS_LIST, query);

  return (
    <>
      <tbody>
        {!data.adminUsers.edges.length ? (
          <EmptyCategory nrOfCols={3} />
        ) : (
          data.adminUsers.edges.map((user) => {
            if (!user.node) return null;

            return (
              <tr key={user.node.id}>
                <td>
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
                <td>
                  <HighlightText
                    text={statusMappings(user.node.status.toLowerCase())}
                    searchTerm={statusMappings(searchStatus)}
                  />
                </td>
                <td>
                  <Actions>
                    {user.node.status === "PENDING" &&
                    !user.node.deactivatedAt ? (
                      <ActionButton
                        onClick={() => setIsResendEmailOpen(user.node)}
                      >
                        <img src={emailIcon} alt="" />
                      </ActionButton>
                    ) : null}
                    {user.node.status === "DEACTIVATED" && (
                      <ActionButton
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
                      onClick={() => setIsModalOpen({ user: user.node })}
                    >
                      <img src={editIcon} alt="" />
                    </ActionButton>
                    <ActionButton
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
              </tr>
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
