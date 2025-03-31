import React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  EmailField,
  DateField,
  ArrayField,
  SingleFieldList,
  ChipField,
} from "react-admin";
import ApproveProfileButton from "./ApproveProfileButton"; // ⬅️ 新增審批按鈕

const UserShow = (props) => (
  <Show {...props} title="用戶資料">
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="name" label="名稱" />
      <EmailField source="email" label="電郵" />
      <DateField source="birthdate" label="出生日期" />
      <TextField source="age" label="年齡" />
      <TextField source="phone" label="電話" />
      <TextField source="userType" label="用戶類型" />
      <ArrayField source="tags" label="標籤">
        <SingleFieldList>
          <ChipField source="" />
        </SingleFieldList>
      </ArrayField>
      <TextField source="profileStatus" label="個人檔案狀態" />
      <DateField source="createdAt" label="註冊日期" showTime />

      {/* 顯示 latestProfile 詳情 */}
      <TextField source="profile.latestProfile.fullName" label="全名" />
      <TextField source="profile.latestProfile.gender" label="性別" />
      <TextField source="profile.latestProfile.HKID" label="HKID" />
      <TextField source="profile.latestProfile.education" label="學歷" />
      <TextField source="profile.latestProfile.experience" label="教學經驗" />
      <TextField source="profile.latestProfile.introduction" label="自我介紹" />
      <TextField source="profile.latestProfile.profileImage" label="頭像 URL" />
      <ArrayField source="profile.latestProfile.certificates" label="證書圖片">
        <SingleFieldList>
          <ChipField source="" />
        </SingleFieldList>
      </ArrayField>

      {/* ✅ 新增審批按鈕 */}
      <ApproveProfileButton />
    </SimpleShowLayout>
  </Show>
);

export default UserShow;
