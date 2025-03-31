import React from "react";
import { List, Datagrid, TextField, EmailField, DateField} from "react-admin";

const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="id" label="ID" />
      <TextField source="name" label="名稱" />
      <EmailField source="email" label="電郵" />
      <TextField source="role" label="角色" />
      <DateField source="createdAt" label="創立日期" showTime />
    </Datagrid>
  </List>
);

export default UserList;
