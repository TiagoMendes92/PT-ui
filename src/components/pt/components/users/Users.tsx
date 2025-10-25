import { useQueryLoader } from "react-relay";
import { GET_USERS } from "./Users.queries";
import type {
  UsersQuery,
  UserStatus,
} from "../../../../__generated__/UsersQuery.graphql";
import { Suspense, useEffect, useState } from "react";
import type { User, UsersProps } from "./types";
import TableHeader from "./TableHeader";
import { Table } from "../categories/Categories.styles";
import UsersTableBody from "./UsersTableBody";
import { createPortal } from "react-dom";
import Modal from "../../../shared/modal/Modal";
import UsersModal from "./UsersModal";
import ResendEmail from "./ResendEmail";
import DeleteUserModal from "./DeleteUserModal";

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
  const [localSearchTerm, setLocalSearchTerm] = useState<string>("");

  const handleSearch = () => {
    setSearchTerm(localSearchTerm);
  };

  return (
    <>
      <TableHeader
        searchStatus={searchStatus}
        setSearchStatus={setSearchStatus}
        onSearch={handleSearch}
        searchTerm={localSearchTerm}
        setSearchTerm={setLocalSearchTerm}
        setIsModalOpen={setIsModalOpen}
      />
      <Table style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ width: "auto" }}>Nome</th>
            <th style={{ width: "90px" }}>Estado</th>
            <th style={{ width: "85px" }}>Ações</th>
          </tr>
        </thead>
        <Suspense fallback={<div>Loading...</div>}>
          <UsersTableBody
            queryRef={queryRef}
            searchTerm={searchTerm}
            searchStatus={searchStatus}
            setIsModalOpen={setIsModalOpen}
            setIsResendEmailOpen={setIsResendEmailOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
        </Suspense>
      </Table>
    </>
  );
};

const Loader = () => {
  "use memo";

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
