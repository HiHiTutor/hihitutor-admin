import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  FunctionField
} from "react-admin";

const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="id" label="ID" />

      {/* ✅ 改動這裡：直接比對 latestProfile vs approvedProfile */}
      <FunctionField
        label="名稱"
        render={(record) => {
          const latest = JSON.stringify(record.profile?.latestProfile || {});
          const approved = JSON.stringify(record.profile?.approvedProfile || {});
          const hasPending = latest !== approved;
          return hasPending ? `${record.name} 🟡` : record.name;
        }}
      />

      <EmailField source="email" label="電郵" />
      <TextField source="role" label="角色" />
      <DateField source="createdAt" label="創立日期" showTime />
    </Datagrid>
  </List>
);

export default UserList;
