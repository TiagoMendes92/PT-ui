import PreviewFile from "../../../shared/preview_file/PreviewFiles";
import {
  UserDetailsContainer,
  UserDetailsContainerGrid,
  UserDetailsKeyValue,
  UserVarNotDefined,
} from "./User.styled";
import type { AdminUser } from "./User.types";
import { getAge } from "./User.utils";

const UserDetails = ({ user }: { user: AdminUser }) => (
  <UserDetailsContainer>
    <UserDetailsContainerGrid>
      <PreviewFile
        width={100}
        height={100}
        file={user.userDetails?.photographyUrl || null}
        fallbackSrc="/placeholder.png"
      />
      <UserDetailsKeyValue>
        <div>
          <b>Nome: </b>
          {user.name}
        </div>
        <div>
          <b>Email: </b>
          {user.email}
        </div>
        <div>
          <b>Idade: </b>
          {user.userDetails?.birthday ? (
            getAge(user.userDetails.birthday)
          ) : (
            <UserVarNotDefined>Não definida</UserVarNotDefined>
          )}
        </div>
        <div>
          <b>Altura: </b>
          {user.userDetails?.height ? (
            Number(user.userDetails.height * 0.01) + " m"
          ) : (
            <UserVarNotDefined>Não definida</UserVarNotDefined>
          )}
        </div>
        <div>
          <b>Peso: </b>
          {user.userDetails?.weight ? (
            user.userDetails.weight + " kg"
          ) : (
            <UserVarNotDefined>Não definida</UserVarNotDefined>
          )}
        </div>
        <div>
          <b>Sexo: </b>
          {user.userDetails?.sex ? (
            user.userDetails.sex === "male" ? (
              "Masculino"
            ) : (
              "Feminino"
            )
          ) : (
            <UserVarNotDefined>Não definida</UserVarNotDefined>
          )}
        </div>
      </UserDetailsKeyValue>
    </UserDetailsContainerGrid>
  </UserDetailsContainer>
);

export default UserDetails;
