import React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  EmailField,
  DateField,
  ArrayField,
  SingleFieldList,
  ImageField,
} from "react-admin";
import ApproveProfileButton from "./ApproveProfileButton";
import { Box, Typography } from "@mui/material";

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
      <TextField source="profileStatus" label="個人檔案狀態" />
      <DateField source="createdAt" label="註冊日期" showTime />

      {/* 🔽 展示 latestProfile 導師升級資料 */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">📋 導師升級申請資料</Typography>
        <TextField source="profile.latestProfile.salutation" label="稱呼" />
        <TextField source="profile.latestProfile.gender" label="性別" />

        <Typography variant="subtitle1" sx={{ mt: 2 }}>HKID 證明</Typography>
        <ArrayField source="profile.latestProfile.hkidImages">
          <SingleFieldList>
            <ImageField source="" />
          </SingleFieldList>
        </ArrayField>

        <TextField source="phone" label="聯絡電話（不可更改）" />
        <TextField source="age" label="年齡（不可更改）" />

        <TextField source="profile.latestProfile.experience" label="授課年資" />
        <TextField source="profile.latestProfile.subjects" label="教授科目" />

        <Typography variant="subtitle1" sx={{ mt: 2 }}>學歷證明</Typography>
        <ArrayField source="profile.latestProfile.educationCertificates">
          <SingleFieldList>
            <ImageField source="" />
          </SingleFieldList>
        </ArrayField>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>公開試成績證書</Typography>
        <ArrayField source="profile.latestProfile.examCertificates">
          <SingleFieldList>
            <ImageField source="" />
          </SingleFieldList>
        </ArrayField>

        <TextField source="profile.latestProfile.locations" label="上堂地區" />
        <TextField source="profile.latestProfile.timeslots" label="上堂時間" />
        <TextField source="profile.latestProfile.teachingMode" label="上堂形式" />
        <TextField source="profile.latestProfile.hourlyRate" label="要求堂費" />
        <TextField source="profile.latestProfile.introduction" label="個人簡介（包括課程特點）" />

        {/* 頭像 */}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>頭像</Typography>
        <ImageField source="profile.latestProfile.avatar" label="頭像" />

        {/* 其他證書（如有） */}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>其他證書圖片</Typography>
        <ArrayField source="profile.latestProfile.certificates">
          <SingleFieldList>
            <ImageField source="" />
          </SingleFieldList>
        </ArrayField>
      </Box>

      {/* ✅ 新增審批按鈕 */}
      <ApproveProfileButton />
    </SimpleShowLayout>
  </Show>
);

export default UserShow;
