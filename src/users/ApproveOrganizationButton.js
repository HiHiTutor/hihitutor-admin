import React from "react";
import { useNotify, useRefresh, useRedirect, useRecordContext } from "react-admin";

const ApproveOrganizationButton = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  if (!record || record.userType !== "organization" || record.status === "approved") {
    return null;
  }

  const handleApprove = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api"; // 這裡使用環境變量
      const response = await fetch(`${apiUrl}/users/${record.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "approved" })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "審批失敗");
      }

      notify("✅ 機構帳戶已成功審批");
      refresh();
      redirect("/users");
    } catch (error) {
      notify(`❌ 錯誤: ${error.message}`, { type: "error" });
    }
  };

  return (
    <button onClick={handleApprove} style={{ marginTop: 10, padding: "6px 12px" }}>
      ✅ 批核機構帳戶
    </button>
  );
};

export default ApproveOrganizationButton;
