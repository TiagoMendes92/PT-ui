import { useQueryLoader } from "react-relay";
import { GET_USERS } from "./Users.queries";
import type {
  UsersQuery,
  UserStatus,
} from "../../../../__generated__/UsersQuery.graphql";
import { Suspense, useEffect, useState } from "react";
import type { User, UsersProps } from "./types";
import TableHeader from "./TableHeader";
import UsersTableBody from "./UsersTableBody";
import { createPortal } from "react-dom";
import Modal from "../../../shared/modal/Modal";
import UsersModal from "./UsersModal";
import ResendEmail from "./ResendEmail";
import DeleteUserModal from "./DeleteUserModal";
import {
  LoaderContainer,
  Search,
  SearchIcon,
  SearchInput,
  TableContainer,
  TablePageContent,
  TablePageWrapper,
  Thead,
} from "../../../shared/styles/Table.styled";
import { ExerciseActions } from "../exercises/Exercises.styled";
import searchIcon from "../../../../icons/search.svg";
import Select from "../../../shared/select/Select";
import Spinner from "../../../shared/loader/Loader";
import { UsersTable } from "./Users.styled";
import useIsMobile from "../../../../hooks/useIsMobile";

const statusOptions = [
  { label: "Ativo", value: "ACTIVE" },
  { label: "Desativo", value: "DEACTIVATED" },
  { label: "Pendente", value: "PENDING" },
];

const Users = ({
  queryRef,
  searchStatus,
  setSearchStatus,
  searchTerm,
  setSearchTerm,
  setIsModalOpen,
  setIsResendEmailOpen,
  setIsDeleteModalOpen,
}: UsersProps) => {
  const isMobile = useIsMobile(576);
  const isTablet = useIsMobile(630);
  const isSmallDesktop = useIsMobile(768);
  const isDesktop = useIsMobile(920);
  const isBigDesktop = useIsMobile(1044);
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
  const [localSearchTerm, setLocalSearchTerm] = useState<string>("");

  const handleSearch = () => {
    setSearchTerm(localSearchTerm);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== undefined) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, handleSearch]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <TablePageWrapper>
      <TableHeader setIsModalOpen={setIsModalOpen} />
      <TablePageContent>
        <TableContainer>
          <ExerciseActions>
            <Search>
              <SearchInput
                hasError={false}
                placeholder="Pesquisar por nome..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                onKeyUp={handleKeyPress}
              />
              <SearchIcon>
                <img src={searchIcon} />
              </SearchIcon>
            </Search>
            <Select
              style={{ marginTop: "0px" }}
              options={statusOptions}
              value={searchStatus}
              onChange={(e) => {
                setSearchStatus(e as UserStatus | "");
              }}
              placeholder="Pesquisar por estado..."
              hasError={false}
            />
          </ExerciseActions>
          <UsersTable>
            <Thead>
              <tr>
                <th className="foto">Foto</th>
                <th className="name">Nome</th>
                <th className="status">Estado</th>
                <th className="actions">Ações</th>
              </tr>
            </Thead>
            <Suspense
              fallback={
                <LoaderContainer>
                  <td colSpan={cols}>
                    <Spinner />
                  </td>
                </LoaderContainer>
              }
            >
              <UsersTableBody
                queryRef={queryRef}
                searchTerm={searchTerm}
                searchStatus={searchStatus}
                setIsModalOpen={setIsModalOpen}
                setIsResendEmailOpen={setIsResendEmailOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            </Suspense>
          </UsersTable>
        </TableContainer>
      </TablePageContent>
    </TablePageWrapper>
  );
};

const Loader = () => {
  const [queryRef, fetchData] = useQueryLoader<UsersQuery>(GET_USERS);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<UserStatus | "">("");

  const [isModalOpen, setIsModalOpen] = useState<{
    user: User | null;
  } | null>(null);
  const [isResendEmailOpen, setIsResendEmailOpen] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<{
    user: User;
    action: "archive" | "deactivate" | "activate";
  } | null>(null);

  useEffect(() => {
    fetchData({
      first: 10,
      filter: {
        search: searchTerm,
        ...(searchStatus && { status: searchStatus }),
      },
    });
  }, [searchTerm, searchStatus]);

  const handleUserAction = () => {
    setIsModalOpen(null);
    setIsDeleteModalOpen(null);
  };

  return (
    <div>
      {queryRef ? (
        <>
          <Users
            queryRef={queryRef}
            searchStatus={searchStatus}
            setSearchStatus={setSearchStatus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setIsModalOpen={setIsModalOpen}
            setIsResendEmailOpen={setIsResendEmailOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
          {isModalOpen
            ? createPortal(
                <Modal
                  title={isModalOpen.user ? "Editar aluno" : "Novo aluno"}
                  onDismiss={() => setIsModalOpen(null)}
                >
                  <UsersModal
                    searchTerm={searchTerm}
                    searchStatus={searchStatus}
                    user={isModalOpen.user}
                    onSubmit={handleUserAction}
                  />
                </Modal>,
                document.body
              )
            : isResendEmailOpen
            ? createPortal(
                <Modal
                  title={"Reenviar e-mail"}
                  onDismiss={() => setIsResendEmailOpen(null)}
                >
                  <ResendEmail
                    user={isResendEmailOpen}
                    onResend={() => setIsResendEmailOpen(null)}
                  />
                </Modal>,
                document.body
              )
            : isDeleteModalOpen
            ? createPortal(
                <Modal
                  title={
                    isDeleteModalOpen.action === "archive"
                      ? "Apagar aluno"
                      : isDeleteModalOpen.action === "activate"
                      ? "Activar aluno"
                      : "Desativar aluno"
                  }
                  onDismiss={() => setIsDeleteModalOpen(null)}
                >
                  <DeleteUserModal
                    user={isDeleteModalOpen.user}
                    action={isDeleteModalOpen.action}
                    onDelete={handleUserAction}
                  />
                </Modal>,
                document.body
              )
            : null}
        </>
      ) : null}
    </div>
  );
};

export default Loader;
