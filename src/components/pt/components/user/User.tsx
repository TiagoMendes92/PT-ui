import { usePreloadedQuery, useQueryLoader } from "react-relay";
import { useNavigate, useParams } from "react-router-dom";
import { GET_USER } from "./User.queries";
import type { UserQuery } from "../../../../__generated__/UserQuery.graphql";
import { Suspense, useEffect } from "react";
import type { UserProps } from "./User.types";
import Spinner from "../../../shared/loader/Loader";
import { UserNotFound } from "./User.styled";
import UserPageTemplate from "./UserPageTemplate";
import UserDetails from "./UserDetails";
import UserTrainingPlan from "./UserTrainingPlan";

const User = ({ queryRef }: UserProps) => {
  const data = usePreloadedQuery<UserQuery>(GET_USER, queryRef);
  if (!data.adminUser) {
    return (
      <UserPageTemplate>
        <UserNotFound>User not found</UserNotFound>
      </UserPageTemplate>
    );
  }

  const { adminUser } = data;
  return (
    <UserPageTemplate>
      <UserDetails user={adminUser} />
      <UserTrainingPlan user={adminUser}></UserTrainingPlan>
    </UserPageTemplate>
  );
};

const Loader = () => {
  const { id } = useParams<{ id: string }>();
  const [queryRef, loadQuery] = useQueryLoader<UserQuery>(GET_USER);

  useEffect(() => {
    if (!id) {
      return;
    }

    loadQuery({ id });
  }, [id, loadQuery]);

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      }
    >
      {queryRef ? <User queryRef={queryRef} /> : null}
    </Suspense>
  );
};

export default Loader;
